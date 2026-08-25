import { describe, expect, it } from 'vitest'
import { WIKI_TITLES, wikiTitle, wikiUrl } from '../src/data/wiki'
import { computerHistory, flatten } from '../src/data'

const ids = new Set(flatten(computerHistory).map((n) => n.id))

describe('the Wikipedia title table', () => {
  it('only maps ids that exist in the dataset', () => {
    const orphans = Object.keys(WIKI_TITLES).filter((id) => !ids.has(id))
    expect(orphans).toEqual([])
  })

  it('covers most of the dataset', () => {
    const covered = [...ids].filter((id) => wikiTitle(id)).length
    expect(covered / ids.size).toBeGreaterThan(0.5)
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
