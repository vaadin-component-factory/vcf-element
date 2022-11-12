import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import '@vaadin/vaadin-lumo-styles';

/**
 * `<vcf-element>` --elementdescription--
 *
 * @attr element-attr - Attribute description.
 *
 * @slot element-slot - Slot description.
 *
 * @csspart element-part - Element part description.
 *
 * @cssprop [--vcf-element-text-color=#000] - CSS custom property description.
 *
 * @event custom-event - Custom event description.
 */
@customElement('vcf-element')
export class VcfElement extends ThemableMixin(LitElement) {
  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  protected static get is() {
    return 'vcf-element';
  }

  protected static get version() {
    return '1.0.0';
  }

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
      <slot name="element-slot"></slot>
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
