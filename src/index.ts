import { defineCustomElements } from "@ionic/core/loader";
import App from "./app.svelte";
import { unregister } from "./register-service-worker";

if (typeof window !== "undefined") {

  defineCustomElements(window);

}

const app = new App({ target: document.body });

export default app;

/*
 * Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 * Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
 */
if (import.meta.hot) {

  import.meta.hot.accept();
  import.meta.hot.dispose(() => {

    app.$destroy();

  });

}

unregister();
