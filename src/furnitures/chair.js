import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createChair(scene, objects, geometryDims) {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
  const texture = new THREE.TextureLoader().load("https://i.imgur.com/xLJVKyJ.jpeg");

  var legPosX = geometryDims[0][0] / 2 - geometryDims[2][0] / 2;
  var legPosY = (geometryDims[2][1] / 2 + geometryDims[0][1] / 2) * -1;
  var legPosZ = geometryDims[0][2] / 2 - geometryDims[2][2] / 2;

  var chairBackPosX = geometryDims[0][0] / 2 - geometryDims[1][0] / 2;
  var chairBackPosY = geometryDims[1][1] / 2 + geometryDims[0][1] / 2;
  var chairBackPosZ = (geometryDims[0][2] / 2 - geometryDims[1][2] / 2) * -1;

  const geometryPos = [
    [0, 0, 0],
    [chairBackPosX, chairBackPosY, chairBackPosZ],
    [legPosX, legPosY, legPosZ],
    [legPosX * -1, legPosY, legPosZ],
    [legPosX * -1, legPosY, legPosZ * -1],
    [legPosX, legPosY, legPosZ * -1],
  ];
  for (let i = 0; i < geometryPos.length; i++) {
    console.log(geometryDims[0][0] + " " + geometryDims[0][1] + " " + geometryDims[0][2]);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    if (i == 0) {
      var geometry = new THREE.BoxGeometry(geometryDims[0][0], geometryDims[0][1], geometryDims[0][2]);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = geometryPos[0][0];
      mesh.position.y = geometryPos[0][1];
      mesh.position.z = geometryPos[0][2];
    }
    if (i == 1) {
      var geometry = new THREE.BoxGeometry(geometryDims[1][0], geometryDims[1][1], geometryDims[1][2]);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = geometryPos[1][0];
      mesh.position.y = geometryPos[1][1];
      mesh.position.z = geometryPos[1][2];
    }
    if (i >= 2) {
      var geometry = new THREE.BoxGeometry(geometryDims[2][0], geometryDims[2][1], geometryDims[2][2]);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = geometryPos[i][0];
      mesh.position.y = geometryPos[i][1];
      mesh.position.z = geometryPos[i][2];
    }

    scene.add(mesh);
    objects.push(mesh);
  }

  scene.add(mesh);
  objects.push(mesh);
}
