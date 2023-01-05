import { html, render } from 'lit';
import '@vaadin/vaadin-lumo-styles';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin-component-factory/vcf-anchor-nav';
import '@api-viewer/docs';
import '@api-viewer/demo';
import '../out-tsc/vcf-element.js';

const show = () => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.hidden').forEach(element => element.classList.remove('hidden'));
    document.querySelector('vcf-anchor-nav')._scrollToHash();
  });
};

window.addEventListener('WebComponentsReady', () => {
  const customElements = './custom-elements.json';
  const apiDemos = document.querySelectorAll('api-demo');
  const apiDocs = document.querySelector('api-docs');
  const toggleSource = demo => {
    return e => {
      const icon = e.currentTarget.querySelector('vaadin-icon');
      demo.toggleAttribute('collapsed');
      if (demo.hasAttribute('collapsed')) icon.setAttribute('icon', 'lumo:angle-left');
      else icon.setAttribute('icon', 'lumo:angle-down');
    };
  };

  fetch(customElements)
    .then(res => res.json())
    .then(manifest => {
      [apiDocs, ...apiDemos].forEach(elem => (elem.manifest = manifest));
      requestAnimationFrame(() => {
        // Add custom docs style
        const tabs = apiDocs.shadowRoot.querySelector('api-viewer-tabs');
        const tabsContainer = tabs.shadowRoot.querySelector('.tabs');
        tabsContainer.style.background = 'var(--lumo-shade-5pct)';
        // Add collapse button
        apiDemos.forEach(demo => {
          const output = demo.shadowRoot.querySelector('[part="demo-output"]');
          const icon = demo.hasAttribute('collapsed') ? 'lumo:angle-left' : 'lumo:angle-down';
          if (output) {
            render(
              html`
                <vaadin-button
                  theme="icon tertiary"
                  part="collapse-btn"
                  @click="${toggleSource(demo)}"
                  title="Toggle source code"
                >
                  <vaadin-icon icon="${icon}"></vaadin-icon>
                </vaadin-button>
              `,
              output
            );
          }
        });
      });
      show();
    });
});
