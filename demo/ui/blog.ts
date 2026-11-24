import { photos, POSTS, renderMarkdown, type Post } from '../blog'

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

const when = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const isReadingList = (post: Post): boolean => /reading-list/.test(post.slug)
const kind = (post: Post): string => (isReadingList(post) ? 'Reading list' : 'Tree update')
const minutes = (post: Post): string => `${Math.max(1, Math.round(post.body.split(/\s+/).length / 220))} min read`

/** Date, kind and reading time, as a small row of text. */
const meta = (post: Post): HTMLElement => {
  const row = el('div', 'blog__meta')
  const chip = el('span', `blog__kind${isReadingList(post) ? ' blog__kind--list' : ''}`, kind(post))
  row.append(chip, el('time', 'blog__date', when(post.date)), el('span', 'blog__dot'), el('span', 'blog__time', minutes(post)))
  return row
}

export const hasPosts = (): boolean => POSTS.length > 0

/** The slug in `#blog/<slug>`, '' for `#blog`, null when the hash is not the blog. */
export function blogRoute(hash = location.hash): string | null {
  const match = /^#blog(?:\/([\w-]+))?$/.exec(hash)
  return match ? (match[1] ?? '') : null
}

let open: (() => void) | null = null

/**
 * The Blog view: a list of posts, or one post. `onNode` is called when a
 * reader follows a link to a node in the tree, after the view has closed.
 */
export function openBlog(slug: string | null, onNode: (id: string) => void): void {
  open?.()
  const overlay = el('div', 'agents blog')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'Blog')

  const sheet = el('div', 'agents__sheet')
  const head = el('header', 'agents__head')
  const titles = el('div')
  const close = el('button', 'icon-btn agents__close')
  close.type = 'button'
  close.setAttribute('aria-label', 'Close')
  close.append(el('span', 'icon-x'))
  head.append(titles, close)
  const body = el('div', 'agents__body blog__body')
  sheet.append(head, body)
  overlay.append(sheet)

  const setHash = (hash: string): void => {
    if (location.hash !== hash) history.replaceState(null, '', hash || location.pathname + location.search)
  }

  const showList = (): void => {
    setHash('#blog')
    head.classList.remove('blog__head--slim')
    titles.replaceChildren(el('p', 'blog__eyebrow', 'The Binary Tree'), el('h2', undefined, 'Blog'))
    const intro = el(
      'p',
      'blog__intro',
      'What is new in the tree, from the blog agent, and a weekly reading list of the best writing on Medium and elsewhere, picked by the web reader.',
    )
    const list = el('ol', 'blog__list')
    for (const post of POSTS) {
      const item = el('li')
      const link = el('a', 'blog__item')
      link.href = `#blog/${post.slug}`
      link.addEventListener('click', (event) => {
        event.preventDefault()
        showPost(post)
      })
      const text = el('div', 'blog__text')
      const more = el('span', 'blog__more', isReadingList(post) ? 'Open the list' : 'Read the post')
      text.append(meta(post), el('strong', 'blog__title', post.title), el('span', 'blog__summary', post.summary), more)
      link.append(text)
      const cover = photos(post.body)[0]
      if (cover) {
        const img = el('img', 'blog__cover')
        img.src = cover.url
        img.alt = ''
        img.loading = 'lazy'
        img.referrerPolicy = 'no-referrer'
        link.classList.add('blog__item--cover')
        link.append(img)
      }
      item.append(link)
      list.append(item)
    }
    body.replaceChildren(intro, POSTS.length ? list : el('p', 'agents__summary', 'No posts yet.'))
    body.scrollTop = 0
  }

  const showPost = (post: Post): void => {
    setHash(`#blog/${post.slug}`)
    const back = el('button', 'blog__back', 'All posts')
    back.type = 'button'
    back.addEventListener('click', showList)
    // A pinned header three lines of title and summary deep takes half of a
    // phone's screen away from the thing being read. Only the way back is pinned.
    head.classList.add('blog__head--slim')
    titles.replaceChildren(back)
    const header = el('header', 'blog__header')
    header.append(meta(post), el('h2', 'blog__heading', post.title), el('p', 'blog__intro', post.summary))
    const article = el('article', 'blog__post')
    article.innerHTML = renderMarkdown(post.body)
    body.replaceChildren(header, article)
    body.scrollTop = 0
  }

  const dismiss = (): void => {
    open = null
    overlay.remove()
    document.removeEventListener('keydown', onKey, true)
    setHash('')
  }
  open = dismiss
  const onKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    dismiss()
  }
  body.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a.node-link')
    if (!link?.dataset.node) return
    event.preventDefault()
    dismiss()
    onNode(link.dataset.node)
  })
  close.addEventListener('click', dismiss)
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) dismiss()
  })
  document.addEventListener('keydown', onKey, true)
  document.body.append(overlay)

  const post = slug ? POSTS.find((p) => p.slug === slug) : undefined
  if (post) showPost(post)
  else showList()
  close.focus()
}
