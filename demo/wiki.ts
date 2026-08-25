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
const CACHE_KEY = 'bt-wiki-v1'
const CACHE_LIMIT = 400

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

let persisted: Record<string, WikiSummary | null> = {}
try {
  persisted = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? '{}')
} catch {
  persisted = {}
}

function persist(title: string, value: WikiSummary | null): void {
  try {
    const keys = Object.keys(persisted)
    if (keys.length > CACHE_LIMIT) for (const k of keys.slice(0, 80)) delete persisted[k]
    persisted[title] = value
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(persisted))
  } catch {
    // A full or blocked sessionStorage is not worth failing a lookup over.
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
  if (title in persisted) return Promise.resolve(persisted[title])
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
 * Ask for a title without using the result, to warm the cache. Used on hover and
 * on the tour, so the panel is already populated by the time you land.
 */
export function prefetch(title: string | undefined): void {
  if (!title || title in persisted || memory.has(title)) return
  void fetchSummary(title)
}

