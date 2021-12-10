import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-copy';

const baseConfig = createSpaConfig({
  outputDir: 'build',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  html: {
    transform: html => {
      return html.replace(
        '../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
        'webcomponents-loader.js'
      );
    }
  }
});

export default merge(baseConfig, {
  input: './demo/index.html',
  plugins: [
    copy({
      targets: [
        { src: ['demo/favicon.ico'], dest: 'build' },
        {
          src: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
          dest: 'build'
        }
      ]
    })
  ]
});
