/**
 * Blog posts, from the markdown files in `blog/`.
 *
 * The blog writer agent adds a file per post. Each starts with a small front
 * matter block (title, date, summary) and uses a deliberately small subset of
 * markdown, so the renderer here can stay short and never emits raw HTML from
 * a post: everything is escaped first.
 */

export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  body: string
}

const files = import.meta.glob('../blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

/** Splits a post file into its front matter fields and its body. */
export function parsePost(slug: string, text: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!match) throw new Error(`blog/${slug}.md has no front matter`)
  const fields: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':')
    if (at > 0) fields[line.slice(0, at).trim()] = line.slice(at + 1).trim()
  }
  for (const key of ['title', 'date', 'summary']) {
    if (!fields[key]) throw new Error(`blog/${slug}.md is missing "${key}"`)
  }
  return { slug, title: fields.title, date: fields.date, summary: fields.summary, body: match[2].trim() }
}

/** Every post, newest first. */
export const POSTS: readonly Post[] = Object.entries(files)
  .map(([path, text]) => parsePost(path.split('/').pop()!.replace(/\.md$/, ''), text))
  .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug))

const escape = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Inline markup: code, links (node links and web links), bold, italic. */
function inline(text: string): string {
  const codes: string[] = []
  let out = escape(text).replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(`<code>${code}</code>`)
    return `\u0000${codes.length - 1}\u0000`
  })
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
    if (href.startsWith('node:')) return `<a href="#" class="node-link" data-node="${href.slice(5)}">${label}</a>`
    if (/^https?:\/\//.test(href)) return `<a href="${href}" target="_blank" rel="noopener">${label}</a>`
    return label
  })
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>')
  return out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)])
}

/** The body of a post as HTML. */
export function renderMarkdown(body: string): string {
  const html: string[] = []
  for (const block of body.split(/\r?\n\s*\r?\n/)) {
    const lines = block.split(/\r?\n/).filter((l) => l.trim() !== '')
    if (lines.length === 0) continue
    const heading = /^(#{2,3})\s+(.*)$/.exec(lines[0])
    if (heading && lines.length === 1) {
      const level = heading[1].length
      html.push(`<h${level + 1}>${inline(heading[2])}</h${level + 1}>`)
    } else if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      html.push(`<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`)
    } else {
      html.push(`<p>${inline(lines.join(' '))}</p>`)
    }
  }
  return html.join('\n')
}

/** Node ids a post links to, for the tests. */
export function nodeLinks(body: string): string[] {
  return [...body.matchAll(/\]\(node:([^)\s]+)\)/g)].map((m) => m[1])
}
