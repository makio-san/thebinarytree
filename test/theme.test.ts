import { describe, expect, it } from 'vitest'
import { ERAS, darkTheme, lightTheme, themes, type Theme } from '../src/render/theme'

const channels = (color: number) => [
  ((color >> 16) & 0xff) / 255,
  ((color >> 8) & 0xff) / 255,
  (color & 0xff) / 255,
]

const luminance = (color: number): number => {
  const [r, g, b] = channels(color)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a: number, b: number): number => {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Mix two packed colours, the way the layers fade toward `recede`. */
const mix = (from: number, to: number, amount: number): number => {
  const a = channels(from)
  const b = channels(to)
  const out = a.map((v, i) => Math.round((v + (b[i] - v) * amount) * 255))
  return (out[0] << 16) | (out[1] << 8) | out[2]
}

describe.each(Object.entries(themes))('%s theme', (_name, theme: Theme) => {
  it('keeps every era colour readable against its background', () => {
    for (const era of ERAS) {
      const color = theme.eraColor(era.id)
      expect(contrast(color, theme.background), era.id).toBeGreaterThan(2)
    }
  })

  it('keeps the neutral fallback readable', () => {
    expect(contrast(theme.neutral, theme.background)).toBeGreaterThan(2)
  })

  it('never lets a fully receded colour reach the background', () => {
    // This is the light mode bug in one assertion. Fading toward the background
    // itself, with no ceiling, took distant filaments to exactly the page colour
    // and the far half of the tree stopped existing.
    for (const era of ERAS) {
      const faded = mix(theme.eraColor(era.id), theme.recede, theme.maxFade)
      expect(contrast(faded, theme.background), `${era.id} fully receded`).toBeGreaterThan(1.15)
    }
  })

  it('has a highlight that contrasts with the background', () => {
    expect(contrast(theme.highlight, theme.background)).toBeGreaterThan(7)
  })

  it('resolves an unknown era to the neutral colour', () => {
    expect(theme.eraColor('nonsense')).toBe(theme.neutral)
    expect(theme.eraColor(undefined)).toBe(theme.neutral)
  })
})

describe('theme capability flags', () => {
  it('allows additive glow, bloom and stars only on the dark ground', () => {
    expect(darkTheme.glow).toBe('additive')
    expect(darkTheme.allowBloom).toBe(true)
    expect(darkTheme.allowStars).toBe(true)
  })

  it('switches the light ground to ink, with no bloom and no stars', () => {
    // Added light can only move a near-white pixel toward white, so on a light
    // ground additive glow and bloom are not weaker effects, they are wrong ones.
    expect(lightTheme.glow).toBe('ink')
    expect(lightTheme.allowBloom).toBe(false)
    expect(lightTheme.allowStars).toBe(false)
  })

  it('recedes toward the background on dark and toward a mid grey on light', () => {
    expect(darkTheme.recede).toBe(darkTheme.background)
    expect(lightTheme.recede).not.toBe(lightTheme.background)
    expect(contrast(lightTheme.recede, lightTheme.background)).toBeGreaterThan(1.4)
  })

  it('darkens the era palette for the light ground', () => {
    for (const era of ERAS) {
      expect(luminance(lightTheme.eraColor(era.id)), era.id).toBeLessThan(
        luminance(darkTheme.eraColor(era.id)),
      )
    }
  })
})
