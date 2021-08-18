import { defineCustomElements } from "@ionic/core/loader";
import "@ionic/core/css/ionic.bundle.css";
// import "@ionic/core/dist/ionic/index.esm.js";
// import "@ionic/core/dist/ionic/ionic.js";
// import "@ionic/core/dist/ionic/ionic.esm.js";
// import "@ionic/core/css/ionic.bundle.css";

import App from "./app.svelte";

const app = new App({ target: document.body });

export default app;

if (typeof window !== "undefined") {
  defineCustomElements(window);
}

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
