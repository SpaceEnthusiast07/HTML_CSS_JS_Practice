// Import everything from Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Create a list to store the active state of keys
const keys = {}

// Direction used to obtain camera's 'forward' direction
const cameraForwardDirection = new THREE.Vector3();
// Direction used for camera's 'right' direction
const cameraRightDirection = new THREE.Vector3();

// Create a scene object - HTML <canvas> element
const scene = new THREE.Scene();
// Create a camera with:
//   fov = 75 degrees
//   aspect ratio = width / height
//   near plane dist = 0.1m
//   far plane dist = 100m
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Create a renderer object - HTML <canvas> element
const renderer = new THREE.WebGLRenderer();
// Set the size of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );
// Add the renderer to the body of the webpage
document.body.appendChild( renderer.domElement );

// Cube geometry, containing all the vertex and face data
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// Create a material to shade our cube
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// Combine these two into a mesh
const cube = new THREE.Mesh( geometry, material );
// Add the cube to the scene
scene.add( cube );

// Set up some lines
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( 0, 0, 100 ) );
points.push( new THREE.Vector3( 0, 0, -100 ) );
points.push( new THREE.Vector3( 100, 0, 0 ) );
points.push( new THREE.Vector3( -100, 0, 0 ) );
points.push( new THREE.Vector3( 0, 100, 0 ) );
points.push( new THREE.Vector3( 0, -100, 0 ) );
const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, lineMaterial );
//scene.add(line)

// Move the camera 5m away from the world centre (cube)
camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 8;

// Add event listener for 'keydown'
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    console.log(e.key + " pressed down")
})
// Add event listener for 'keyup'
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    console.log(e.key + " released")
})

// Loop to render the scene every frame, usually 60 fps
function animate() {
    // Add focus to the window
    window.focus();
    // Store the speed to move and rotate the camera
    const movementSpeed = 0.1;
    const rotationSpeed = 0.03;

    // Obtain the camera's forward direction
    camera.getWorldDirection(cameraForwardDirection);
    // Rotate to get camera's right direction
    cameraRightDirection.crossVectors(cameraForwardDirection, camera.up).normalize();

    // Move the camera forward if 'w' is pressed
    if (keys['w']) {
        camera.position.addScaledVector(cameraForwardDirection, movementSpeed);
    }
    // Move the camera backward if 's' is pressed
    if (keys['s']) {
        camera.position.addScaledVector(cameraForwardDirection, -movementSpeed);
    }
    // Move the camera right if 'd' is pressed
    if (keys['d']) {
        camera.position.addScaledVector(cameraRightDirection, movementSpeed);
    }
    // Move the camera left if 'a' is pressed
    if (keys['a']) {
        camera.position.addScaledVector(cameraRightDirection, -movementSpeed);
    }
    // Rotate the camera
    if (keys['arrowleft']) {
        camera.rotation.y += rotationSpeed;
    }
    if (keys['arrowright']) {
        camera.rotation.y -= rotationSpeed;
    }

    // Rotate the camera to look up or down
    if (keys['arrowup']) {
        camera.rotation.x += rotationSpeed;
    }
    if (keys['arrowdown']) {
        camera.rotation.x -= rotationSpeed;
    }

    camera.rotation.x = THREE.MathUtils.clamp(
        camera.rotation.x,
        -Math.PI / 2 + 0.01,
        Math.PI / 2 - 0.01
    );

    // Rotate the cube every frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // Render the entire scene
    renderer.render( scene, camera );
}
// Set this function as the animation/render loop
renderer.setAnimationLoop(animate);