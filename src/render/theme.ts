/**
 * Colours.
 *
 * Eras are ordinal, not categorical, so the palette runs warm (mechanical brass)
 * to cool (silicon magenta) in chronological order. Read as a legend it is a set
 * of distinguishable hues; read as a tree it is a timeline you can see at a
 * glance, because the further from the centre a branch is, the newer it tends to
 * be.
 */

export interface EraStyle {
  id: string
  /** Human readable label, Turkish in the bundled dataset. */
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

export interface Theme {
  background: number
  /** Fallback for nodes with no era. */
  neutral: number
  boundary: number
  link: number
  /** Selection ring, and the colour dimmed/selected nodes are mixed toward. */
  highlight: number
  eraColor: (era: string | undefined) => number
}

const makeTheme = (base: Omit<Theme, 'eraColor'>): Theme => ({
  ...base,
  eraColor: (era) => (era && ERA_BY_ID[era] ? ERA_BY_ID[era].color : base.neutral),
})

export const darkTheme: Theme = makeTheme({
  background: 0x080a11,
  neutral: 0x7c8798,
  boundary: 0x2b3550,
  link: 0x46536a,
  highlight: 0xffffff,
})

export const lightTheme: Theme = makeTheme({
  background: 0xf3f5f9,
  neutral: 0x8b95a5,
  boundary: 0x9aa6ba,
  link: 0xaeb8c8,
  highlight: 0x11151d,
})

export const themes = { dark: darkTheme, light: lightTheme }
export type ThemeName = keyof typeof themes
