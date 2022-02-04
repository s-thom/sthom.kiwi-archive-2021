import { html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement, property } from 'lit/decorators.js';

@customElement('sthom-ga')
export class Analytics extends LitElement {
  @property()
  propertyId: string = '';

  private dataLayer: any[] = (window as any).dataLayer || [];

  constructor() {
    super();

    (window as any).dataLayer = this.dataLayer;

    this.gtag('js', new Date());
  }

  private gtag(...args: any[]) {
    this.dataLayer.push(args);
  }

  firstUpdated() {
    if (this.propertyId) {
      this.gtag('config', this.propertyId);
    }
  }

  render() {
    return html`<script async src="https://www.googletagmanager.com/gtag/js?id=${this.propertyId}"></script>`;
  }
}
