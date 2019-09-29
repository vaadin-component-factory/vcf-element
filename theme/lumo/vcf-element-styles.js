const theme = document.createElement('dom-module');
theme.id = 'vcf-element-lumo';
theme.setAttribute('theme-for', 'vcf-element');
theme.innerHTML = `
    <template>
      <style>
        :host {}
      </style>
    </template>
  `;
theme.register(theme.id);
