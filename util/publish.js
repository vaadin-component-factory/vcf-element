import { publish, dirname } from '@vaadin-component-factory/vcf-element-util';

publish('vcf-element', dirname(new URL('.', import.meta.url)));
