import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
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
RenderCam.position.z += 8;
Scene.add(RenderCam);

const Clock = new THREE.Clock();


// Create Something

// const Geo = new THREE.BoxGeometry(1,1,1);
// const Mat = new THREE.MeshBasicMaterial({color : "hsl(0, 100%, 50%)"});
// const Mesh = new THREE.Mesh(Geo,Mat);
// Scene.add(Mesh)

const Plane = new THREE.PlaneGeometry(1,1,50,50);
const PMat = new THREE.MeshBasicMaterial({color : 0xffffff ,side: THREE.DoubleSide, wireframe: true});
const PMesh = new THREE.Mesh(Plane,PMat);
PMesh.scale.x = 10;
PMesh.scale.z = 10;
PMesh.scale.y = 10;
const PlaneVerts = Plane.attributes.position;
Scene.add(PMesh)
Plane.rotateX(THREE.MathUtils.degToRad(90));

const TextFontLoader = new FontLoader();  

TextFontLoader.load( 'helvetiker_regular.typeface.json', function ( font ) {

	const TextGeo = new TextGeometry( 'H i   I s h a a n', {
		font: font,
		size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

   const TextMat = new THREE.MeshBasicMaterial({color: "cyan"});
   const TextMesh = new THREE.Mesh(TextGeo,TextMat);
   
   TextMesh.scale.x = 0.01;
   TextMesh.scale.y = 0.01;
   TextMesh.scale.z = 0.01;
   TextMesh.position.x -= 3;
   TextMesh.position.y += 3;

   Scene.add(TextMesh);
} );




//Update Loop
const Tick = () =>{

   const delta = Clock.getDelta();
  
   for (let i = 0; i < PlaneVerts.count; i++) {
      const x = PlaneVerts.getX(i);
      const elapsedTime = Clock.elapsedTime;
      const newZ = Math.sin((x * 25)/2 + (elapsedTime * 10)) / 10;
      PlaneVerts.setY(i, newZ);
  }
  PlaneVerts.needsUpdate = true;

   Renderer.render(Scene, RenderCam);
   window.requestAnimationFrame(Tick);
}
Tick();



