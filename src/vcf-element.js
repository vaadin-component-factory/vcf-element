import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';

/**
 * `<vcf-element>` [element-description]
 *
 * ```html
 * <vcf-element></vcf-element>
 * ```
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|-------------
 * `--vcf-element-property` | Example custom property | `unset`
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `part` | Example part
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `attribute` | Example styling attribute | :host
 *
 * @memberof Vaadin
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @demo demo/index.html
 */
class VcfElement extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <slot>vcf-element</slot>
    `;
  }

  static get is() {
    return 'vcf-element';
  }

  static get version() {
    return '1.0.0';
  }

  static get properties() {
    return {};
  }
}

customElements.define(VcfElement.is, VcfElement);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfElement = VcfElement;
