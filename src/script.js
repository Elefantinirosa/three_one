import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
//import typefacefont from 'three/examples/fonts/helvetiker_regular.typeface'
import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'

// console.log(typefacefont)
console.log(FontLoader)
console.log(TextGeometry)
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


//fonts
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
      const textGeometry =new TextGeometry(
    'Elena',
    {
        font:font,
        size:0.5,
        depth:0.2,
        curvesegment:12,
        bevelEnabled:true,
        bevelThickness:0.03,
        bevelSize:0.02,
        bevelOffset:0,
        bevelSegments:5
    })
// textGeometry.computeBoundingBox()
// console.log(textGeometry.boundingBox)

// textGeometry.translate(
//     - textGeometry.boundingBox.max.x*0.5,
//     - textGeometry.boundingBox.max.y*0.5,
//     - textGeometry.boundingBox.max.z*0.5
// )
    textGeometry.center()

    const textMaterial = new THREE.MeshBasicMaterial({wireframe:true})
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
    }
)


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

//scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()