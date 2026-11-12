import { describe, expect, it } from 'vitest'
import { CREATORS, creatorsOf, creditsOf } from '../src/data/creators'
import { LOGOS, PORTRAITS, portraitOf } from '../src/data/portraits'
import { computerHistory, flatten } from '../src/data'

const all = flatten(computerHistory)
const ids = new Set(all.map((n) => n.id))

describe('the creators table', () => {
  it('only credits ids that exist in the dataset', () => {
    expect(Object.keys(CREATORS).filter((id) => !ids.has(id))).toEqual([])
  })

  it('credits most of what is not a group heading', () => {
    const things = all.filter((n) => n.kind !== 'group')
    const credited = things.filter((n) => creatorsOf(n.id).length > 0).length
    expect(credited / things.length).toBeGreaterThan(0.7)
  })

  it('has no empty, untrimmed or repeated names', () => {
    for (const [id, names] of Object.entries(CREATORS)) {
      expect(names.length, id).toBeGreaterThan(0)
      expect(new Set(names).size, `repeat in ${id}`).toBe(names.length)
      for (const name of names) {
        expect(name, id).toBeTruthy()
        expect(name, id).toBe(name.trim())
        expect(/[–—]/.test(name), `dash in ${id}: ${name}`).toBe(false)
      }
    }
  })

  it('credits the landmarks correctly', () => {
    expect(creatorsOf('unix')).toEqual(['Ken Thompson', 'Dennis Ritchie'])
    expect(creatorsOf('linux')).toEqual(['Linus Torvalds'])
    expect(creatorsOf('web')).toContain('Tim Berners-Lee')
    expect(creatorsOf('root')).toEqual([])
  })

  it('finds everything a person is credited on', () => {
    expect(creditsOf('Anders Hejlsberg').sort()).toEqual(
      ['csharp', 'delphi', 'turbo-pascal', 'typescript'].sort(),
    )
    expect(creditsOf('Nobody At All')).toEqual([])
  })
})

describe('the portrait table', () => {
  const credited = new Set(Object.values(CREATORS).flat())

  it('only lists names that are credited somewhere', () => {
    const listed = [...Object.keys(PORTRAITS), ...Object.keys(LOGOS)]
    expect(listed.filter((name) => !credited.has(name))).toEqual([])
  })

  it('names a source and a face inside the picture for each', () => {
    for (const name of Object.keys(PORTRAITS)) {
      const portrait = portraitOf(name)!
      expect(portrait.title, name).toBeTruthy()
      expect(/^https?:/.test(portrait.title), `URL stored for ${name}`).toBe(false)
      if (!portrait.face) continue
      for (const value of [portrait.face.x, portrait.face.y, portrait.face.h]) {
        expect(value, name).toBeGreaterThan(0)
        expect(value, name).toBeLessThanOrEqual(100)
      }
    }
  })

  it('keeps namesakes apart', () => {
    // The bare names resolve to other people entirely, which is why the table
    // exists. These are the ones that would be wrong if it were ever dropped.
    expect(portraitOf('Steve Chen')).toBeUndefined()
    expect(portraitOf('Jim Clark')?.title).toBe('James H. Clark')
    expect(portraitOf('Gordon Bell (QNX)')).toBeUndefined()
    expect(portraitOf('Nobody At All')).toBeUndefined()
  })

  it('shows an organisation as a mark, not a face', () => {
    expect(portraitOf('IBM')).toEqual({ title: 'IBM', logo: true })
  })
})
