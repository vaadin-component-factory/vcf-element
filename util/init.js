/* THIS SCRIPT IS RUN AUTOMATICALLY AFTER NPM INSTALL. */
import { initialize, dirname } from '@vaadin-component-factory/vcf-element-util';

initialize(dirname(new URL('.', import.meta.url)));
