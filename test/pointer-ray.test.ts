import { describe, expect, it } from 'vitest'
import { PerspectiveCamera } from 'three'
import { insideBall, pointerOnPlane } from '../src/interaction/pointer-ray'

/** A camera set up the way the stage does: looking at the origin from `distance`. */
function stageCamera(distance = 2.6, aspect = 16 / 9, fov = 42): PerspectiveCamera {
  const camera = new PerspectiveCamera(fov, aspect, 0.004, 200)
  camera.position.set(0, 0, distance)
  camera.lookAt(0, 0, 0)
  camera.updateMatrixWorld()
  camera.updateProjectionMatrix()
  return camera
}

const origin = { x: 0, y: 0, z: 0 }

describe('pointer to ball', () => {
  it('maps the centre of the screen to the centre of the ball', () => {
    const point = pointerOnPlane({ x: 0, y: 0 }, stageCamera(), origin)!
    expect(point.x).toBeCloseTo(0, 9)
    expect(point.y).toBeCloseTo(0, 9)
    expect(point.z).toBeCloseTo(0, 9)
    expect(insideBall(point)).toBe(true)
  })

  it('finds a point inside the ball for a pointer over empty interior', () => {
    // This is the case that decides whether a drag grabs the tree or orbits: a
    // spot with no node under it, well inside the silhouette.
    const camera = stageCamera()
    const point = pointerOnPlane({ x: -0.3, y: 0.4 }, camera, origin)!
    expect(insideBall(point)).toBe(true)
    // Left and up on screen means negative x, positive y in the ball.
    expect(point.x).toBeLessThan(0)
    expect(point.y).toBeGreaterThan(0)
  })

  it('lands outside the ball beyond the silhouette, so that gesture orbits', () => {
    // At this distance and field of view the ball fills the height, so the far
    // corners of a wide viewport are outside it.
    const point = pointerOnPlane({ x: -0.98, y: -0.95 }, stageCamera(), origin)
    expect(insideBall(point)).toBe(false)
  })

  it('scales with the viewing distance', () => {
    const near = pointerOnPlane({ x: 0.5, y: 0 }, stageCamera(1.2), origin)!
    const far = pointerOnPlane({ x: 0.5, y: 0 }, stageCamera(6), origin)!
    // The same screen offset covers more of the ball when you are further away.
    expect(Math.abs(far.x)).toBeGreaterThan(Math.abs(near.x))
  })

  it('measures on the plane through the reference point, not through the origin', () => {
    // A drag has to move the grabbed point in the plane it already occupies, or
    // it slides out from under the finger.
    const camera = stageCamera()
    const reference = { x: 0, y: 0, z: 0.5 }
    const point = pointerOnPlane({ x: 0.4, y: 0 }, camera, reference)!
    expect(point.z).toBeCloseTo(0.5, 9)
  })

  it('follows the camera around an orbit', () => {
    const camera = new PerspectiveCamera(42, 16 / 9, 0.004, 200)
    camera.position.set(2.6, 0, 0)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    // Viewed down the x axis, screen x maps onto the z axis instead.
    const point = pointerOnPlane({ x: 0.4, y: 0 }, camera, origin)!
    expect(point.x).toBeCloseTo(0, 6)
    expect(Math.abs(point.z)).toBeGreaterThan(0.2)
  })

  it('survives a zero sized canvas rather than returning nonsense', () => {
    // A hidden or unlaid-out canvas gives a zero rect, and the NDC comes out NaN.
    // Left unguarded that produced a point of NaNs, every comparison against it
    // was false, and every drag silently became an orbit.
    expect(pointerOnPlane({ x: Number.NaN, y: 0 }, stageCamera(), origin)).toBeNull()
    expect(insideBall(null)).toBe(false)
    expect(insideBall({ x: Number.NaN, y: 0, z: 0 })).toBe(false)
  })

  it('rejects a ray pointing away from the plane', () => {
    const camera = stageCamera()
    // Camera behind the plane looking further away.
    camera.position.set(0, 0, -2.6)
    camera.lookAt(0, 0, -10)
    camera.updateMatrixWorld()
    expect(pointerOnPlane({ x: 0, y: 0 }, camera, origin)).toBeNull()
  })
})
