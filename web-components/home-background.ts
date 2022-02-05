/* eslint-disable max-classes-per-file */
import { scale, Scale } from 'chroma-js';
import { css, html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement } from 'lit/decorators.js';
import {
  AmbientLight,
  BufferGeometry,
  Clock,
  Color,
  DodecahedronBufferGeometry,
  IcosahedronBufferGeometry,
  Intersection,
  LinearToneMapping,
  Mesh,
  MeshStandardMaterial,
  OctahedronBufferGeometry,
  OrthographicCamera,
  PointLight,
  Raycaster,
  Scene,
  sRGBEncoding,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
// eslint-disable-next-line import/extensions
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// eslint-disable-next-line import/extensions
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Colour constants
 */
const COLORS = {
  DEFAULT: 0xe4e4e4,
  RED: 0xd76565,
  ORANGE: 0xd79a65,
  YELLOW: 0xf1f578,
  GREEN: 0x8acc6c,
  BLUE: 0x6598d7,
  VIOLET: 0xb965d7,
};
/**
 * Levels for transitioning between colour states
 */
const COLOR_LEVELS = {
  DEFAULT: 0,
  HOVER: 0.1,
  ACTIVE: 0.2,
  ACTIVE_HOVER: 0.5,
};
/**
 * Speed at which to transition between colours.
 * I don't know what the units are. It's a number that changes things.
 */
const COLOR_LEVEL_RATE = 3;
/**
 * Threshold for which a colour is "close enough" to be the final colour
 */
const COLOR_LEVEL_EPSILON = 0.005;

interface SceneState {
  intersections: Intersection[];
  isActive: boolean;
}

interface Time {
  total: number;
  delta: number;
}

interface ShapeOptions {
  geometry: BufferGeometry;
  position: [number, number, number];
  rotationRate: number;
  initialRotation: number;
  scale: number;
  color: { default: number; active: number };
}

class Shape {
  private readonly options: ShapeOptions;

  private isIntersected = false;

  readonly mesh: Mesh<BufferGeometry, MeshStandardMaterial>;

  private readonly colorScale: Scale;

  private currentColorLevel = COLOR_LEVELS.DEFAULT;

  constructor(options: ShapeOptions) {
    this.options = options;
    this.colorScale = scale([options.color.default, options.color.active] as unknown as string[]);

    this.mesh = new Mesh(options.geometry, new MeshStandardMaterial({ color: this.getColor(this.currentColorLevel) }));

    this.mesh.scale.multiplyScalar(options.scale);
    this.mesh.position.set(...options.position);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.rotation.z = options.initialRotation;
  }

  private getColor(level: number): Color {
    return new Color(this.colorScale(level).hex()).convertSRGBToLinear();
  }

  update(time: Time, state: SceneState) {
    this.isIntersected = !!state.intersections.find((intersection) => intersection.object === this.mesh);

    const rotation = this.isIntersected
      ? // When hovered, 1 or -1 based on sign
        this.options.rotationRate / Math.abs(this.options.rotationRate)
      : // Otherwise just use the defined rotation
        this.options.rotationRate;

    this.mesh.rotation.z += rotation * time.delta;

    if (this.shouldUpdateColor(state)) {
      this.updateColor(time, state);
    }
  }

  private shouldUpdateColor(state: SceneState) {
    // If scene is active and object is hovered and not at full colour
    if (state.isActive && this.isIntersected && this.currentColorLevel !== COLOR_LEVELS.ACTIVE_HOVER) {
      return true;
    }
    // If scene is active and not at full colour
    if (state.isActive && this.currentColorLevel !== COLOR_LEVELS.ACTIVE) {
      return true;
    }
    // If scene is not active and not at no colour
    if (!this.isIntersected && this.currentColorLevel !== COLOR_LEVELS.DEFAULT) {
      return true;
    }
    // If object is being hovered and at half colour
    if (this.isIntersected && this.currentColorLevel !== COLOR_LEVELS.HOVER) {
      return true;
    }

    return false;
  }

  private updateColor(time: Time, state: SceneState) {
    const currentLevel = this.currentColorLevel;
    let desiredLevel = COLOR_LEVELS.DEFAULT;
    if (state.isActive) {
      if (this.isIntersected) {
        desiredLevel = COLOR_LEVELS.ACTIVE_HOVER;
      } else {
        desiredLevel = COLOR_LEVELS.ACTIVE;
      }
    } else if (this.isIntersected) {
      desiredLevel = COLOR_LEVELS.HOVER;
    }

    const diff = desiredLevel - currentLevel;
    const change = COLOR_LEVEL_RATE * time.delta * diff;

    let newLevel = currentLevel + change;
    // Jump to the end if close enough
    if (Math.abs(desiredLevel - newLevel) < COLOR_LEVEL_EPSILON) {
      newLevel = desiredLevel;
    }

    this.currentColorLevel = newLevel;
    this.mesh.material.color = this.getColor(this.currentColorLevel);
  }
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

  private camera: OrthographicCamera;

  private renderer: WebGLRenderer;

  private shapes: Shape[] = [];

  private raycaster: Raycaster;

  private pointer: Vector2;

  private clock: Clock;

  private sceneState: SceneState = { intersections: [], isActive: false };

  private hasPointerLeft = false;

  constructor() {
    super();

    const scene = new Scene();

    this.scene = scene;
    scene.background = new Color(COLORS.DEFAULT);
    const camera = new OrthographicCamera();
    this.camera = camera;
    camera.zoom = 40;
    camera.position.z = 10;

    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
    this.loader.setDRACOLoader(dracoLoader);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.toneMapping = LinearToneMapping;
    this.renderer.outputEncoding = sRGBEncoding;

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

    // Setup for raycasting
    this.pointer = new Vector2();
    const onMouseMove = (event: MouseEvent) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerdown', () => {
      if (this.shapes.length === 0) {
        return;
      }

      // Quick hacky check whether the first shape is intersected.
      // I don't feel like implementing proper event handling. This file is hard to read as it is.
      const intersections = this.raycaster.intersectObjects(this.scene.children);
      if (intersections.find((intersection) => intersection.object === this.shapes[0].mesh)) {
        this.sceneState.isActive = !this.sceneState.isActive;
      }
    });

    this.raycaster = new Raycaster(new Vector3(), new Vector3(0, 0, 1), 0, 100);

    this.clock = new Clock(true);

    const ambientLight = new AmbientLight();
    ambientLight.intensity = 2.5;
    scene.add(ambientLight);
    const pointLight = new PointLight();
    pointLight.intensity = 12;
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    const pointLight2 = new PointLight();
    pointLight2.intensity = 5;
    pointLight2.position.set(-10, 10, 10);
    scene.add(pointLight2);

    const animationLoop = () => {
      requestAnimationFrame(animationLoop);

      this.doAnimation();

      this.renderer.render(scene, camera);
    };
    animationLoop();

    this.initializeScene().then(() => {
      const container = this.shadowRoot!.getElementById('container')!;
      container.classList.add('ready');

      container.addEventListener('mouseleave', () => {
        this.hasPointerLeft = true;
        this.sceneState.intersections = [];
      });
      container.addEventListener('mouseenter', () => {
        this.hasPointerLeft = false;
      });
    });
  }

  doAnimation() {
    // Make sure to get the delta first, otherwise it will always be 0
    const time: Time = { delta: this.clock.getDelta(), total: this.clock.getElapsedTime() };

    // Intersections
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (!this.hasPointerLeft) {
      this.sceneState.intersections = this.raycaster.intersectObjects(this.scene.children);
    }

    for (const update of this.shapes) {
      update.update(time, this.sceneState);
    }
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

    const shapeOptions: ShapeOptions[] = [
      {
        geometry: icoGeometry,
        position: [3.5, 5.5, 3],
        rotationRate: 0.2,
        initialRotation: 0,
        // rotationRate: 0,
        // initialRotation: (3 * Math.PI) / 8,
        scale: 1.5,
        color: { default: COLORS.BLUE, active: COLORS.BLUE },
      },
      {
        geometry: codeGeometry,
        position: [-5, -0.5, 0],
        rotationRate: -0.01,
        initialRotation: 1.56,
        scale: 10,
        color: { default: COLORS.DEFAULT, active: COLORS.RED },
      },
      {
        geometry: curlyGeometry,
        position: [1.5, -6, 0],
        rotationRate: 0.02,
        initialRotation: 0.6,
        scale: 2,
        color: { default: COLORS.DEFAULT, active: COLORS.ORANGE },
      },
      {
        geometry: curlyGeometry,
        position: [7, 8, 0],
        rotationRate: -0.02,
        initialRotation: 0.5,
        scale: 6,
        color: { default: COLORS.DEFAULT, active: COLORS.GREEN },
      },
      {
        geometry: fnCallGeometry,
        position: [-5, 10, 0],
        rotationRate: 0.02,
        initialRotation: -0.75,
        scale: 4,
        color: { default: COLORS.DEFAULT, active: COLORS.YELLOW },
      },
      {
        geometry: fnCallGeometry,
        position: [18, -10, 0],
        rotationRate: -0.02,
        initialRotation: 0.127,
        scale: 20,
        color: { default: COLORS.DEFAULT, active: COLORS.BLUE },
      },
      {
        geometry: icoGeometry,
        position: [-17, -12, 0],
        rotationRate: -0.04,
        initialRotation: 0,
        scale: 6,
        color: { default: COLORS.DEFAULT, active: COLORS.YELLOW },
      },
      {
        geometry: icoGeometry,
        position: [19, 12, 0],
        rotationRate: -0.03,
        initialRotation: 0,
        scale: 6,
        color: { default: COLORS.DEFAULT, active: COLORS.VIOLET },
      },
      {
        geometry: octaGeometry,
        position: [-21, 14, 0],
        rotationRate: -0.03,
        initialRotation: 0,
        scale: 9,
        color: { default: COLORS.DEFAULT, active: COLORS.RED },
      },
      {
        geometry: dodecaGeometry,
        position: [-2.5, 6, 0],
        rotationRate: -0.07,
        initialRotation: 0,
        scale: 1,
        color: { default: COLORS.DEFAULT, active: COLORS.ORANGE },
      },
      {
        geometry: dodecaGeometry,
        position: [-25, 0, 0],
        rotationRate: -0.04,
        initialRotation: 0,
        scale: 4,
        color: { default: COLORS.DEFAULT, active: COLORS.GREEN },
      },
      {
        geometry: dodecaGeometry,
        position: [27, 3, 0],
        rotationRate: -0.003,
        initialRotation: 0,
        scale: 5,
        color: { default: COLORS.DEFAULT, active: COLORS.YELLOW },
      },
      {
        geometry: dodecaGeometry,
        position: [0, -15, 0],
        rotationRate: -0.005,
        initialRotation: 0,
        scale: 3.5,
        color: { default: COLORS.DEFAULT, active: COLORS.VIOLET },
      },
    ];

    for (const options of shapeOptions) {
      const shape = new Shape(options);
      this.shapes.push(shape);
      this.scene.add(shape.mesh);
    }
  }

  firstUpdated() {
    const container = this.shadowRoot!.getElementById('container')!;
    container.appendChild(this.renderer!.domElement);
  }

  // Render the UI as a function of component state
  render() {
    return html`<div id="container" />`;
  }
}
