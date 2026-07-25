/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { defaultPose } from '../../Animations/defaultPose';

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  avatar: THREE.Group | null;
}

export function createScene(container: HTMLElement): SceneContext {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f4f8);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
  hemisphereLight.position.set(0, 20, 0);
  scene.add(hemisphereLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(3, 10, 10);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const frontalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  frontalLight.position.set(-3, 2, 5);
  scene.add(frontalLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.4, 3.2);
  camera.lookAt(0, 1, 0);

  return { scene, camera, renderer, avatar: null };
}

export function loadAvatar(sceneCtx: SceneContext, stateRef: any, onLoaded: () => void) {
  const loader = new GLTFLoader();
  loader.load(
    '/models/ybot/ybot.glb',
    (gltf: any) => {
      gltf.scene.traverse((child: any) => {
        if (child.isSkinnedMesh) {
          child.frustumCulled = false;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      const avatar = gltf.scene;
      avatar.scale.set(1, 1, 1);
      avatar.position.y = 0;
      sceneCtx.scene.add(avatar);
      sceneCtx.avatar = avatar;
      stateRef.avatar = avatar;

      defaultPose(stateRef);
      onLoaded();
    },
    undefined,
    (error: any) => {
      console.error('Error loading avatar:', error);
    }
  );
}
