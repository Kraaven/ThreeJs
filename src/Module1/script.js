import * as THREE from 'three';

//Settings
 const Settings = {
    height : 1200 ,
    width : 1600,
    FOV : 75
 }

// Setup
const Scene  = new THREE.Scene();
const RenderCam = new THREE.PerspectiveCamera(Settings.FOV, Settings.width/Settings.height);
const Renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
Renderer.setSize(Settings.width, Settings.height);
RenderCam.position.z += 3;
RenderCam.position.x += 3;
Scene.add(RenderCam);

// Create Something

const Geo = new THREE.BoxGeometry(1,1,1);
const Mat = new THREE.MeshBasicMaterial({color : 0xff0000});
const Mesh = new THREE.Mesh(Geo,Mat);
Scene.add(Mesh)

//Render
Renderer.render(Scene, RenderCam);



