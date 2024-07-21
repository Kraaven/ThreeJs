import * as THREE from 'three';

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
Renderer.setSize(Settings.width, Settings.height);
RenderCam.position.z += 8;
Scene.add(RenderCam);

const Clock = new THREE.Clock();


// Create Something

const Geo = new THREE.BoxGeometry(1,1,1);
const Mat = new THREE.MeshBasicMaterial({color : "hsl(0, 100%, 50%)"});
const Mesh = new THREE.Mesh(Geo,Mat);
Scene.add(Mesh)



//Update Loop
const Tick = () =>{

   const delta = Clock.getDelta();

   Mesh.rotateY(4 * delta);
   Mat.color.offsetHSL(delta/2,0,0);

   Mesh.position.y = Math.sin(Clock.elapsedTime) * 4;

   


   Renderer.render(Scene, RenderCam);
   window.requestAnimationFrame(Tick);
}
Tick();



