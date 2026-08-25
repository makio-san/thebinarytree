# computer-tree

A 3D hyperbolic tree browser, and a dataset of the history of computing to put
in it.

Modelled on [d3-hypertree](https://github.com/glouwa/d3-hypertree), moved from
the Poincaré disc to the Poincaré ball and from SVG to three.js.

## Why hyperbolic

In Euclidean space the area available to a tree grows linearly while the node
count grows exponentially. Past the fourth level it either overflows or becomes
illegible. In hyperbolic space circumference grows exponentially too, at the
same rate the tree does, so a fixed hyperbolic step leaves the same apparent
width at every level.

The Poincaré ball fits that inside a unit sphere. The model is conformal, so
angles look right and only distance is distorted: near the boundary a fixed
hyperbolic step gets visually shorter. The result is that 467 nodes sit on
screen at once, whatever you bring to the centre is large and readable, and the
rest tapers into a fringe instead of disappearing.

All navigation reduces to one question, which point should end up where, and one
isometry:

```
T(x) = to ⊕ ((-from) ⊕ x)
```

`⊕` is Möbius addition. The left cancellation law, `(-a) ⊕ (a ⊕ b) = b`, gives
`T(from) = to` directly. Dragging a node and flying one to the centre are two
uses of the same formula.

## Install

```bash
npm install
```

Dev server, which serves the demo:

```bash
npm run dev
```

Vite's default port is 5173. `.claude/launch.json` uses 5199 to avoid clashing
with another project.

Tests, typecheck, build:

```bash
npm test
npm run typecheck
npm run build
npm run build:demo
```

`three` is a peer dependency; the consuming project brings its own version.

## Usage

```ts
import { ComputerTree, loaders, computerHistory } from 'computer-tree'

const tree = new ComputerTree(
  { parent: document.getElementById('app')! },
  { dataloader: loaders.fromObject(computerHistory) },
)

await tree.initPromise
tree.api.gotoNode('intel-4004')
```

The two argument shape comes from d3-hypertree: the first object says *where*
the component lives, the second says *what* it shows and how it behaves. The
container is sized by CSS; the library never resizes it.

### Configuration

```ts
new ComputerTree(
  { parent, id, classes },
  {
    dataloader,          // () => TreeDatum | Promise<TreeDatum>
    theme: 'dark',       // 'dark' | 'light' | your own Theme
    filter: (n) => true, // returning false dims a node, it does not move it

    layout: {
      linkLength: (n) => (n.depth <= 1 ? 1.45 : 1.0),
      spread: 0.92,        // how much of its fair cone a sibling claims
      weightExponent: 0.5, // damping applied to leaf counts
      weight: 'leaves',    // 'leaves' | 'uniform' | 'depth' | (n) => number
      maxCone: 1.15,
    },

    geometry: {
      nodes:  { baseRadius: 0.082, radius, color, minRadius, cullRadius },
      links:  { segments: 14, opacity: 0.92, color },
      labels: { maxLabels: 44, text, detail },
    },

    stage: { distance: 2.6, minDistance: 1.45, maxDistance: 7 },

    interaction: {
      onNodeClick, onNodeHover, onSelectionChange, onCenterNodeChange, onInit,
      focusOnClick: true,
      controls: { orbitSpeed, zoomSpeed, clickSlop, enableKeyboard },
      flight:   { duration: 620, easing },
    },
  },
)
```

### API

On `tree.api`:

| Call | Does |
|---|---|
| `gotoNode(node or id)` | Flies the node to the centre |
| `gotoHome()` | Brings the root back to the centre |
| `select(target, focus?)` | Selects, optionally flies; `null` clears |
| `centerNode()` | The node currently nearest the centre |
| `search(query, limit?)` | Diacritic insensitive name and summary search |
| `find(predicate)` | First matching node |
| `refilter(filter?)` | Reapplies the dimming filter |
| `relayout(options?)` | Rebuilds the layout with new settings |
| `setTheme(theme)` | Dark, light, or your own |
| `render()` | Requests a frame; drawing is on demand |
| `resize()`, `destroy()` | Sizing and teardown |

### Your own data

The data model is plain: `name`, optional `children`, everything else free.

```ts
loaders.fromObject({ name: 'Root', children: [{ name: 'Branch' }] })
loaders.fromUrl('/tree.json')
loaders.fromFlat(rows, { id: r => r.id, parentId: r => r.parentId })
loaders.nTree(3, 6)   // synthetic, for benchmarking
```

Omit `id` and it is derived from the path (`root/branch`), with diacritics
folded.

## Controls

| Gesture | Result |
|---|---|
| Drag a node | Pulls it through hyperbolic space, the tree follows rigidly |
| Drag empty space | Orbits the camera around the ball |
| Shift + drag | Pulls the centre of the ball |
| Wheel / pinch | Moves the camera in and out |
| Click a node | Selects it and flies it to the centre |
| Arrows | Parent, child, previous and next sibling |
| Enter, Home, Esc | Focus, return to root, clear selection |

## Architecture

```
src/
├── math/            pure geometry, no three.js
│   ├── vec3.ts      vector and frame helpers
│   └── hyperbolic.ts Möbius addition, geodesics, isometries
├── model/           tree building and data loaders
├── layout/          cone based placement
├── render/          three.js layers (stage, nodes, links, labels)
├── interaction/     navigation and input
├── data/            the computing history dataset
└── computer-tree.ts the class that ties it together
```

`math` deliberately knows nothing about three.js. The correctness of the
geometry has to be testable without a WebGL context, and most of the tests live
there.

### Layout

A 2D hyperbolic tree gives each child an angular wedge of its parent's wedge,
sized by subtree weight. In 3D the wedge becomes a cone and the quantity being
shared out is solid angle:

1. The root owns the whole sphere.
2. A node with half angle `α` owns a spherical cap of area proportional to
   `1 - cos α`.
3. Each child takes a slice of that cap proportional to its weight, and its own
   half angle is read back from the slice area.
4. The child is aimed at the centre of its slice, with the azimuth advancing by
   the golden angle between siblings, so siblings spiral rather than line up.

Weight is the square root of the leaf count, not the raw count
(`weightExponent: 0.5`). Share it directly and a branch with 400 leaves takes
400 times the cone of its single leaf neighbour, which reduces small branches to
slivers.

An only child always stays on the parent axis; otherwise long chains such as x86
and Windows NT corkscrew.

### Numerical precision

Depth is expensive in the Poincaré ball. The longest chain in the dataset (x86,
fourteen levels) comes within 4e-7 of the boundary, where `1 - |p|²` burns six
significant digits. That mattered in two places:

- **Distance.** `2 artanh|(-a) ⊕ b|` is the shorter identity, but Möbius
  addition of two points near the boundary evaluates `1 + 2⟨a,b⟩ + ...`, where
  the terms cancel. Using `2 asinh(|a-b| / √((1-|a|²)(1-|b|²)))` instead took
  measurement error from 1e-5 to under 1e-10. The test pins 9 digits.
- **Composition.** A drag or a flight never stacks a fresh transform on the live
  positions each frame. A `viewStart` snapshot is taken when the gesture begins
  and every frame applies a single isometry to it. Intermediate frames therefore
  interpolate the *target point* along a geodesic, not the node positions, so
  every frame is still a rigid motion and the layout does not deform mid-flight.

### Rendering

- Nodes are one `InstancedMesh`. The radius is `baseRadius · (1 - |p|²)`, the
  conformal factor of the position. That single term is what makes the picture
  hyperbolic.
- `minRadius` is a **floor**, not a cull threshold. Bringing something to the
  centre pins the rest against the boundary, where the conformal factor takes it
  to a millionth of a pixel; clamping rather than dropping turns the boundary
  into a readable fringe.
- Links are geodesic arcs. A straight Euclidean line between two ball points is
  wrong; geodesics bow away from the boundary, and that is what gives the picture
  its woven look.
- Labels are pooled HTML over the canvas, ranked by apparent size each frame,
  largest placed first, colliding ones skipped.
- Drawing is on demand: a frame is produced only when something changed or an
  animation is running.

## Dataset

`computerHistory` is ten lineages and 467 nodes: mechanical calculation and
theory, early computers, components and processors, peripherals, personal
computers, operating systems, programming languages, networks, mobile, and
supercomputing with AI.

Nesting follows descent rather than category. MINIX sits under Unix and Linux
under MINIX. The chain from ALGOL 60 through CPL, BCPL, B, and C is a real
chain: each step is someone fitting the previous language onto a smaller
machine.

Dates are the year a thing first worked or first shipped. Where the two differ
significantly the summary says so.

Dataset integrity is held by tests: unique ids, known eras, plausible year
range, no child predating its parent by more than a decade, a summary on every
leaf.

## Limits

- With a constant link length, double precision runs out past about 20 levels of
  depth. For deeper trees reduce `linkLength` or decay it with depth.
- `filter` dims rather than relayouts. Deliberate: having the tree rearrange
  under the reader while they move a slider is a poor experience.
- Labels are HTML, so `maxLabels` has to stay modest at very high node counts.
  Node and link counts are on the GPU side, where a few thousand is not a
  problem.

## License

MIT
