import "./style.css";
import { createTable } from "./furnitures/table";
import { createChair } from "./furnitures/chair";
import * as init from "./init";

let scene = init.Scene();
let renderer = init.Renderer(document.getElementById("threeCanvas"));
let camera = init.Camera(renderer);
var objects = [];

let currFurniture;

let area;
let wholematerial;

let tableGeometryDims = [
  [1.5, 0.1, 1], // tabletop
  [0.1, 0.5, 0.1], // legs
];

let changeBtn = document.createElement("button");
changeBtn.innerHTML = "Accept changes";
changeBtn.id = "change-btn";
changeBtn.addEventListener("click", updateDims);

function initTableDOM() {
  var nodes = document.getElementsByTagName("input");
  for (var i = 0, len = nodes.length; i != len; ++i) {
    nodes[0].parentNode.removeChild(nodes[0]);
  }
  var previousContainer = document.getElementsByClassName("furnitureInfoContainer");
  if (previousContainer.length != 0) {
    previousContainer[0].remove();
  }

  var tableContainer = document.createElement("div");
  tableContainer.className = "furnitureInfoContainer";
  var tableInfo = document.createElement("div");
  area = Math.round(tableGeometryDims[0][0] * tableGeometryDims[0][2] * 100) / 100;
  wholematerial =
    2 * (tableGeometryDims[0][0] * tableGeometryDims[0][2] + tableGeometryDims[0][0] * tableGeometryDims[0][1] + tableGeometryDims[0][0] * tableGeometryDims[0][1]) +
    4 * 2 * (tableGeometryDims[1][0] * tableGeometryDims[1][2] + tableGeometryDims[1][0] * tableGeometryDims[1][1] + tableGeometryDims[1][0] * tableGeometryDims[1][1]);
  wholematerial = Math.round(wholematerial * 100) / 100;
  tableInfo.innerHTML = "<span id='area'>Area of tabletop:" + area + "m²</span><br/><span id='wholematerial'>Whole material:" + wholematerial + "m³</span>";
  var inputContainer = document.createElement("div");

  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Length of tabletop";
        break;
      case 1:
        var label = "Thickness of tabletop";
        break;
      case 2:
        var label = "Height of tabletop";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    unit.innerHTML = "mm";
    input.placeholder = label;
    input.type = "number";
    input.className = "tableDimSet dimSet";
    input.id = "pos" + i;
    input.step = "1";
    input.min = "1";
    input.value = tableGeometryDims[0][i] * 1000;
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);

    inputContainer.appendChild(inputDiv);
  }
  tableContainer.appendChild(inputContainer);
  tableContainer.appendChild(tableInfo);
  document.body.appendChild(tableContainer);
  document.body.appendChild(changeBtn);
}
function initChairDOM() {
  var nodes = document.getElementsByTagName("input");
  for (var i = 0, len = nodes.length; i != len; ++i) {
    nodes[0].parentNode.removeChild(nodes[0]);
  }
  var previousContainer = document.getElementsByClassName("furnitureInfoContainer");
  if (previousContainer.length != 0) {
    previousContainer[0].remove();
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
    document.body.appendChild(changeBtn);
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
    currFurniture = "table";
    initTableDOM();
    createTable(scene, objects, tableGeometryDims);
  }
  if (furniture == "chair") {
    currFurniture = "chair";
    initChairDOM();
    createChair(scene, objects);
  }
}

function updateDims() {
  console.log("dupa");
  if (currFurniture == "table") {
    for (var i = 0; i < 3; i++) {
      tableGeometryDims[0][i] = document.getElementById("pos" + i).value / 1000;
    }
    area = Math.round(tableGeometryDims[0][0] * tableGeometryDims[0][2] * 100) / 100;
    wholematerial =
      2 * (tableGeometryDims[0][0] * tableGeometryDims[0][2] + tableGeometryDims[0][0] * tableGeometryDims[0][1] + tableGeometryDims[0][0] * tableGeometryDims[0][1]) +
      4 * 2 * (tableGeometryDims[1][0] * tableGeometryDims[1][2] + tableGeometryDims[1][0] * tableGeometryDims[1][1] + tableGeometryDims[1][0] * tableGeometryDims[1][1]);
    wholematerial = Math.round(wholematerial * 100) / 100;
    document.getElementById("area").innerHTML = "Area of tabletop:" + area + "m²";
    document.getElementById("wholematerial").innerHTML = "Whole material:" + wholematerial + "m³";
    createTable(scene, objects, tableGeometryDims);
  }
}

window.onload = function () {
  updateMesh();
  document.getElementById("furnitureSelect").addEventListener("change", updateMesh);

  animate();
};
