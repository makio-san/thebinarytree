import { describe, expect, it } from 'vitest'
import { computerHistory, eraOf, flatten, formatYear, yearRange } from '../src/data'
import { ERA_BY_ID } from '../src/render/theme'
import { hierarchy } from '../src/model/hierarchy'

const all = flatten(computerHistory)

describe('the computer history dataset', () => {
  it('is a decent size', () => {
    expect(all.length).toBeGreaterThan(250)
  })

  it('has at least twenty top level branches', () => {
    // The lineage architect adds new ones; the site counts them itself.
    expect(computerHistory.children!.length).toBeGreaterThanOrEqual(20)
  })

  it('uses unique ids everywhere', () => {
    const seen = new Map<string, string>()
    for (const node of all) {
      expect(node.id, `missing id on "${node.name}"`).toBeTruthy()
      expect(seen.has(node.id), `duplicate id "${node.id}" (${node.name} / ${seen.get(node.id)})`).toBe(false)
      seen.set(node.id, node.name)
    }
  })

  it('only uses eras the palette knows about', () => {
    for (const node of all) {
      if (!node.era) continue
      expect(ERA_BY_ID[node.era], `unknown era "${node.era}" on ${node.id}`).toBeDefined()
    }
  })

  it('keeps years inside a plausible range', () => {
    const [min, max] = yearRange()
    expect(min).toBe(-2700)
    expect(max).toBeGreaterThanOrEqual(2020)
    expect(max).toBeLessThanOrEqual(2026)
  })

  it('never lets a child predate its parent by more than a decade', () => {
    // Influence can flow slightly backwards (a spec published before the thing
    // it inspired shipped), but a big inversion means the nesting is wrong.
    const walk = (node: typeof computerHistory, parentYear?: number): void => {
      const year = node.year ?? parentYear
      if (typeof node.year === 'number' && typeof parentYear === 'number') {
        expect(
          node.year,
          `${node.id} (${node.year}) sits under a parent from ${parentYear}`,
        ).toBeGreaterThan(parentYear - 10)
      }
      for (const child of node.children ?? []) walk(child, year)
    }
    walk(computerHistory)
  })

  it('gives every leaf a summary', () => {
    for (const node of all) {
      if (node.children?.length) continue
      expect(node.summary, `no summary on leaf ${node.id}`).toBeTruthy()
    }
  })

  it('uses no em or en dashes in prose', () => {
    const dashes = /[–—]/
    for (const node of all) {
      const prose = [node.name, node.summary ?? '', ...(node.facts ?? [])].join(' ')
      expect(dashes.test(prose), `dash found in ${node.id}`).toBe(false)
    }
  })

  it('loads into a hierarchy with matching node count', () => {
    const tree = hierarchy(computerHistory)
    expect(tree.nodes.length).toBe(all.length)
    expect(tree.links.length).toBe(all.length - 1)
    expect(tree.root.weight).toBe(all.filter((n) => !n.children?.length).length)
  })

  it('keeps the landmark ids the demo tour and the README rely on', () => {
    // These are quoted in README examples and driven by the demo's tour button,
    // where a renamed id fails silently instead of throwing.
    const landmarks = [
      'root',
      'analytical-engine',
      'turing-machine',
      'colossus',
      'eniac',
      'manchester-baby',
      'transistor',
      'ibm-650',
      'turkey-first-computer',
      'system-360',
      'pdp-11',
      'unix',
      'intel-4004',
      'mos-6502',
      'apple-ii',
      'ibm-pc-5150',
      'c-language',
      'commodore-64',
      'arm1',
      'macintosh',
      'web',
      'linux',
      'iphone',
      'apple-m1',
      'transformer',
      'frontier-machine',
    ]
    const ids = new Set(all.map((n) => n.id))
    expect(landmarks.filter((id) => !ids.has(id))).toEqual([])
  })

  it('is deep enough to be worth a hyperbolic layout', () => {
    const tree = hierarchy(computerHistory)
    expect(tree.maxDepth).toBeGreaterThanOrEqual(8)
  })
})

describe('helpers', () => {
  it('formats years, BCE included', () => {
    expect(formatYear(1971)).toBe('1971')
    expect(formatYear(-2700)).toBe('2700 BC')
    expect(formatYear(undefined)).toBe('')
  })

  it('guesses an era from a year', () => {
    expect(eraOf(1642)).toBe('mechanical')
    expect(eraOf(1945)).toBe('tube')
    expect(eraOf(1960)).toBe('transistor')
    expect(eraOf(1968)).toBe('integrated')
    expect(eraOf(1981)).toBe('micro')
    expect(eraOf(2020)).toBe('modern')
  })
})
