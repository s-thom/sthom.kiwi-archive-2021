import { css, html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement } from 'lit/decorators.js';
import {
  AmbientLight,
  BoxBufferGeometry,
  Color,
  IcosahedronBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  PointLight,
  Renderer,
  Scene,
  WebGLRenderer,
} from 'three';

interface Thing {
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
  `;

  private scene: Scene;

  private renderer: Renderer;

  private things: Thing[] = [];

  constructor() {
    super();

    const scene = new Scene();
    this.scene = scene;
    scene.background = new Color(0xe4e4e4);
    const camera = new OrthographicCamera();
    camera.zoom = 40;
    camera.position.z = 10;

    this.renderer = new WebGLRenderer();
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

    const boxGeometry = new BoxBufferGeometry(1, 1, 1);
    const icoGeometry = new IcosahedronBufferGeometry(1, 0);
    const normalMaterial = new MeshStandardMaterial({ color: 0xe4e4e4 });
    const blueMaterial = new MeshStandardMaterial({ color: 0x4273bd });
    const cube = new Mesh(boxGeometry, normalMaterial);
    this.addThing(cube, 0.01);

    const blueOrb = new Mesh(icoGeometry, blueMaterial);
    blueOrb.position.x = 3.5;
    blueOrb.position.y = 5.5;
    blueOrb.scale.multiplyScalar(1.5);
    this.addThing(blueOrb, -0.002);

    const ambientLight = new AmbientLight();
    const pointLight = new PointLight();
    pointLight.position.x = 10;
    pointLight.position.y = 10;
    pointLight.position.z = 10;
    scene.add(ambientLight);
    scene.add(pointLight);

    const animationLoop = () => {
      requestAnimationFrame(animationLoop);

      this.doAnimation();

      this.renderer.render(scene, camera);
    };
    animationLoop();
  }

  firstUpdated() {
    const container = this.shadowRoot!.getElementById('container')!;
    container.appendChild(this.renderer!.domElement);
  }

  addThing(mesh: Mesh, rotationRate: number) {
    this.scene.add(mesh);
    this.things.push({ mesh, rotationRate });
  }

  doAnimation() {
    for (const thing of this.things) {
      thing.mesh.rotation.y += thing.rotationRate;
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`<div id="container" />`;
  }
}
