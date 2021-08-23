/* eslint-disable max-lines-per-function */
// ref: https://github.com/sveltejs/svelte/issues/1748#issuecomment-583880664
import { SvelteComponent } from "svelte";

export const define = (
  name: string,
  Component: typeof SvelteComponent,
  attributes = []
) => customElements.define(
  name,
  class extends HTMLElement {

      component?: SvelteComponent;

      constructor () {

        super();
        this.component = undefined;

      }

      static get observedAttributes () {

        return attributes;

      }

      attributeChangedCallback (key: string, oldValue: any, newValue: any) {

        if (this.component && oldValue !== newValue) {

          this.component.$set({ [key]: newValue });

        }

      }

      connectedCallback () {

        const props: Record<string, string | undefined> = {};

        for (const attr of attributes) {

          props[attr] = this.getAttribute(attr) || undefined;

        }

        this.component = new Component({
          props,
          target: this
        });

      }

  }
);
