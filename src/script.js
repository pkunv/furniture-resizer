import "./style.css";
import { createTable } from "./furnitures/table";
import { createChair } from "./furnitures/chair";
import * as init from "./init";

let scene = init.Scene();
let renderer = init.Renderer(document.getElementById("threeCanvas"));
let camera = init.Camera(renderer);
var objects = [];

let tableGeometryDims = [
  [1.5, 0.1, 1], // tabletop
  [0.1, 0.5, 0.1], // legs
];

function initTableDOM() {
  var nodes = document.getElementsByTagName("input");
  for (var i = 0, len = nodes.length; i != len; ++i) {
    nodes[0].parentNode.removeChild(nodes[0]);
  }
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Dimension X for tabletop";
        break;
      case 1:
        var label = "Dimension Y for tabletop";
        break;
      case 2:
        var label = "Dimension Z for tabletop";
        break;
    }
    var input = document.createElement("input");
    input.placeholder = label;
    input.type = "number";
    input.className = "tableDimSet dimSet";
    input.id = "pos" + i;
    document.body.appendChild(input);
  }
}
function initChairDOM() {
  var nodes = document.getElementsByTagName("input");
  for (var i = 0, len = nodes.length; i != len; ++i) {
    nodes[0].parentNode.removeChild(nodes[0]);
  }
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Dimension X for chair";
        break;
      case 1:
        var label = "Dimension Y for chair";
        break;
      case 2:
        var label = "Dimension Z for chair";
        break;
    }
    var input = document.createElement("input");
    input.placeholder = label;
    input.type = "number";
    input.className = "chairDimSet dimSet";
    input.id = "pos" + i;
    document.body.appendChild(input);
  }
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

function updateMesh() {
  scene.remove(scene.children[0]);
  var furniture = document.getElementById("furnitureSelect").value;
  if (furniture == "table") {
    initTableDOM();
    createTable(scene, objects, tableGeometryDims);
  }
  if (furniture == "chair") {
    initChairDOM();
    createChair(scene, objects);
  }
}

window.onload = function () {
  updateMesh();
  document.getElementById("furnitureSelect").addEventListener("change", updateMesh);
  animate();
};
