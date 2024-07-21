import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/examples/jsm/Addons.js';
import { degToRad } from 'three/src/math/MathUtils.js';

//Settings
 const Settings = {
    height : window.innerHeight ,
    width : window.innerWidth,
    FOV : 75
 }

// Setup
const Scene  = new THREE.Scene();
const RenderCam = new THREE.PerspectiveCamera(Settings.FOV, Settings.width/Settings.height);
const Renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
const controls = new OrbitControls( RenderCam, document.querySelector('.webgl'));
controls.update();
Renderer.setSize(Settings.width, Settings.height);
RenderCam.position.y += 8;
RenderCam.position.x +=3;
RenderCam.lookAt(0,0,0);
Scene.add(RenderCam);


//Loaders and Global data
const Clock = new THREE.Clock();
const ModelLoader = new GLTFLoader();
const ImageLoader = new THREE.TextureLoader();

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

// Helper Functions

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Objects
const SkyBox = await loadModel("Models/Skybox/Skybox.gltf");
SkyBox.scale.x = 100;
SkyBox.scale.y = 100;
SkyBox.scale.z = 100;
Scene.add(SkyBox);


const SUN = new THREE.DirectionalLight(0xffffff, 1); // White light with intensity 1
    SUN.position.set(10, 10, 10); // Position the light in the scene
    SUN.target.position.set(0, 0, 0); // Point the light towards the origin
    Scene.add(SUN);
    Scene.add(SUN.target); // Add the target to the scene

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
Scene.add(ambientLight);

const Tilemodel = await loadModel("Models/Tile.gltf");

Tilemodel.traverse((child) => {
   if (child.isMesh) {
       if (child.material) {
           child.material = new THREE.MeshStandardMaterial({
               map: child.material.map,
               normalMap: child.material.normalMap,
               metalness: 0.5,
               roughness: 0.5,
           });
       }
   }
});
const PostModel = await loadModel("Models/Post/LampPost.gltf")

PostModel.traverse((child) => {
   if (child.isMesh) {
       if (child.material) {
           child.material = new THREE.MeshStandardMaterial({
               map: child.material.map,
               normalMap: child.material.normalMap,
               metalness: 0.5,
               roughness: 0.5,
               side : THREE.DoubleSide 
           });
       }
   }
});
PostModel.scale.x = 0.35;
PostModel.scale.y = 0.35;
PostModel.scale.z = 0.35;
const gridSize = 5; // The grid will be gridSize x gridSize
const spacing = 2.05; // Distance between tiles

for (let I = -gridSize; I <= gridSize; I++) {
        for (let J = -gridSize; J <= gridSize; J++) {
            const T = Tilemodel.clone();
            T.position.x = I * spacing;
            T.position.z = J * spacing;
            T.rotation.y += degToRad(getRandomInt(0,3) * 90);
            if(getRandomInt(0,6) == 0){
               const P = PostModel.clone();
               P.position.x = I * spacing;
               P.position.z = J * spacing;
               P.position.y += 0.45;
               Scene.add(P);

               const PLight = new THREE.PointLight(0xffd60a, 1000, 6); // Color, intensity, and distance
                PLight.position.set(I * spacing, 6.5, J * spacing);
                Scene.add(PLight);
            }
            
            Scene.add(T);
        }
    }

// const light = new THREE.SpotLight();
// light.position.y = 4;
// light.intensity = 10;
// Scene.add(light);

// const light2 = new THREE.SpotLight();
// light2.position.y = 4;
// light2.position.x = 5;
// light2.intensity = 10;
// Scene.add(light2);
// const Texture = await loadTexture("Images/Tile/Tile_t.png");
// const TileMat = new THREE.MeshBasicMaterial({color : 0xff0000});
// const Tile = new THREE.Mesh(TileGeo,TileMat);   



//Update Loop
const Tick = () =>{

   const delta = Clock.getDelta();
  


   Renderer.render(Scene, RenderCam);
   window.requestAnimationFrame(Tick);
}
Tick();



