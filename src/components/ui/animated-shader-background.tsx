"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 scaledUv = vec2(uv.x * aspectRatio, uv.y);
    
    // Create flowing noise patterns
    float time = uTime * 0.15;
    
    // Multiple layers of noise for depth
    float noise1 = fbm(scaledUv * 2.0 + vec2(time * 0.5, time * 0.3));
    float noise2 = fbm(scaledUv * 3.0 - vec2(time * 0.4, time * 0.2));
    float noise3 = fbm(scaledUv * 1.5 + vec2(time * 0.3, -time * 0.4));
    
    // Combine noises
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    combinedNoise = combinedNoise * 0.5 + 0.5; // Normalize to 0-1
    
    // Create color gradients
    vec3 color1 = mix(uColorA, uColorB, smoothstep(0.0, 0.5, combinedNoise));
    vec3 color2 = mix(color1, uColorC, smoothstep(0.4, 1.0, combinedNoise));
    
    // Add subtle wave distortion
    float wave = sin(uv.x * 10.0 + time * 2.0) * 0.02;
    float wave2 = cos(uv.y * 8.0 + time * 1.5) * 0.02;
    
    // Final color with wave influence
    vec3 finalColor = color2;
    finalColor += vec3(wave + wave2) * 0.1;
    
    // Add subtle vignette
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.5);
    finalColor *= vignette * 0.3 + 0.7;
    
    // Add subtle glow spots
    float glow1 = smoothstep(0.3, 0.0, length(uv - vec2(0.3 + sin(time) * 0.1, 0.4 + cos(time * 0.7) * 0.1)));
    float glow2 = smoothstep(0.25, 0.0, length(uv - vec2(0.7 + cos(time * 0.8) * 0.1, 0.6 + sin(time * 0.6) * 0.1)));
    
    finalColor += uColorB * glow1 * 0.15;
    finalColor += uColorC * glow2 * 0.1;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface ShaderPlaneProps {
  colorA?: string;
  colorB?: string;
  colorC?: string;
}

function ShaderPlane({ 
  colorA = "#1e3a8a", 
  colorB = "#3b82f6", 
  colorC = "#60a5fa" 
}: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
    }),
    [colorA, colorB, colorC, size.width, size.height]
  );

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface AnoAIProps {
  className?: string;
  colorA?: string;
  colorB?: string;
  colorC?: string;
  opacity?: number;
  blendMode?: string;
}

export default function AnoAI({
  className = "",
  colorA = "#1e3a8a",
  colorB = "#3b82f6",
  colorC = "#60a5fa",
  opacity = 1,
  blendMode = "normal",
}: AnoAIProps) {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ 
        opacity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <ShaderPlane colorA={colorA} colorB={colorB} colorC={colorC} />
      </Canvas>
    </div>
  );
}
