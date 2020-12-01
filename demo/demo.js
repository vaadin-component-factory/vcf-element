import '@vaadin/vaadin-lumo-styles';
import '@vaadin-component-factory/vcf-anchor-nav';
import 'api-viewer-element/lib/api-docs.js';
import 'api-viewer-element/lib/api-demo.js';
import '../dist/vcf-element.js';

const show = () => document.querySelectorAll('.hidden').forEach(element => element.classList.remove('hidden'));

window.addEventListener('WebComponentsReady', () => {
  const anchorNav = document.querySelector('vcf-anchor-nav');
  const apiDemos = document.querySelectorAll('api-demo');
  const apiDocs = document.querySelector('api-docs');
  fetch('./custom-elements.json')
    .then(res => res.json())
    .then(data => [apiDocs, ...apiDemos].forEach(elem => (elem.elements = data.tags)));
  // Observe <api-viewer> shadowRoot until <api-viewer-tabs> is added
  apiDemos.forEach(apiDemo => {
    new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const apiViewerTabs = Array.from(mutation.addedNodes).filter(i => {
            return i.nodeType === 1 && i.tagName.toLowerCase() === 'api-viewer-tabs';
          })[0];
          if (apiViewerTabs) {
            const demoSnippet = apiViewerTabs.querySelector('api-viewer-demo-snippet');
            if (demoSnippet) {
              // Observe <api-viewer-demo-snippet> shadowRoot until <pre> is added
              new MutationObserver((mutationsList, observer) => {
                for (const mutation of mutationsList) {
                  if (mutation.type === 'childList') {
                    const pre = demoSnippet.shadowRoot.querySelector('pre');
                    if (pre) pre.style.fontFamily = "'Fira Code', monospace";
                    anchorNav._scrollToHash();
                    observer.disconnect();
                    show();
                    return;
                  }
                }
              }).observe(demoSnippet.shadowRoot, { childList: true });
              observer.disconnect();
              break;
            }
          }
        }
      }
    }).observe(apiDemo.shadowRoot, { childList: true, subtree: true });
  });
});
