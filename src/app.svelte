<script lang="ts">
/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

/* Theme variables */
import "~/theme/variables.css";
import "~/theme/custom.css";

import { setupConfig } from "@ionic/core";
import { defineCustomElements } from "@ionic/core/loader";
import { Router } from "@roxi/routify";
import { routes } from "routify/routes";
import { store } from "~/store/ionic";

let ready = false;

const initialize = async () => {
  setupConfig({ mode: "ios" });
  await defineCustomElements(window);
  ready = true;
};

initialize();
</script>

{#if ready}
  <ion-app>
    <Router {routes} />
  </ion-app>
{/if}
