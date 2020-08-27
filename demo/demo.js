import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/iron-icon';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-lumo-styles/typography';
import '@vaadin-component-factory/vcf-anchor-nav';
import '../src/vcf-element';
import './demo-icons';

window.addEventListener('WebComponentsReady', () => {
  const mainCodeContainerStyles = document.querySelector('#codeContainerStyles');
  document.querySelectorAll('.hidden').forEach(element => element.classList.remove('hidden'));
  document.querySelectorAll('demo-snippet').forEach(element => {
    const codeContainer = element.shadowRoot.querySelector('.code-container');
    const codeContainerStyles = document.createElement('style');
    const copyButton = codeContainer.querySelector('#copyButton');
    const copyVaadinButton = document.createElement('vaadin-button');
    const copyIcon = document.createElement('iron-icon');
    // Code Container max height
    codeContainer.style.maxHeight = '400px';
    codeContainer.appendChild(copyVaadinButton);
    // Copy <vaadin-button>
    copyVaadinButton.id = 'copyVaadinButton';
    copyVaadinButton.setAttribute('theme', 'icon');
    copyVaadinButton.setAttribute('title', 'Copy to clipboard');
    copyVaadinButton.appendChild(copyIcon);
    copyVaadinButton.addEventListener('click', () => {
      document
        .querySelectorAll('demo-snippet')
        .forEach(element => element.shadowRoot.querySelector('iron-icon').setAttribute('icon', 'vcf-demo:copy'));
      copyButton.click();
      copyIcon.setAttribute('icon', 'lumo:checkmark');
    });
    copyIcon.setAttribute('icon', 'vcf-demo:copy');
    element.shadowRoot.appendChild(codeContainerStyles);
    codeContainerStyles.innerHTML = mainCodeContainerStyles.innerHTML;
    if (codeContainer.scrollHeight !== codeContainer.clientHeight) {
      codeContainer.classList.add('overflow');
      codeContainer.classList.add('top');
    }
    // Sticky Copy Button
    codeContainer.addEventListener(
      'scroll',
      e => {
        const el = e.target;
        copyVaadinButton.style.top = el.scrollTop + 'px';
        // Scroll shadow effect
        if (el.scrollTop === 0) codeContainer.classList.add('top');
        else codeContainer.classList.remove('top');
        if (el.scrollTop === el.scrollHeight - el.clientHeight) codeContainer.classList.add('bottom');
        else codeContainer.classList.remove('bottom');
      },
      { apture: true, passive: true }
    );
  });
});
