import { css, html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement } from 'lit/decorators.js';
import {
  AmbientLight,
  Color,
  DodecahedronBufferGeometry,
  IcosahedronBufferGeometry,
  LinearToneMapping,
  Mesh,
  MeshStandardMaterial,
  OctahedronBufferGeometry,
  OrthographicCamera,
  PointLight,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Item {
  rotationRate: number;
  mesh: Mesh;
}

@customElement('sthom-home-background')
export class HomeBackground extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      width: 100vw !important;
      height: 100vh !important;
      position: fixed !important;
      top: 0;
      left: 0;
      z-index: -1;
    }

    #container {
      opacity: 0;
      transition: opacity 0.5s ease-out;
    }

    #container.ready {
      opacity: 1;
    }
  `;

  private loader: GLTFLoader;

  private scene: Scene;

  private renderer: WebGLRenderer;

  private items: Item[] = [];

  constructor() {
    super();

    const scene = new Scene();

    this.scene = scene;
    scene.background = new Color(0xe4e4e4);
    const camera = new OrthographicCamera();
    camera.zoom = 40;
    camera.position.z = 10;

    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
    this.loader.setDRACOLoader(dracoLoader);

    this.renderer = new WebGLRenderer();
    this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMapping = LinearToneMapping;
    this.renderer.outputEncoding = sRGBEncoding;
    (this.renderer as any).gammaFactor = 2.2;

    // Resize handling
    const onWindowResize = () => {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.near = 0.01;
      camera.far = 100;

      camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    const ambientLight = new AmbientLight();
    ambientLight.intensity = 2.8;
    scene.add(ambientLight);
    const pointLight = new PointLight();
    pointLight.intensity = 20;
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const animationLoop = () => {
      requestAnimationFrame(animationLoop);

      this.doAnimation();

      this.renderer.render(scene, camera);
    };
    animationLoop();

    this.initializeScene().then(() => {
      const container = this.shadowRoot!.getElementById('container')!;
      container.classList.add('ready');
    });
  }

  async initializeScene(): Promise<void> {
    // Create/load geometries
    const octaGeometry = new OctahedronBufferGeometry(1, 0);
    const dodecaGeometry = new DodecahedronBufferGeometry(1, 0);
    const icoGeometry = new IcosahedronBufferGeometry(1, 0);
    const decodedModels = await Promise.all(
      ['/models/code.glb', '/models/curly.glb', '/models/fn-call.glb'].map((path) => this.loader.loadAsync(path)),
    );
    const [codeGeometry, curlyGeometry, fnCallGeometry] = decodedModels.map(
      (gltf: any) => gltf.scene.children[0].geometry,
    );

    // Create materials
    const normalMaterial = new MeshStandardMaterial({ color: 0xe4e4e4 });
    const blueMaterial = new MeshStandardMaterial({ color: 0x4273bd });
    blueMaterial.toneMapped = false;
    normalMaterial.color.convertSRGBToLinear();
    blueMaterial.color.convertSRGBToLinear();

    // Create meshes
    const octa = new Mesh(octaGeometry, normalMaterial);
    const dodeca = new Mesh(dodecaGeometry, normalMaterial);
    const ico = new Mesh(icoGeometry, normalMaterial);
    const code = new Mesh(codeGeometry, normalMaterial);
    const curly = new Mesh(curlyGeometry, normalMaterial);
    const fnCall = new Mesh(fnCallGeometry, normalMaterial);
    const blueOrb = new Mesh(icoGeometry, blueMaterial);

    const objectsToAdd: {
      mesh: Mesh;
      position: [number, number, number];
      rotationRate: number;
      scale: number;
      initialRotation: number;
    }[] = [
      { mesh: blueOrb, position: [3.5, 5.5, 3], rotationRate: 0.002, scale: 1.5, initialRotation: 0 },
      { mesh: dodeca, position: [-2.5, 6, 0], rotationRate: -0.0016, scale: 1, initialRotation: 0 },
      { mesh: curly, position: [1.5, -6, 0], rotationRate: 0.0006, scale: 2, initialRotation: 0.6 },
      { mesh: code, position: [-5, -0.5, 0], rotationRate: -0.00006, scale: 10, initialRotation: 1.56 },
      { mesh: curly, position: [7, 8, 0], rotationRate: -0.00058, scale: 6, initialRotation: 0.5 },
      { mesh: fnCall, position: [-5, 10, 0], rotationRate: 0.00058, scale: 4, initialRotation: -0.75 },
      { mesh: fnCall, position: [18, -10, 0], rotationRate: -0.000052, scale: 20, initialRotation: 0.127 },
      { mesh: ico, position: [-17, -12, 0], rotationRate: -0.00011, scale: 6, initialRotation: 0 },
      { mesh: ico, position: [19, 12, 0], rotationRate: -0.000073, scale: 6, initialRotation: 0 },
      { mesh: octa, position: [-21, 14, 0], rotationRate: -0.00006, scale: 9, initialRotation: 0 },
      { mesh: dodeca, position: [-25, 0, 0], rotationRate: -0.0002, scale: 4, initialRotation: 0 },
      { mesh: dodeca, position: [27, 3, 0], rotationRate: -0.00015, scale: 5, initialRotation: 0 },
      { mesh: dodeca, position: [0, -15, 0], rotationRate: -0.00025, scale: 3.5, initialRotation: 0 },
    ];

    const halfPi = Math.PI / 2;
    for (const object of objectsToAdd) {
      const mesh = object.mesh.clone();
      mesh.scale.multiplyScalar(object.scale);
      mesh.position.set(...object.position);
      mesh.rotation.x = halfPi;
      mesh.rotation.z = object.initialRotation;

      this.scene.add(mesh);
      this.items.push({ mesh, rotationRate: object.rotationRate });
    }
  }

  firstUpdated() {
    const container = this.shadowRoot!.getElementById('container')!;
    container.appendChild(this.renderer!.domElement);
  }

  doAnimation() {
    for (const thing of this.items) {
      thing.mesh.rotation.z += thing.rotationRate;
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`<div id="container" />`;
  }
}
