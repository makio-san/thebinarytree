/**
 * Wikipedia lookup for images and long form detail.
 *
 * The dataset stores article *titles*, never image URLs. Wikimedia thumbnail
 * paths are content hashed, so they cannot be derived from a title and hardcoding
 * them would mean shipping links that rot. The REST summary endpoint resolves
 * both the lead image and an extract in one request, follows redirects, and sends
 * permissive CORS headers.
 *
 * Everything here degrades to nothing: no title, a 404, an offline browser, all
 * end with the panel showing only the dataset's own text.
 */

const ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php'
const CACHE_KEY = 'bt-wiki-v1'
const CACHE_LIMIT = 400
const THUMB_WIDTH = 640

/** A picture resolved from a named Commons file rather than from an article. */
export interface WikiImage {
  url: string
  width: number
  height: number
  /** The file's description page, which carries the author and the licence. */
  source: string
  /** File name without the prefix or extension, for the caption. */
  name: string
}

export interface WikiSummary {
  title: string
  /** One or two paragraphs of plain text. */
  extract: string
  /**
   * Lead image, exactly the URL the API returned. Never rewritten: Wikimedia
   * only serves thumbnail widths it has been asked to generate, and editing the
   * "/330px-" segment to ask for a bigger one returns HTTP 400. The URL also
   * carries a query string, which any such rewrite would corrupt.
   */
  image?: { url: string; width: number; height: number }
  /** Full resolution original, for opening the picture itself. */
  original?: string
  /** Canonical article URL. */
  url: string
}

/** In-flight and resolved lookups, so a node revisited is instant. */
const memory = new Map<string, Promise<WikiSummary | null>>()
const fileMemory = new Map<string, Promise<WikiImage | null>>()

// One store for both kinds of lookup, keyed apart by a "file:" prefix.
let persisted: Record<string, WikiSummary | WikiImage | null> = {}
try {
  persisted = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? '{}')
} catch {
  persisted = {}
}

function persist(title: string, value: WikiSummary | WikiImage | null): void {
  try {
    const keys = Object.keys(persisted)
    if (keys.length > CACHE_LIMIT) for (const k of keys.slice(0, 80)) delete persisted[k]
    persisted[title] = value
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(persisted))
  } catch {
    // A full or blocked sessionStorage is not worth failing a lookup over.
  }
}

interface FileQuery {
  query?: {
    pages?: {
      title?: string
      imageinfo?: {
        thumburl?: string
        thumbwidth?: number
        thumbheight?: number
        descriptionurl?: string
      }[]
    }[]
  }
}

interface RestSummary {
  title?: string
  extract?: string
  content_urls?: { desktop?: { page?: string } }
  thumbnail?: { source?: string; width?: number; height?: number }
  originalimage?: { source?: string; width?: number; height?: number }
  type?: string
}

/**
 * Fetch a summary. Resolves to null for anything that is not a real article,
 * including disambiguation pages, which would otherwise show a list of links as
 * if it were an explanation.
 */
export function fetchSummary(title: string, signal?: AbortSignal): Promise<WikiSummary | null> {
  if (title in persisted) return Promise.resolve(persisted[title] as WikiSummary | null)
  const existing = memory.get(title)
  if (existing) return existing

  const url = ENDPOINT + encodeURIComponent(title.replace(/ /g, '_'))
  const request = fetch(url, { signal, headers: { Accept: 'application/json' } })
    .then(async (response) => {
      if (!response.ok) return null
      const data = (await response.json()) as RestSummary
      if (data.type && data.type !== 'standard') return null
      if (!data.extract) return null

      const thumb = data.thumbnail
      const summary: WikiSummary = {
        title: data.title ?? title,
        extract: data.extract,
        url: data.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${title}`,
      }
      if (thumb?.source) {
        summary.image = {
          url: thumb.source,
          width: thumb.width ?? 0,
          height: thumb.height ?? 0,
        }
        if (data.originalimage?.source) summary.original = data.originalimage.source
      }
      return summary
    })
    .then((summary) => {
      persist(title, summary)
      return summary
    })
    .catch(() => {
      // Do not persist failures: they are usually the network, not the article.
      memory.delete(title)
      return null
    })

  memory.set(title, request)
  return request
}

/**
 * Resolve a Commons file name to a thumbnail.
 *
 * The fallback for articles whose only lead image is non-free: pageimages looks
 * at the lead section alone, so a free picture further down the page never
 * reaches the summary endpoint. Naming the file reaches it directly.
 *
 * The URL comes from the API's own `thumburl`, never from string surgery on a
 * path - Wikimedia thumbnail paths are content hashed, and a hand-built one is
 * an HTTP 400 waiting to happen.
 */
export function fetchFile(file: string, signal?: AbortSignal): Promise<WikiImage | null> {
  const key = `file:${file}`
  if (key in persisted) return Promise.resolve(persisted[key] as WikiImage | null)
  const existing = fileMemory.get(key)
  if (existing) return existing

  const query = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    origin: '*',
    prop: 'imageinfo',
    iiprop: 'url|size',
    iiurlwidth: String(THUMB_WIDTH),
    titles: file,
  })

  const request = fetch(`${COMMONS_API}?${query}`, { signal })
    .then(async (response) => {
      if (!response.ok) return null
      const data = (await response.json()) as FileQuery
      const page = data.query?.pages?.[0]
      const info = page?.imageinfo?.[0]
      if (!info?.thumburl) return null
      return {
        url: info.thumburl,
        width: info.thumbwidth ?? 0,
        height: info.thumbheight ?? 0,
        // The description page, which carries the author and the licence. That
        // is where credit belongs, so it is what the caption links to.
        source: info.descriptionurl ?? '',
        name: (page?.title ?? file).replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, ''),
      }
    })
    .then((image) => {
      persist(key, image)
      return image
    })
    .catch(() => {
      fileMemory.delete(key)
      return null
    })

  fileMemory.set(key, request)
  return request
}

/**
 * Ask for a title without using the result, to warm the cache. Used on hover and
 * on the tour, so the panel is already populated by the time you land.
 */
export function prefetch(title: string | undefined): void {
  if (!title || title in persisted || memory.has(title)) return
  void fetchSummary(title)
}

