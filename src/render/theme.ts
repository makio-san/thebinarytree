/**
 * Colours.
 *
 * Eras are ordinal, not categorical, so the palette runs warm (mechanical brass)
 * to cool (silicon magenta) in chronological order. Read as a legend it is a set
 * of distinguishable hues; read as a tree it is a timeline you can see at a
 * glance, because the further from the centre a branch is, the newer it tends to
 * be.
 *
 * The two themes are not the same palette with the background flipped. On black,
 * things recede by getting darker and glow is additive light. On white, both of
 * those are wrong: fading toward the background turns the far tree invisible, and
 * additive glow only washes to white. The light theme therefore darkens every era
 * colour, recedes toward a mid grey rather than the page, and treats glow as an
 * ink bleed instead of a light source.
 */

export interface EraStyle {
  id: string
  /** Human readable label. */
  label: string
  /** Rough span, for the legend. */
  span: string
  color: number
}

export const ERAS: EraStyle[] = [
  { id: 'mechanical', label: 'Mechanical', span: '2700 BC - 1948', color: 0xc98b4b },
  { id: 'theory', label: 'Theory', span: '1847 - 1971', color: 0xa879d0 },
  { id: 'tube', label: 'Vacuum tube', span: '1937 - 1958', color: 0xe2564c },
  { id: 'transistor', label: 'Transistor', span: '1947 - 1965', color: 0xe8913a },
  { id: 'integrated', label: 'Integrated circuit', span: '1958 - 1971', color: 0xd8c14a },
  { id: 'micro', label: 'Microprocessor', span: '1971 - present', color: 0x58c07a },
  { id: 'personal', label: 'Personal computer', span: '1971 - 1995', color: 0x2fb9c4 },
  { id: 'network', label: 'Networks', span: '1961 - 2005', color: 0x4a8fe0 },
  { id: 'mobile', label: 'Mobile', span: '1972 - 2015', color: 0x7d7ce8 },
  { id: 'modern', label: 'Present day', span: '1996 - ', color: 0xe069b0 },
]

export const ERA_BY_ID: Record<string, EraStyle> = Object.fromEntries(
  ERAS.map((e) => [e.id, e]),
)

export type GlowMode = 'additive' | 'ink'

export interface Theme {
  background: number
  /** Fallback for nodes with no era. */
  neutral: number
  boundary: number
  link: number
  /** Selection ring, and the colour dimmed/selected nodes are mixed toward. */
  highlight: number
  /**
   * Colour that receding things fade toward. On black that is the background; on
   * white it has to be a mid grey, or the far tree fades into the page and stops
   * existing rather than receding.
   */
  recede: number
  /**
   * Hard ceiling on how far anything may fade toward `recede`. Reaching it
   * exactly means zero contrast, which is a hole rather than a distance.
   */
  maxFade: number
  /**
   * How glow is drawn. `additive` is light on a dark ground. `ink` is a soft
   * coloured wash for a light ground, where added light can only reach white.
   */
  glow: GlowMode
  /** Bloom is meaningless on a light ground; every bright pixel is already white. */
  allowBloom: boolean
  /** Whether a starfield reads at all against this background. */
  allowStars: boolean
  eraColor: (era: string | undefined) => number
}

const relativeLuminance = (color: number): number =>
  (0.2126 * ((color >> 16) & 0xff) + 0.7152 * ((color >> 8) & 0xff) + 0.0722 * (color & 0xff)) / 255

/** Multiply a packed RGB by a scalar. */
function scale(color: number, factor: number): number {
  const r = Math.min(255, Math.round(((color >> 16) & 0xff) * factor))
  const g = Math.min(255, Math.round(((color >> 8) & 0xff) * factor))
  const b = Math.min(255, Math.round((color & 0xff) * factor))
  return (r << 16) | (g << 8) | b
}

/**
 * Darken a colour until its luminance is at most `ceiling`, then push it back
 * away from grey.
 *
 * A flat multiplier is not enough for a light ground. The palette's hues have
 * wildly different luminance to begin with - the yellow is roughly twice the blue
 * - so one factor either leaves the yellow invisible on white or crushes the blue
 * to black. Targeting a luminance instead equalises how much weight each era
 * carries, which is what the legend needs to be readable.
 *
 * Scaling every channel toward zero also drags the colour toward grey, which on a
 * white ground reads as mud and costs exactly the hue distinction the eras exist
 * to carry. Re-saturating around the new grey point restores it.
 */
function capLuminance(color: number, ceiling: number, saturation = 1): number {
  const lum = relativeLuminance(color)
  const darkened = lum <= ceiling ? color : scale(color, ceiling / lum)
  if (saturation === 1) return darkened

  const r = (darkened >> 16) & 0xff
  const g = (darkened >> 8) & 0xff
  const b = darkened & 0xff
  const grey = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const push = (v: number) => Math.max(0, Math.min(255, Math.round(grey + (v - grey) * saturation)))
  return (push(r) << 16) | (push(g) << 8) | push(b)
}

const makeTheme = (
  base: Omit<Theme, 'eraColor'>,
  /** Luminance ceiling for era colours. Infinity leaves the palette alone. */
  eraLuminanceCeiling = Number.POSITIVE_INFINITY,
  /** Saturation applied after darkening, to undo the drift toward grey. */
  eraSaturation = 1,
): Theme => {
  const cache = new Map<string, number>()
  return {
    ...base,
    eraColor: (era) => {
      if (!era) return base.neutral
      const hit = cache.get(era)
      if (hit !== undefined) return hit
      const found = ERA_BY_ID[era]
      const value = found
        ? capLuminance(found.color, eraLuminanceCeiling, eraSaturation)
        : base.neutral
      cache.set(era, value)
      return value
    },
  }
}

export const darkTheme: Theme = makeTheme({
  background: 0x080a11,
  neutral: 0x7c8798,
  boundary: 0x2b3550,
  link: 0x46536a,
  highlight: 0xffffff,
  recede: 0x080a11,
  maxFade: 0.94,
  glow: 'additive',
  allowBloom: true,
  allowStars: true,
})

export const lightTheme: Theme = makeTheme(
  {
    background: 0xf3f5f9,
    neutral: 0x63708a,
    boundary: 0x8e9bb2,
    link: 0x93a0b6,
    highlight: 0x0d1119,
    // Well short of the page, so a distant filament is still a grey thread.
    recede: 0x93a2b8,
    maxFade: 0.86,
    glow: 'ink',
    allowBloom: false,
    allowStars: false,
  },
  // Era hues chosen for a black ground are far too light on white; the yellow
  // disappears entirely at any factor that leaves the blue intact. Capping
  // luminance rather than scaling gives every era comparable weight on the page,
  // and the re-saturation keeps them from all reading as brown.
  0.42,
  1.3,
)

export const themes = { dark: darkTheme, light: lightTheme }
export type ThemeName = keyof typeof themes
