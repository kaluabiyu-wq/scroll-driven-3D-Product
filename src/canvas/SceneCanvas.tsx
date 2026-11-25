import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { getQuality } from '../config/quality';
import CameraRig from './CameraRig';
import ScrollSync from './ScrollSync';
import Headphones from './product/Headphones';


const quality = getQuality();

/** Fixed full-screen canvas behind the page content. */
export default function SceneCanvas() {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || document.visibilityState === 'visible');

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return (
    <div className="canvas-layer" aria-hidden="true">
      <Canvas
        dpr={quality.dpr}
        camera={{ fov: 38, position: [0, 0.3, 6.2], near: 0.1, far: 60 }}
        gl={{ antialias: quality.antialias, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', () => {
            window.dispatchEvent(new Event('halo:webgl-lost'));
          }, { once: true });
        }}
      >
        <ScrollSync />
        <CameraRig />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 3]} intensity={1.6} />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#9fc3ff" />

        {/* Built-in studio lighting: no HDR download needed */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 6, -4]} scale={[14, 6, 1]} />
          <Lightformer form="rect" intensity={2} position={[-6, 1, 2]} scale={[4, 8, 1]} />
          <Lightformer form="rect" intensity={2} position={[6, 1, 2]} scale={[4, 8, 1]} />
          <Lightformer form="circle" intensity={1.5} position={[0, -3, 4]} scale={5} />
        </Environment>

        <Suspense fallback={null}>
          <Headphones />
        </Suspense>

        {quality.shadows && (
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.35}
            scale={9}
            blur={2.6}
            far={3}
          />
        )}
      </Canvas>
    </div>
  );
}
