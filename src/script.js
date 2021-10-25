import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

let camera, scene, renderer;
let mesh;
var objects = [];
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 800;

  scene = new THREE.Scene();

  const texture = new THREE.TextureLoader().load(
    "https://i.imgur.com/xLJVKyJ.jpeg"
  );

  const geometry = new THREE.BoxGeometry(600, 50, 300);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  var canvas = document.getElementById("threeCanvas");
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  objects.push(mesh);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  document.body.appendChild(renderer.domElement);

  //
  const orbitControls = new OrbitControls(camera, renderer.domElement);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}

function animate() {
  requestAnimationFrame(animate);
  onWindowResize();
  renderer.render(scene, camera);
}
