import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { CounterChangedEvent, CustomEventMixin, CustomEvents } from './mixins/CustomEventMixin.js';

/**
 * `<vcf-element>` --elementdescription--
 *
 * @slot element-slot - Slot description.
 *
 * @csspart element-part - Element part description.
 *
 * @cssprop [--vcf-element-text-color=#000] - CSS custom property description.
 *
 * @event {CounterChangedEvent} counter-changed - Fired when the counter is changed.
 */
@customElement('vcf-element')
export class VcfElement extends CustomEventMixin(LitElement) {
  @property({ type: String }) title = 'Hey there';

  @property({ type: Number, attribute: 'element-attr' }) counter = 0;

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
      <h2 part="element-part">${this.title} #${this.counter}!</h2>
      <h4><slot name="element-slot"></slot></button></h4>
      <button @click=${this.increment}>increment</button>
    `;
  }

  /**
   * Increments the `counter` property.
   * @see {@link counter}
   */
  increment() {
    this.counter += 1;
    this.dispatchEvent(this.counterChangedEvent);
  }

  private get counterChangedEvent() {
    const event = new CustomEvent(CustomEvents.counterChanged, { detail: { counter: this.counter } });
    return event as CounterChangedEvent;
  }
}

export { CounterChangedEvent };

declare global {
  interface HTMLElementTagNameMap {
    'vcf-element': VcfElement;
  }
}
