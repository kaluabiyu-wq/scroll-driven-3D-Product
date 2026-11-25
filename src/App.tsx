import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { MathUtils, Vector3 } from 'three';
import type { Group } from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from './scrollState';
import Story from './Story';

gsap.registerPlugin(ScrollTrigger);

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: '#story',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollState.target = self.progress;
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

function Model() {
  const { scene } = useGLTF('/models/test.glb');
  const group = useRef<Group>(null!);

  useFrame((_, delta) => {
    scrollState.current = MathUtils.damp(
      scrollState.current,
      scrollState.target,
      4,
      delta
    );
    group.current.rotation.y = scrollState.current * Math.PI * 2;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

const camStart = new Vector3(0, 0, 4);
const camEnd = new Vector3(2, 0.8, 2.5);

function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerpVectors(camStart, camEnd, scrollState.current);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

useGLTF.preload('/models/test.glb');

export default function App() {
  useSmoothScroll();

  return (
    <>
      <div style={{ position: 'fixed', inset: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Model />
            <Environment preset="studio" />
          </Suspense>
          <CameraRig />
        </Canvas>
      </div>
      <Story/>
    </>
  );
}