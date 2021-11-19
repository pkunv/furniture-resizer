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

let chairGeometryDims = [
  [0.75, 0.1, 0.75], // chairbase
  [0.75, 1, 0.1], // chair back
  [0.1, 0.75, 0.1], // legs
];

let changeBtn = document.createElement("button");
changeBtn.innerHTML = "Apply changes";
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
  var inputTabletop = document.createElement("div");
  var inputLegs = document.createElement("div");
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Width of tabletop";
        break;
      case 1:
        var label = "Height of tabletop";
        break;
      case 2:
        var label = "Length of tabletop";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    var inputType = document.createElement("small");
    inputType.innerHTML = label;
    inputType.style.position = "absolute";
    inputType.style.marginTop = "-24px";
    unit.innerHTML = "mm";
    input.type = "number";
    input.className = "tableDimSet dimSet";
    input.id = "tableTopPos" + i;
    input.step = "1";
    input.min = "1";
    input.value = tableGeometryDims[0][i] * 1000;
    inputDiv.appendChild(inputType);
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);
    inputTabletop.appendChild(inputDiv);
  }
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Width of legs";
        break;
      case 1:
        var label = "Height of legs";
        break;
      case 2:
        var label = "Length of legs";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    var inputType = document.createElement("small");
    inputType.innerHTML = label;
    inputType.style.position = "absolute";
    inputType.style.marginTop = "-24px";
    unit.innerHTML = "mm";
    input.type = "number";
    input.className = "tableDimSet dimSet";
    input.id = "tableLegsPos" + i;
    input.step = "1";
    input.min = "1";
    input.value = tableGeometryDims[1][i] * 1000;
    inputDiv.appendChild(inputType);
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);
    inputLegs.appendChild(inputDiv);
  }
  tableContainer.appendChild(inputLegs);
  tableContainer.appendChild(inputTabletop);

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

  var chairContainer = document.createElement("div");
  chairContainer.className = "furnitureInfoContainer";
  var chairInfo = document.createElement("div");
  area = Math.round(chairGeometryDims[0][0] * chairGeometryDims[0][2] * 100) / 100;
  wholematerial =
    2 * (chairGeometryDims[0][0] * chairGeometryDims[0][2] + chairGeometryDims[0][0] * chairGeometryDims[0][1] + chairGeometryDims[0][0] * chairGeometryDims[0][1]) +
    2 * (chairGeometryDims[1][0] * chairGeometryDims[1][2] + chairGeometryDims[1][0] * chairGeometryDims[1][1] + chairGeometryDims[1][0] * chairGeometryDims[1][1]) +
    4 * 2 * (chairGeometryDims[2][0] * chairGeometryDims[2][2] + chairGeometryDims[2][0] * chairGeometryDims[2][1] + chairGeometryDims[2][0] * chairGeometryDims[2][1]);
  wholematerial = Math.round(wholematerial * 100) / 100;
  chairInfo.innerHTML = "<span id='area'>Area of tabletop:" + area + "m²</span><br/><span id='wholematerial'>Whole material:" + wholematerial + "m³</span>";
  var inputChairBase = document.createElement("div");
  var inputChairBack = document.createElement("div");
  var inputLegs = document.createElement("div");
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Width of chair base";
        break;
      case 1:
        var label = "Height of chair base";
        break;
      case 2:
        var label = "Length of chair base";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    var inputType = document.createElement("small");
    inputType.innerHTML = label;
    inputType.style.position = "absolute";
    inputType.style.marginTop = "-24px";
    unit.innerHTML = "mm";
    input.type = "number";
    input.className = "chairDimSet dimSet";
    input.id = "chairBasePos" + i;
    input.step = "1";
    input.min = "1";
    input.value = chairGeometryDims[0][i] * 1000;
    inputDiv.appendChild(inputType);
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);
    inputChairBase.appendChild(inputDiv);
  }
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Width of chair back";
        break;
      case 1:
        var label = "Height of chair back";
        break;
      case 2:
        var label = "Length of chair back";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    var inputType = document.createElement("small");
    inputType.innerHTML = label;
    inputType.style.position = "absolute";
    inputType.style.marginTop = "-24px";
    unit.innerHTML = "mm";
    input.type = "number";
    input.className = "chairDimSet dimSet";
    input.id = "chairBackPos" + i;
    input.step = "1";
    input.min = "1";
    input.value = chairGeometryDims[1][i] * 1000;
    inputDiv.appendChild(inputType);
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);
    inputChairBack.appendChild(inputDiv);
  }
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        var label = "Width of legs";
        break;
      case 1:
        var label = "Height of legs";
        break;
      case 2:
        var label = "Length of legs";
        break;
    }
    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    var unit = document.createElement("span");
    var inputType = document.createElement("small");
    inputType.innerHTML = label;
    inputType.style.position = "absolute";
    inputType.style.marginTop = "-24px";
    unit.innerHTML = "mm";
    input.type = "number";
    input.className = "chairDimSet dimSet";
    input.id = "chairLegsPos" + i;
    input.step = "1";
    input.min = "1";
    input.value = chairGeometryDims[2][i] * 1000;
    inputDiv.appendChild(inputType);
    inputDiv.appendChild(input);
    inputDiv.appendChild(unit);
    inputLegs.appendChild(inputDiv);
  }
  chairContainer.appendChild(inputLegs);
  chairContainer.appendChild(inputChairBack);
  chairContainer.appendChild(inputChairBase);

  chairContainer.appendChild(chairInfo);
  document.body.appendChild(chairContainer);
  document.body.appendChild(changeBtn);
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
    createChair(scene, objects, chairGeometryDims);
  }
}

function updateDims() {
  if (currFurniture == "table") {
    for (var i = 0; i < 3; i++) {
      tableGeometryDims[0][i] = document.getElementById("tableTopPos" + i).value / 1000;
    }
    for (var i = 0; i < 3; i++) {
      tableGeometryDims[1][i] = document.getElementById("tableLegsPos" + i).value / 1000;
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
  if (currFurniture == "chair") {
    for (var i = 0; i < 3; i++) {
      chairGeometryDims[0][i] = document.getElementById("chairBasePos" + i).value / 1000;
    }
    for (var i = 0; i < 3; i++) {
      chairGeometryDims[1][i] = document.getElementById("chairBackPos" + i).value / 1000;
    }
    for (var i = 0; i < 3; i++) {
      chairGeometryDims[2][i] = document.getElementById("chairLegsPos" + i).value / 1000;
    }
    area = Math.round(chairGeometryDims[0][0] * chairGeometryDims[0][2] * 100) / 100;
    wholematerial =
      2 * (chairGeometryDims[0][0] * chairGeometryDims[0][2] + chairGeometryDims[0][0] * chairGeometryDims[0][1] + chairGeometryDims[0][0] * chairGeometryDims[0][1]) +
      2 * (chairGeometryDims[1][0] * chairGeometryDims[1][2] + chairGeometryDims[1][0] * chairGeometryDims[1][1] + chairGeometryDims[1][0] * chairGeometryDims[1][1]) +
      4 * 2 * (chairGeometryDims[2][0] * chairGeometryDims[2][2] + chairGeometryDims[2][0] * chairGeometryDims[2][1] + chairGeometryDims[2][0] * chairGeometryDims[2][1]);
    wholematerial = Math.round(wholematerial * 100) / 100;
    document.getElementById("area").innerHTML = "Area of chairbase:" + area + "m²";
    document.getElementById("wholematerial").innerHTML = "Whole material:" + wholematerial + "m³";
    createChair(scene, objects, chairGeometryDims);
  }
}

window.onload = function () {
  updateMesh();
  document.getElementById("furnitureSelect").addEventListener("change", updateMesh);

  animate();
};
