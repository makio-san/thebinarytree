import { describe, expect, it } from 'vitest'
import { isReadingList, nodeLinks, parsePost, photos, PHOTO_HOSTS, POSTS, readingItems, renderMarkdown } from '../demo/blog'
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

  it('shows credited photos only from freely licensed hosts', () => {
    const ok = renderMarkdown('![ENIAC](https://upload.wikimedia.org/a/b.jpg "Photo: U.S. Army, public domain, via Wikimedia Commons")')
    expect(ok).toContain('<figure><img src="https://upload.wikimedia.org/a/b.jpg" alt="ENIAC"')
    expect(ok).toContain('<figcaption>Photo: U.S. Army, public domain, via Wikimedia Commons</figcaption>')
    expect(renderMarkdown('![x](https://example.com/a.jpg "credit")')).not.toContain('<img')
    expect(renderMarkdown('![x](https://upload.wikimedia.org/a.jpg)')).not.toContain('<img')
    expect(renderMarkdown('![x](https://upload.wikimedia.org/a.jpg" onerror="x "c")')).not.toMatch(/<img|onerror="/)
  })

  it('reads the day each piece in a reading list was published', () => {
    const body =
      '## One\n\n*Jane Doe, on Site, 18 November*\n\nText.\n\n## Two\n\n*No day in this byline*\n\nText.\n\n## Three\n\n*A B, on C, 30 December*\n\n## Four\n\n*D E, on F, 25 November*'
    const days = (date: string): (string | null)[] => readingItems({ date, body }).map((item) => item.published)
    expect(days('2026-11-24')).toEqual(['2026-11-18', null, '2025-12-30', '2026-11-25'])
    expect(days('2027-01-03')).toEqual(['2026-11-18', null, '2026-12-30', '2026-11-25'])
    expect(readingItems({ date: '2026-11-24', body })[1].title).toBe('Two')
    expect(readingItems({ date: '2026-11-24', body: '## Odd\n\n*X, on Y, 31 February*' })[0].published).toBeNull()
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

      it('credits every photo, with a licence, from an allowed host', () => {
        for (const photo of photos(post.body)) {
          expect(PHOTO_HOSTS as readonly string[]).toContain(photo.host)
          expect(photo.alt.trim()).not.toBe('')
          expect(photo.credit).toMatch(/public domain|CC0|CC BY/i)
        }
      })

      it('links only to nodes that exist', () => {
        for (const id of nodeLinks(post.body)) expect(ids.has(id), `unknown node "${id}"`).toBe(true)
      })

      if (isReadingList(post)) {
        it('dates every piece, and none is more than a week older than the list', () => {
          const items = readingItems(post)
          expect(items.length).toBeGreaterThan(0)
          for (const item of items) {
            expect(item.published, `"${item.title}" needs the day it was published at the end of its byline`).not.toBeNull()
            const age = (Date.parse(post.date) - Date.parse(item.published as string)) / 86_400_000
            expect(age, `"${item.title}" was published ${age} days before the list`).toBeGreaterThanOrEqual(-1)
            expect(age, `"${item.title}" was published ${age} days before the list`).toBeLessThanOrEqual(7)
          }
        })
      }
    })
  }
})
