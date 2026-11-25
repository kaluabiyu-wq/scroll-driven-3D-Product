import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import { cameraLookCurve, cameraPositionCurve } from '../config/camera-path';
import { FOV_KEYS } from '../config/timeline';
import { clamp01, sampleKeys } from '../animation/math';
import { scrollState } from '../core/scroll/scrollState';

const pos = new Vector3();
const look = new Vector3();

/** Moves the camera along the keyframed path using the eased scroll value. */
export default function CameraRig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const aspect = useThree((s) => s.size.width / s.size.height);

  useFrame(() => {
    const p = clamp01(scrollState.current);
    cameraPositionCurve.getPoint(p, pos);
    cameraLookCurve.getPoint(p, look);

    // portrait screens: pull back so the product still fits
    if (aspect < 1) {
      const k = Math.min(2, 1 / Math.pow(aspect, 0.6));
      pos.sub(look).multiplyScalar(k).add(look);
    }

    camera.position.copy(pos);
    camera.lookAt(look);

    const fov = sampleKeys(FOV_KEYS, p);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
