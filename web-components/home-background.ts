import { css, html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement, property } from 'lit/decorators.js';
import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
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
    scene.background = new Color(' #e4e4e4 ');
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

    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new Mesh(geometry, material);
    this.addThing(cube, 0.01);

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
      thing.mesh.rotation.x += thing.rotationRate;
      thing.mesh.rotation.y += thing.rotationRate;
    }
  }

  // Declare reactive properties
  @property()
  name?: string = 'World';

  // Render the UI as a function of component state
  render() {
    return html`<div id="container" />`;
  }
}
