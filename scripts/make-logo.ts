/**
 * Generates the project mark: a binary tree laid out in the Poincaré disc.
 *
 * The logo is computed, not drawn. It uses the same Möbius geometry as the
 * library, so the branch curves really are hyperbolic geodesics and the stroke
 * widths really do follow Murray's law. Faking those curves with hand-tuned
 * Bézier control points would have been quicker and would have been a picture of
 * the idea rather than the idea itself.
 *
 * Two dimensional on purpose: the mark has to survive being 16 pixels wide in a
 * browser tab, and a projection of the 3D layout at that size is mud.
 *
 * Two files come out, because the two jobs want different amounts of detail. A
 * 22 node tree is legible at 30px and noise at 16px, which is the whole reason a
 * favicon is its own asset rather than a scaled copy of the logo.
 *
 *   npm run logo
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  type Vec3,
  expOrigin,
  geodesicPoint,
  mobiusAdd,
  normalize,
  outwardDirection,
  v3,
} from '../src/math'

/** Era colours, so the mark is keyed to the same palette as the legend. */
const BRANCH_COLORS = ['#e2564c', '#4ec98a', '#4a8fe0']
const ROOT_COLOR = '#b98ade'
const RING_COLOR = '#8794ab'

interface Variant {
  file: string
  /** Children per level. Its length is the depth. */
  fanout: number[]
  /** Hyperbolic step per level. */
  steps: number[]
  size: number
  /** Drawn radius of the unit circle, in user units. */
  radius: number
  trunkWidth: number
  rootDot: number
  ring: number
  /** Soft wash behind the root, hinting at the glow the app has. */
  core: boolean
}

const VARIANTS: Variant[] = [
  {
    // The brand mark. Three levels of splitting, which is enough for the
    // curvature of the geodesics to be visible.
    file: 'logo.svg',
    fanout: [3, 2, 2],
    steps: [1.3, 1.02, 0.88],
    size: 64,
    radius: 28.5,
    trunkWidth: 3.6,
    rootDot: 4.7,
    ring: 1.5,
    core: true,
  },
  {
    // The tab icon. One split level and much heavier weight: at 16 pixels a
    // stroke under about one device pixel simply is not there.
    file: 'favicon.svg',
    fanout: [3, 2],
    steps: [1.55, 1.15],
    size: 32,
    radius: 14.2,
    trunkWidth: 3.5,
    rootDot: 3.5,
    ring: 0.95,
    core: false,
  },
]

interface Node {
  at: Vec3
  depth: number
  caliber: number
  branch: number
  children: Node[]
}

/** Rotate a planar direction. The whole construction stays in the z = 0 plane. */
const turn = (d: Vec3, angle: number): Vec3 => {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return v3(d.x * c - d.y * s, d.x * s + d.y * c, 0)
}

function grow(
  variant: Variant,
  at: Vec3,
  direction: Vec3,
  halfAngle: number,
  depth: number,
  branch: number,
): Node {
  const node: Node = { at, depth, caliber: 1, branch, children: [] }
  const count = variant.fanout[depth]
  if (count === undefined) return node

  const share = (halfAngle * 2) / count
  for (let i = 0; i < count; i++) {
    const heading = normalize(turn(direction, -halfAngle + share * (i + 0.5)))
    const childAt = mobiusAdd(at, expOrigin(heading, variant.steps[depth]))
    node.children.push(
      grow(
        variant,
        childAt,
        outwardDirection(at, childAt),
        share / 2,
        depth + 1,
        depth === 0 ? i : branch,
      ),
    )
  }

  // Murray's law, the same rule the renderer uses: a parent's cube is the sum of
  // its children's cubes, so a trunk splitting into finer limbs is the geometry
  // rather than a flourish.
  node.caliber = Math.cbrt(node.children.reduce((sum, c) => sum + c.caliber ** 3, 0))
  return node
}

const round = (n: number): string => (Math.round(n * 100) / 100).toString()

function render(variant: Variant): string {
  const { size, radius, trunkWidth, rootDot, ring, core } = variant
  const centre = size / 2
  // Start pointing up, so the three primary branches make an upright trefoil.
  const root = grow(variant, v3(0, 0, 0), v3(0, -1, 0), Math.PI, 0, -1)
  const trunk = root.caliber

  /** Ball coordinates to SVG user units. SVG y grows downward. */
  const project = (p: Vec3): [number, number] => [centre + p.x * radius, centre + p.y * radius]

  const paths: string[] = []
  const dots: string[] = []
  let reach = 0

  const emit = (node: Node): void => {
    for (const child of node.children) {
      const samples: string[] = []
      for (let i = 0; i <= 14; i++) {
        const [x, y] = project(geodesicPoint(node.at, child.at, i / 14))
        samples.push(`${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
      }
      // Width from the child's own calibre, tapered by the conformal factor so
      // limbs thin as they approach the boundary.
      const conformal = 1 - (child.at.x ** 2 + child.at.y ** 2)
      const width = Math.max(
        0.7,
        trunkWidth * (child.caliber / trunk) * (0.5 + conformal * 0.5),
      )
      paths.push(
        `<path d="${samples.join('')}" stroke="${BRANCH_COLORS[child.branch]}" ` +
          `stroke-width="${round(width)}" stroke-linecap="round" fill="none"/>`,
      )
      emit(child)
    }

    const [x, y] = project(node.at)
    const conformal = 1 - (node.at.x ** 2 + node.at.y ** 2)
    const r = Math.max(0.95, rootDot * (node.caliber / trunk) * (0.42 + conformal * 0.58))
    const color = node.depth === 0 ? ROOT_COLOR : BRANCH_COLORS[node.branch]
    dots.push(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${color}"/>`)
    reach = Math.max(reach, Math.hypot(x - centre, y - centre) + r)
  }

  emit(root)

  const wash = core
    ? `\n  <circle cx="${centre}" cy="${centre}" r="${round(radius * 0.6)}" fill="url(#bt-core)"/>`
    : ''
  const defs = core
    ? `\n  <defs>
    <radialGradient id="bt-core" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${ROOT_COLOR}" stop-opacity="0.4"/>
      <stop offset="0.55" stop-color="${ROOT_COLOR}" stop-opacity="0.11"/>
      <stop offset="1" stop-color="${ROOT_COLOR}" stop-opacity="0"/>
    </radialGradient>
  </defs>`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="The Binary Tree">
  <title>The Binary Tree</title>
  <!-- Generated by scripts/make-logo.ts. The curves are real Poincare disc
       geodesics and the widths follow Murray's law; do not hand edit.
       Outermost node reaches ${round(reach)} of a ${radius} radius disc. -->${defs}
  <circle cx="${centre}" cy="${centre}" r="${round(radius)}" fill="none" stroke="${RING_COLOR}" stroke-opacity="0.55" stroke-width="${ring}"/>${wash}
${paths.map((p) => `  ${p}`).join('\n')}
${dots.map((d) => `  ${d}`).join('\n')}
</svg>
`
}

for (const variant of VARIANTS) {
  const svg = render(variant)
  const out = resolve(import.meta.dirname, '../public', variant.file)
  writeFileSync(out, svg)
  const nodes = (svg.match(/<circle cx=/g) ?? []).length - (variant.core ? 2 : 1)
  console.log(`${variant.file}: ${(svg.match(/<path /g) ?? []).length} geodesics, ${nodes} nodes`)
}
