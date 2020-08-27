/* eslint-disable max-len */
import { html } from '@polymer/polymer/polymer-element.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@polymer/iron-iconset-svg';

registerStyles(
  'vaadin-button',
  css`
    [part] ::slotted(iron-icon[icon^='vcf-demo:']) {
      padding: 0.25em;
      box-sizing: border-box !important;
    }
  `
);

const template = html`
  <iron-iconset-svg name="vcf-demo" size="16">
    <svg>
      <defs>
        <g id="copy">
          <svg viewBox="0 0 448 512">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
            />
          </svg>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>
`;

document.head.appendChild(template.content);
