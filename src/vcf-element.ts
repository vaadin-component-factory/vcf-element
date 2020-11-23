import { html, css, property, customElement } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base';

/**
 * `<vcf-element>` --elementdescription--
 *
 * @attr element-attr - Attribute description.
 *
 * @slot element-slot - Slot description.
 *
 * @csspart element-part - Element part description.
 *
 * @event custom-event - Custom event description.
 */
@customElement('vcf-element')
export class VcfElement extends VaadinElement {
  static get is() {
    return 'vcf-element';
  }

  static get version() {
    return '1.0.0';
  }

  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--vcf-element-text-color, #000);
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title} #${this.counter}!</h2>
      <button @click=${this.increment}>increment</button>
    `;
  }

  private increment() {
    this.counter += 1;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vcf-element': VcfElement;
  }
}
