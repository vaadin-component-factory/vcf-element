import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { VcfElement } from '../src/vcf-element.js';
import '../vcf-element.js';

describe('VcfElement', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: VcfElement = await fixture(html`<vcf-element></vcf-element>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el: VcfElement = await fixture(html`<vcf-element></vcf-element>`);

    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el: VcfElement = await fixture(html`<vcf-element title="attribute title"></vcf-element>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el: VcfElement = await fixture(html`<vcf-element></vcf-element>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
