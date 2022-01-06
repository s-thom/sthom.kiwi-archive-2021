import { css, html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement, property } from 'lit/decorators.js';
import {} from 'three';

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
      background-color: red !important;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = 'World';

  // Render the UI as a function of component state
  render() {
    return html`<div />`;
  }
}
