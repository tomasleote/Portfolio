import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vPosition;

  uniform float time;

  void main() {
      float distFromCenter = length(position);

      vec3 posFinal = position;

      float pulsateDist = sin(distFromCenter*(1.5+sin(time*0.2)*0.5) + time*0.3);
      float offsetX = pulsateDist * 0.7 * sin( 0.8*position.x  + time*0.7 );
      float offsetY = pulsateDist * 0.7 * cos( 0.8*position.y  + time*0.7 );
      posFinal.x += offsetX;
      posFinal.y += offsetY;

      vPosition = posFinal;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( posFinal, 1.0 );
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vPosition;

  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float rate;

  void main() {
     // Map the local geometry coordinates to UV coordinates (0.0 to 1.0)
     // Width is 28.8 (-14.4 to 14.4), Height is 19.2 (-9.6 to 9.6)
     vec2 pos = vec2(
       (vPosition.x + 14.4) / 28.8,
       (vPosition.y + 9.6) / 19.2
     );

     // Ensure UVs are clamped to prevent texture wrapping artifacts if it goes out of bounds
     pos = clamp(pos, 0.0, 1.0);

     vec4 color1 = texture2D(uTexture1, pos);
     vec4 color2 = texture2D(uTexture2, pos);

     gl_FragColor = color1 * (1.0 - rate) + color2 * rate;
  }
`

export default class ImageSlideMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0.0 },
        rate: { value: 0.0 },
        uTexture1: { value: null },
        uTexture2: { value: null },
      },
      vertexShader,
      fragmentShader,
      depthTest: true,
      transparent: true,
    })
  }
}
