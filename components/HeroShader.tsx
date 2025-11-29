'use client';

import { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';


const WaveShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorDeep: new THREE.Color('#000000'),
        uColorMid: new THREE.Color('#1a1b26'),
        uColorHigh: new THREE.Color('#00f0ff'),
        uMouse: new THREE.Vector2(0, 0)
    },
    // VERTEX SHADER
    `
    varying vec2 vUv;
    varying float vDisplacement;
    varying float vDist;
    
    uniform float uTime;
    uniform vec2 uMouse;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float dist = distance(vUv, uMouse);
      vDist = dist;

      float largeWave = snoise(vec2(pos.x * 0.2 + uTime * 0.1, pos.y * 0.2 + uTime * 0.05));
      float smallWave = snoise(vec2(pos.x * 2.0 - uTime * 0.5, pos.y * 2.0));

      float interaction = 1.0 - smoothstep(0.0, 0.5, dist);
      float glitch = snoise(vec2(pos.x * 10.0, uTime * 5.0)) * interaction * 0.5;

      float displacement = largeWave * 1.0 + smallWave * 0.1 + glitch;
      
      pos.z += displacement;
      vDisplacement = displacement;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      gl_PointSize = (3.0 + interaction * 2.0) * (1.0 / -mvPosition.z);
    }
  `,
    // FRAGMENT SHADER
    `
    uniform vec3 uColorDeep;
    uniform vec3 uColorMid;
    uniform vec3 uColorHigh;
    
    varying float vDisplacement;
    varying float vDist;

    void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - step(0.5, strength);
      if (strength < 0.5) discard;

      vec3 color = mix(uColorDeep, uColorMid, vDisplacement * 0.5 + 0.5);

      float highlight = smoothstep(0.3, 1.0, vDisplacement);
      float interaction = 1.0 - smoothstep(0.0, 0.5, vDist);
      
      vec3 finalColor = mix(color, uColorHigh, highlight * 0.5 + interaction * 0.4);

      float alpha = 0.6 + interaction * 0.4; 

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ WaveShaderMaterial });

function ShaderPlane() {
    const materialRef = useRef<THREE.ShaderMaterial & { uTime: number, uMouse: THREE.Vector2 }>(null);

    useFrame((state, delta) => {
        if (materialRef.current) {

            materialRef.current.uTime += delta * 0.1;


            materialRef.current.uMouse.x = THREE.MathUtils.lerp(
                materialRef.current.uMouse.x,
                (state.pointer.x * 0.5) + 0.5,
                0.02
            );

            materialRef.current.uMouse.y = THREE.MathUtils.lerp(
                materialRef.current.uMouse.y,
                (state.pointer.y * 0.5) + 0.5,
                0.02
            );
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WaveMaterial = 'waveShaderMaterial' as any;

    return (
        <points rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.5, -2]}>
            <planeGeometry args={[20, 14, 180, 180]} />
            <WaveMaterial
                key={WaveShaderMaterial.key}
                ref={materialRef}
                transparent={true}
                depthWrite={false}
            />
        </points>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 75 }}>
                <ShaderPlane />
            </Canvas>
        </div>
    );
}