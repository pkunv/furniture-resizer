import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createChair(scene, objects) {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
  const texture = new THREE.TextureLoader().load("https://i.imgur.com/xLJVKyJ.jpeg");

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  objects.push(mesh);
}
