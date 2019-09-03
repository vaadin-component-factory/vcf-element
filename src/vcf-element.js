import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ElementMixin } from '@vaadin/vaadin-element-mixin';

class --elementclassname-- extends ElementMixin(ThemableMixin(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }

  static get is() {
    return '--elementname--';
  }

  static get properties() {
    return {};
  }
}

customElements.define(--elementclassname--.is, --elementclassname--);

/**
 * @namespace Vaadin
 */
window.Vaadin.--elementclassname-- = --elementclassname--;

if (window.Vaadin.runIfDevelopmentMode) {
  window.Vaadin.runIfDevelopmentMode('vaadin-license-checker', --elementclassname--);
}
