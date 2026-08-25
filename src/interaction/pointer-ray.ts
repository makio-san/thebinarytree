/**
 * Turning a pointer position into a point of the ball.
 *
 * Kept out of `Controls` because it is pure geometry and the thing worth testing.
 * Controls owns event plumbing; this owns the question "where in the ball is the
 * user pointing", which is what decides whether a drag grabs the tree or orbits
 * the camera.
 */

import { Plane, Vector3, type PerspectiveCamera } from 'three'
import type { Vec3 } from '../math'

const plane = new Plane()
const rayDirection = new Vector3()
const referencePoint = new Vector3()
const hit = new Vector3()
const cameraDirection = new Vector3()

/**
 * Where the pointer sits on the plane through `reference` that faces the camera.
 *
 * Measuring on the plane through the grabbed point, rather than on the ball's
 * surface, is what makes a drag feel direct: the point moves in the plane it
 * already occupies, so it stays under the finger instead of sliding around a
 * sphere. Returned unclamped, because callers need the true position to decide
 * whether the pointer is inside the ball at all.
 *
 * `ndc` is in normalised device coordinates. Returns null only when the ray runs
 * parallel to the plane or points away from it.
 */
export function pointerOnPlane(
  ndc: { x: number; y: number },
  camera: PerspectiveCamera,
  reference: Vec3,
): Vec3 | null {
  if (!Number.isFinite(ndc.x) || !Number.isFinite(ndc.y)) return null

  camera.getWorldDirection(cameraDirection)
  referencePoint.set(reference.x, reference.y, reference.z)
  plane.setFromNormalAndCoplanarPoint(cameraDirection, referencePoint)

  const origin = camera.position
  rayDirection.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(origin).normalize()
  if (!Number.isFinite(rayDirection.x)) return null

  const denominator = plane.normal.dot(rayDirection)
  if (Math.abs(denominator) < 1e-6) return null
  const t = -(plane.normal.dot(origin) + plane.constant) / denominator
  if (t <= 0) return null

  hit.copy(origin).addScaledVector(rayDirection, t)
  return { x: hit.x, y: hit.y, z: hit.z }
}

/** Whether a point lies strictly inside the unit ball. */
export const insideBall = (p: Vec3 | null): boolean =>
  p !== null && p.x * p.x + p.y * p.y + p.z * p.z < 1
