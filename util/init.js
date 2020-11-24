/* THIS SCRIPT IS RUN AUTOMATICALLY AFTER NPM INSTALL. */
const { initialize } = require('@vaadin-component-factory/vcf-element-util');

initialize(
  __dirname,
  [
    'index.html',
    'README.md',
    'package.json',
    'vcf-element.ts',
    'demo/demo.js',
    'demo/index.html',
    'src/vcf-element.ts',
    'test/vcf-element.test.ts',
    'util/publish.js'
  ],
  ['vcf-element.ts', 'src/vcf-element.ts', 'test/vcf-element.test.ts']
);
