import * as THREE from 'three'

// ─── Safe fallback texture ──────────────────────────────────────────────────────
const fallbackTexture = new THREE.DataTexture(
  new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat
)
fallbackTexture.needsUpdate = true

// ─── Vertex Shader ──────────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  attribute float aOffset;
  attribute vec3 aStartPos;
  attribute vec3 aControl1;
  attribute vec3 aControl2;
  attribute vec3 aEndPos;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSpeed;

  uniform float uTime;
  uniform float uDuration;
  uniform vec3 uMouse;
  uniform float uMouseRadius;

  varying vec3 vColor;
  varying float vAlpha;

  // Cubic bezier curve — identical to the BAS shader chunk
  vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t) {
    float tn = 1.0 - t;
    return tn*tn*tn * p0
         + 3.0*tn*tn*t * c0
         + 3.0*tn*t*t * c1
         + t*t*t * p1;
  }

  void main() {
    vColor = aColor;

    // Each particle loops along its bezier path at its own speed
    float tProgress = fract((uTime * aSpeed + aOffset) / uDuration);

    // Position on the bezier curve
    vec3 pos = cubicBezier(aStartPos, aControl1, aControl2, aEndPos, tProgress);

    // ── Mouse repulsion ──────────────────────────────────────────────────────
    vec3 toParticle = pos - uMouse;
    float dist = length(toParticle);
    // Smooth falloff: full push at center, zero at uMouseRadius
    float repulsion = smoothstep(uMouseRadius, 0.0, dist);
    // Safe normalize (epsilon prevents division by zero)
    vec3 pushDir = toParticle / max(dist, 0.01);
    pos += pushDir * repulsion * 2.5;

    // Fade in at start of path, fade out at end — prevents pop-in
    vAlpha = smoothstep(0.0, 0.08, tProgress) * smoothstep(1.0, 0.92, tProgress);
    // Also fade particles that are far from camera (depth fog)
    vAlpha *= smoothstep(8.0, 2.0, abs(pos.z));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Safe size attenuation — max() prevents division by zero
    float depth = max(-mvPosition.z, 0.1);
    gl_PointSize = aSize * (80.0 / depth);

    gl_Position = projectionMatrix * mvPosition;
  }
`

// ─── Fragment Shader ────────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular soft-edge particle
    vec2 pt = gl_PointCoord - vec2(0.5);
    float dist = dot(pt, pt);
    if (dist > 0.25) discard;

    // Soft glow falloff from center to edge
    float alpha = vAlpha * smoothstep(0.25, 0.05, dist);

    gl_FragColor = vec4(vColor, alpha * 0.85);
  }
`

// ─── Material Class ─────────────────────────────────────────────────────────────
class StreamParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:        { value: 0 },
        uDuration:    { value: 10.0 },
        uMouse:       { value: new THREE.Vector3(0, 100, 0) }, // off-screen by default
        uMouseRadius: { value: 2.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }
}

export default StreamParticleMaterial
