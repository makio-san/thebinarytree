import { describe, expect, it } from 'vitest'
import { nodeLinks, parsePost, POSTS, renderMarkdown } from '../demo/blog'
import { computerHistory, flatten } from '../src/data'

const ids = new Set(flatten(computerHistory).map((node) => node.id))

describe('the blog', () => {
  it('reads front matter', () => {
    const post = parsePost('x', '---\ntitle: A\ndate: 2026-01-02\nsummary: B\n---\n\nBody.')
    expect(post).toMatchObject({ slug: 'x', title: 'A', date: '2026-01-02', summary: 'B', body: 'Body.' })
    expect(() => parsePost('y', 'no front matter')).toThrow()
  })

  it('renders the small markdown subset and escapes everything else', () => {
    const html = renderMarkdown('## Head\n\nSee [Unix](node:unix), [a site](https://example.com) and `<b>`.\n\n- one\n- **two**')
    expect(html).toContain('<h3>Head</h3>')
    expect(html).toContain('data-node="unix"')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('<code>&lt;b&gt;</code>')
    expect(html).toContain('<li><strong>two</strong></li>')
    expect(renderMarkdown('<script>x</script> [x](javascript:alert)')).not.toMatch(/<script|javascript:/)
  })

  for (const post of POSTS) {
    describe(post.slug, () => {
      it('has a dated slug that matches its date', () => {
        expect(post.slug).toMatch(/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/)
        expect(post.slug.startsWith(post.date)).toBe(true)
      })

      it('uses no em or en dashes', () => {
        expect(/[–—]/.test(`${post.title} ${post.summary} ${post.body}`)).toBe(false)
      })

      it('links only to nodes that exist', () => {
        for (const id of nodeLinks(post.body)) expect(ids.has(id), `unknown node "${id}"`).toBe(true)
      })
    })
  }
})
