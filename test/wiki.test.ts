import { describe, expect, it } from 'vitest'
import { WIKI_FILES, WIKI_TITLES, wikiFile, wikiTitle, wikiUrl } from '../src/data/wiki'
import { computerHistory, flatten } from '../src/data'

const ids = new Set(flatten(computerHistory).map((n) => n.id))

describe('the Wikipedia title table', () => {
  it('only maps ids that exist in the dataset', () => {
    const orphans = Object.keys(WIKI_TITLES).filter((id) => !ids.has(id))
    expect(orphans).toEqual([])
  })

  it('covers nearly all of the dataset', () => {
    // The uncovered remainder is the editorial group headings - "Other Lines",
    // "Before Computers" - which name a shelf rather than a subject and have no
    // article behind them. `npm run audit:wiki` tracks how many of the covered
    // ones actually resolve to a picture.
    const covered = [...ids].filter((id) => wikiTitle(id)).length
    expect(covered / ids.size).toBeGreaterThan(0.9)
  })

  it('has no empty or untrimmed titles', () => {
    for (const [id, title] of Object.entries(WIKI_TITLES)) {
      expect(title, id).toBeTruthy()
      expect(title, id).toBe(title.trim())
    }
  })

  it('uses hyphens rather than dashes, so the redirect does the work', () => {
    // An en dash in a title is legitimate on Wikipedia but a nuisance here: it
    // has to survive hand editing and URL encoding. Wikipedia redirects the
    // hyphenated spelling, so that is what the table stores.
    for (const [id, title] of Object.entries(WIKI_TITLES)) {
      expect(/[–—]/.test(title), `${id}: ${title}`).toBe(false)
    }
  })

  it('never stores an image URL', () => {
    // Wikimedia thumbnail paths are content hashed and cannot be derived from a
    // title. Anything that looks like one here would be invented, and invented
    // Wikimedia URLs return 400.
    for (const [id, title] of Object.entries(WIKI_TITLES)) {
      expect(/^https?:|upload\.wikimedia/.test(title), id).toBe(false)
    }
  })

  it('builds an encoded article URL', () => {
    expect(wikiUrl('MOS Technology 6502')).toBe(
      'https://en.wikipedia.org/wiki/MOS_Technology_6502',
    )
    expect(wikiUrl('C++')).toBe('https://en.wikipedia.org/wiki/C%2B%2B')
    expect(wikiUrl("Moore's law")).toBe("https://en.wikipedia.org/wiki/Moore's_law")
  })

  it('names a Commons file only where the article cannot supply one', () => {
    // A node with both is not a contradiction: the file is the fallback the
    // panel uses when the summary comes back without a lead image, which is what
    // happens when the only picture in the lead section is non-free.
    const orphans = Object.keys(WIKI_FILES).filter((id) => !ids.has(id))
    expect(orphans).toEqual([])
  })

  it('stores file names, never file URLs', () => {
    // Same rule as titles, and for the same reason: Wikimedia thumbnail paths
    // are content hashed. The name is stable, the URL is resolved at runtime.
    // PDF is allowed because MediaWiki thumbnails a PDF to a rendered page, and
    // for the Dartmouth workshop the scanned 1955 proposal *is* the picture.
    for (const [id, file] of Object.entries(WIKI_FILES)) {
      expect(file, id).toMatch(/^File:.+\.(jpg|jpeg|png|svg|gif|webp|pdf)$/i)
      expect(/^https?:|upload\.wikimedia/.test(file), id).toBe(false)
    }
  })

  it('never shows the same picture on two cards', () => {
    // Two cards illustrated by one image looks like a bug even when both
    // choices are defensible, so a file serves a single node.
    const seen = new Map<string, string>()
    for (const [id, file] of Object.entries(WIKI_FILES)) {
      expect(seen.get(file), `${file} also used by ${seen.get(file)}`).toBeUndefined()
      seen.set(file, id)
    }
  })

  it('looks up a file by node id', () => {
    expect(wikiFile('kubernetes')).toBe('File:Kubernetes logo without workmark.svg')
    // ENIAC's own article has a lead image, so it needs no fallback.
    expect(wikiFile('eniac')).toBeUndefined()
  })

  it('resolves the landmark nodes the demo tour visits', () => {
    // The tour opens the panel on each of these, and a missing title means a
    // stop with no picture and no extract.
    const landmarks = [
      'eniac',
      'unix',
      'intel-4004',
      'mos-6502',
      'apple-ii',
      'commodore-64',
      'macintosh',
      'linux',
      'web',
      'iphone',
      'apple-m1',
      'transformer',
    ]
    expect(landmarks.filter((id) => !wikiTitle(id))).toEqual([])
  })
})
