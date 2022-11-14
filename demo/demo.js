import '@vaadin/vaadin-lumo-styles';
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

  fetch(customElements)
    .then(res => res.json())
    .then(manifest => {
      [apiDocs, ...apiDemos].forEach(elem => (elem.manifest = manifest));
      show();
    });
});
