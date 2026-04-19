import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";

// ─── Module state ─────────────────────────────────────────────────────────────
let initialized = false;
const ref = {
  flag: false,
  pending: false,
  animations: [],
  characters: [],
  scene: null,
  renderer: null,
  camera: null,
  avatar: null,
  speed: 0.12, // Faster default
  pause: 100,  // Much lower default gap
  animate: () => {} // function ref (prevents crash on hot-reload)
};

export function setAnimationSpeed(val) {
  ref.speed = val;
  // Aggressive pause reduction (Turbo = 0ms gap)
  ref.pause = Math.max(0, 400 - (val * 1000));
}

export function setAnimationPause(val) {
  ref.pause = val;
}

export function updateWordList(data) {
  if (!data || data.length === 0) return;

  // Display the full sentence at the start
  const fullSentence = data.join(' ').toUpperCase();
  ref.animations.push(['add-text', fullSentence]);

  for (let word of data) {
    const upperWord = word.toUpperCase();

    if (words[upperWord]) {
      words[upperWord](ref);
    } else {
      // Finger-spell but keep the word on screen
      for (let ch of word) {
        const upperCh = ch.toUpperCase();
        if (alphabets[upperCh]) {
          alphabets[upperCh](ref);
        }
      }
    }
  }
}

export function NewThree(labelId, containerId) {
  if (initialized) return;
  initialized = true;

  const label = document.getElementById(labelId);
  const container = document.getElementById(containerId);
  if (!container) return;

  // ─── Scene Setup ──────────────────────────────────────────────────────────
  ref.scene = new THREE.Scene();
  ref.scene.background = new THREE.Color(0xf0f4f8); // Light premium background

  // High fidelity lighting for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  ref.scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
  hemisphereLight.position.set(0, 20, 0);
  ref.scene.add(hemisphereLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(3, 10, 10);
  dirLight.castShadow = true;
  ref.scene.add(dirLight);

  const frontalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  frontalLight.position.set(-3, 2, 5);
  ref.scene.add(frontalLight);

  ref.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  ref.renderer.setSize(container.clientWidth, container.clientHeight);
  ref.renderer.setPixelRatio(window.devicePixelRatio);
  ref.renderer.shadowMap.enabled = true;
  container.appendChild(ref.renderer.domElement);

  ref.camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  ref.camera.position.set(0, 1.4, 3.2);
  ref.camera.lookAt(0, 1, 0);

  // ─── Animation Engine ─────────────────────────────────────────────────────
  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      // if (label) label.textContent = "READY"; // Removed to keep last word visible or clear it
      return;
    }

    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        if (ref.animations[0][0] === 'add-text') {
          if (label) label.textContent = ref.animations[0][1];
          ref.animations.shift();
        } else {
          for (let i = 0; i < ref.animations[0].length;) {
            let [boneName, action, axis, limit, sign] = ref.animations[0][i];
            const bone = ref.avatar.getObjectByName(boneName);

            if (bone) {
              if (sign === "+" && bone[action][axis] < limit) {
                bone[action][axis] += ref.speed;
                bone[action][axis] = Math.min(bone[action][axis], limit);
                i++;
              } else if (sign === "-" && bone[action][axis] > limit) {
                bone[action][axis] -= ref.speed;
                bone[action][axis] = Math.max(bone[action][axis], limit);
                i++;
              } else {
                ref.animations[0].splice(i, 1);
              }
            } else {
              ref.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      ref.animations.shift();
      if (ref.pause > 0) {
        ref.flag = true;
        setTimeout(() => {
          ref.flag = false;
        }, ref.pause);
      } else {
        ref.flag = false;
      }
    }

    ref.renderer.render(ref.scene, ref.camera);
  };

  // ─── Load Avatar ──────────────────────────────────────────────────────────
  const loader = new GLTFLoader();
  // Defaulting to ybot.glb from public/models
  loader.load(
    "/models/ybot/ybot.glb",
    (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isSkinnedMesh) {
          child.frustumCulled = false;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      ref.avatar = gltf.scene;
      ref.avatar.scale.set(1, 1, 1);
      ref.avatar.position.y = 0;
      ref.scene.add(ref.avatar);

      // Initial pose
      defaultPose(ref);

      console.log("Avatar loaded successfully");
    },
    undefined,
    (error) => {
      console.error("Error loading avatar:", error);
    }
  );

  // Initial render loop start
  const initialRender = () => {
    if (!ref.pending) {
      ref.renderer.render(ref.scene, ref.camera);
      requestAnimationFrame(initialRender);
    }
  };
  initialRender();
}