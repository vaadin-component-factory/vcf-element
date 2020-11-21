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
    const code = codeContainer.querySelector('#code');
    const copyButton = codeContainer.querySelector('#copyButton');
    if (window.innerWidth > 768) {
      const codeContainerStyles = document.createElement('style');
      const copyVaadinButton = document.createElement('vaadin-button');
      const copyIcon = document.createElement('iron-icon');
      // Custom <demo-snippet> styles
      element.shadowRoot.appendChild(codeContainerStyles);
      codeContainerStyles.innerHTML = mainCodeContainerStyles.innerHTML;
      // Custom <demo-snippet> Copy <vaadin-button>
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
      codeContainer.appendChild(copyVaadinButton);
    } else {
      code.innerHTML = 'View demo code on a larger screen';
      copyButton.style.display = 'none';
    }
  });
});
