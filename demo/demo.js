import '@vaadin/vaadin-lumo-styles';
import '@vaadin-component-factory/vcf-anchor-nav';
import '@api-viewer/docs';
import '@api-viewer/demo';
import '../out-tsc/vcf-element.js';

const show = () => document.querySelectorAll('.hidden').forEach(element => element.classList.remove('hidden'));

window.addEventListener('WebComponentsReady', () => {
  const customElements = './custom-elements.json';
  const anchorNav = document.querySelector('vcf-anchor-nav');
  const apiDemos = document.querySelectorAll('api-demo');
  const apiDocs = document.querySelector('api-docs');

  fetch(customElements)
    .then(res => res.json())
    .then(() => {
      [apiDocs, ...apiDemos].forEach(elem => elem.setAttribute('src', customElements));
      anchorNav._scrollToHash();
      show();
    });
});
