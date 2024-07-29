//Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { degToRad } from 'three/src/math/MathUtils.js';

//Settings
 const Settings = {
    height : window.innerHeight ,
    width : window.innerWidth,
    FOV : 75
 }

// Setup
    // Creating Scene, Cams, Renderer
const Scene  = new THREE.Scene();
const RenderCam = new THREE.PerspectiveCamera(Settings.FOV, Settings.width/Settings.height);
const Renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
    //Creating Controls
    const controls = new OrbitControls( RenderCam, document.querySelector('.webgl'));
    controls.update();
    //Renderer can cast shadows?
    Renderer.castShadow = true;
    Renderer.shadowMap.enabled = true;
    //Renderer and Camera Settings
    Renderer.setSize(Settings.width, Settings.height);
    RenderCam.position.x += 0;
    RenderCam.position.y += 0;
    RenderCam.position.z += 10;
Scene.add(RenderCam);


/* -------------------------------------------------------------- */
//Loaders and Global data
    //Global Data
const Clock = new THREE.Clock();
const ModelLoader = new GLTFLoader();
const ImageLoader = new THREE.TextureLoader();

    //Script to load a Model => await loadModel()
const loadModel = (url) => {
   return new Promise((resolve) => {
       ModelLoader.load(
           url,
           (gltf) => {
            
               resolve(gltf.scene);
           },
           (xhr) => {
               console.log((xhr.loaded / xhr.total * 100) + '% loaded');
           },
           (error) => {
               console.error('An error happened', error);
               const geometry = new THREE.BoxGeometry(1, 1, 1);
               const material = new THREE.MeshBasicMaterial({ color: 0xbf17a3 });
               const box = new THREE.Mesh(geometry, material);
               resolve(box);
           }
       );
   });
};
    //Script to load a texture => await loadTexture()
const loadTexture = (url) => {
   return new Promise((resolve) => {
       ImageLoader.load(
           url,
           (texture) => {
               resolve(texture);
           },
           (xhr) => {
               console.log((xhr.loaded / xhr.total * 100) + '% loaded');
           },
           (error) => {
               console.error('An error happened', error);
               const defaultTexture = new THREE.Texture();
               resolve(defaultTexture);
           }
       );
   });
};


/* -------------------------------------------------------------- */
// Helper Functions

    //Function to get a Random Integer
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* -------------------------------------------------------------- */
//Script or Custom Functions



/* -------------------------------------------------------------- */
//Object Creation

const video = document.createElement('video');
video.src = 'ThisIsEEVEEPOINT.mp4';
video.loop = true;
video.muted = true;
video.play();

const videoTexture = new THREE.VideoTexture(video);

// Create a material using the video texture
const material = new THREE.MeshBasicMaterial({ map: videoTexture });

// Create a plane geometry to display the video
const geometry = new THREE.PlaneGeometry(16, 9); // Adjust size as needed
const mesh = new THREE.Mesh(geometry, material);
Scene.add(mesh);


/* -------------------------------------------------------------- */
//Update Loop
const Tick = () => {
    //Delta Value per frame
    const delta = Clock.getDelta();

    //Custom Update events


    //Engine Update Events
    Renderer.render(Scene, RenderCam);
    window.requestAnimationFrame(Tick);
}

Tick();

/* -------------------------------------------------------------- */
