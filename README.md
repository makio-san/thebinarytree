# the-binary-tree

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
hyperbolic step gets visually shorter. The result is that 609 nodes sit on
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
import { BinaryTree, loaders, computerHistory } from 'the-binary-tree'

const tree = new BinaryTree(
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
new BinaryTree(
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
      neurites: {
        segments: 14, width: 0.0115, edgeShade: 0.14, wander: 1.5,
        spikeGain: 1.15, spikeTint: 0.62, spikeSwell: 0.16, color,
      },
      labels: { maxLabels: 44, maxCards: 3, fontScale: 1, text, detail, meta, body },
      glow:   { scale: 4.2, intensity: 0.55 },   // or false to switch it off
    },

    stage: {
      distance: 2.6, minDistance: 0.38, maxDistance: 7,
      bloom: true,        // defaults off for coarse pointers
      stars: true,        // or a Partial<StarfieldOptions>
      maxPixelRatio: 2,
    },

    motion: {
      ambient: true,   // keep painting so the signal and stars stay alive
      growth: 2.4,     // seconds for the tree to grow out on first load
      spikes: {        // the action potential; see src/render/spikes.ts
        period: 2.6, speed: 7, rise: 0.045, decay: 0.19,
        refractory: 0.22, jitter: 0.09,
      },
    },

    interaction: {
      onNodeClick, onNodeHover, onSelectionChange, onCenterNodeChange, onInit,
      focusOnClick: true,
      controls: {
        orbitSpeed, zoomSpeed, clickSlop, enableKeyboard,
        touchTolerance: 24,   // hit slop for touch and pen, in CSS pixels
        doubleTapWindow: 300,
      },
      flight:   { duration: 620, easing },
    },
  },
)
```

`prefers-reduced-motion: reduce` turns off `ambient` and `growth` automatically.

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
| `render()` | Requests a frame |
| `regrow(seconds?)` | Replays the growth animation from the root |
| `zoom()` | Camera closeness, 0 far out to 1 pressed against the centre |
| `setSafeArea(inset)` | Reserve edges covered by your own UI; see **Touch** |
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
| Double tap | Closer on a node, back out on the backdrop |
| Arrows | Parent, child, previous and next sibling |
| Enter, Home, Esc | Focus, return to root, clear selection |

Labels are clickable too. On a touch screen a word is a far easier target than a
sphere a few pixels across.

## Touch, and the demo on a phone

Three things make a hyperbolic tree awkward on a phone, and each has a specific
answer.

**Nodes are smaller than a fingertip.** A finger covers about 8mm and a node away
from the centre of the ball is a few pixels, so an exact ray test leaves most of
the tree untappable. Touch and pen get a hit slop: if the ray misses, the nearest
node within `touchTolerance` pixels wins, with a visibly bigger node breaking a
near tie. A mouse keeps the exact test, because a cursor really is a point, and
hover stays exact too or the highlight jumps to nodes you are not on.

**Panels cover the centre of the ball**, which is exactly where navigation puts
things. `api.setSafeArea({top, right, bottom, left})` reserves the covered
regions: the scene is shifted by half the difference on each axis so the origin
is drawn in the middle of what is left, and labels are kept out of the reserved
area entirely. It uses the projection's view offset rather than moving the
camera, so the geometric centre of the ball is still the centre of the ball; it
is simply drawn somewhere else. This helps the desktop card as much as the phone
sheet.

**There are no arrow keys.** The same four moves - parent, previous sibling, next
sibling, first branch - get real buttons in the sheet header, disabled when there
is nowhere to go. It is how you get somewhere without aiming at all.

The rest of the phone layout, below 860px:

- The detail card becomes a **bottom sheet** with a drag handle and three snap
  points. It sits at full height and is translated down, so expanding it never
  reflows its own content. Dragging is confined to the handle and header, because
  a whole-sheet drag surface fights the scroll of the content inside it.
- Search becomes a **full screen overlay**. A phone keyboard covers about half
  the viewport, so an inline field at the top would put the results behind it.
  The input is 16px, below which iOS zooms the page on focus.
- A **tab bar** carries the actions, and the year filter and legend become a
  drawer above it. Opening the drawer collapses the sheet, since together they
  would leave no canvas at all.
- Double tap zooms in on a node and back out on the backdrop, which is the
  one-handed equivalent of a pinch.
- Selection buzzes for 8ms where the platform supports it. The nodes are small
  and confirmation that you hit the one you aimed at is worth more here than
  anywhere else.
- Bloom defaults off for coarse pointers, and labels get fewer slots, smaller
  type and one card at a time. Safe area insets are respected throughout.

## Architecture

```
src/
├── math/            pure geometry, no three.js
│   ├── vec3.ts      vector and frame helpers
│   └── hyperbolic.ts Möbius addition, geodesics, isometries
├── model/           tree building and data loaders
├── layout/          cone based placement
├── render/          three.js layers: stage, nodes, glow, vessels, labels, stars
├── interaction/     navigation and input
├── data/            the computing history dataset and its Wikipedia titles
└── the-binary-tree.ts the class that ties it together

demo/
├── main.ts          wiring
├── wiki.ts          Wikipedia lookup, cached and failure tolerant
└── ui/              panel, search, bottom sheet
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
- Vessels follow geodesic arcs. A straight Euclidean line between two ball points
  is wrong; geodesics bow away from the boundary, and that is what gives the
  picture its woven look. See **Vessels** below for the thickness.
- Labels are pooled HTML over the canvas, ranked by apparent size each frame,
  largest placed first, colliding ones skipped.

### Vessels

The connections are not lines. They are tapering vessels, and that single
decision is what makes three readings hold at once: a tree, a vascular system,
and something in deep space.

Thickness follows **Murray's law**, `r_parent³ = Σ r_child³`. That is the rule
real branching systems obey - limbs, arteries, bronchi - because it minimises the
cost of moving something through a network. A trunk splitting into thinner limbs
is not a stylistic flourish, it is what the law produces. It also means the root
calibre is exactly the cube root of the leaf count, which the tests assert.

A vessel carries its **own** calibre for its whole length, not a ramp from its
parent's. The parent's calibre is the sum of its children's cubes, and that sum
is realised by the *bundle*, not by each branch separately. Ramping every child
up to the parent width at the junction stacks ten full-width trunks on a single
point and the centre saturates to white; the only licence taken with the law is a
small flare at the parent end, which is the fillet where limbs meet.

Vessels also taper by the conformal factor, so they thin into the boundary and
the far tree becomes a dust of capillaries.

Geometry is one merged, camera-facing ribbon with three vertices across: edge,
core, edge. Shading the core brighter than the edges is what makes a flat ribbon
read as a round tube, and it is what lets the pulse travel *inside* the vessel
rather than over it. Indices are built once, since visible vessels are packed
into fixed slots; only positions and colours are rewritten.

### Motion

Everything runs off one clock so it beats together rather than drifting apart:

- **Heartbeat.** A single wave leaves the root and travels outward. Its phase is
  a function of `pathLength`, distance *along the tree*, so the wavefront
  follows the branches instead of expanding as a sphere. Each vessel swells
  slightly as the crest passes, which is peristalsis, and that is what separates
  a pulse in a vessel from a light running along a wire. The crest stops short of
  white on purpose: at the centre the era colouring is doing the most work and a
  white streak erases it.
- **Growth.** On first load a reveal front sweeps outward by depth and the tree
  grows from the root. Driven by the wall clock rather than the accumulated frame
  clock: the frame clock is deliberately clamped per frame so the heartbeat
  cannot teleport after a stall, but if the tab was hidden through the intro the
  right thing is to come back to a grown tree.
- **Glow and stars.** An additive halo per node, scaled by its own conformal
  radius, plus a bloom pass where the device can afford one. Two shells of stars
  behind everything give a fixed frame of reference, without which a camera orbit
  reads as the tree spinning rather than as you moving around it. The stars opt
  out of scene fog: at a radius of 26 any usable fog density erases them.

Fog density tracks the inverse of the viewing distance, so the front/back cue
holds at every zoom, and it stays gentle because the links already carry a
hyperbolic depth fade of their own. Two fades at full strength erase the web.

### Zoom and progressive detail

`minDistance` is 0.38, well inside the unit ball, so you can fly through the
tree rather than only look at it from outside. The rim and shell hide once the
camera is inside them.

Labels gain detail as they grow: a name, then a year, then an origin line, then a
sentence of summary. It is the same element throughout, just allowed to say
more, so nothing pops in or out as you fly. Full cards are capped, because ten
top-level branches all clearing the card threshold is a wall of text with a tree
somewhere behind it.

### Images and long form text

The dataset stores Wikipedia article *titles* in `src/data/wiki.ts`, keyed by
node id, and no image URLs at all. Wikimedia thumbnail paths are content hashed:
they cannot be derived from a title, and rewriting the `/330px-` segment of one
to ask for a larger size returns HTTP 400. The demo resolves the lead image and
an extract at runtime from the REST summary endpoint, which follows redirects and
sends permissive CORS headers, then caches per session. No title, a 404 or an
offline browser all end the same way: the panel shows the dataset's own text.

## Dataset

`computerHistory` is fourteen lineages and 609 nodes: mechanical calculation and
theory, early computers, components and processors, peripherals, personal
computers, operating systems, programming languages, tools and standards, data
and databases, networks, cryptography and security, games and consoles, mobile,
and supercomputing with AI.

Games are a branch rather than a footnote. They drove consumer 3D hardware, which
became the GPU, which is what machine learning runs on; the line from Spacewar to
a datacentre full of accelerators is short and direct.

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
