<script lang="ts">
import { Router } from "@roxi/routify";
import { routes } from "routify/routes";
import { onMount } from "svelte";
import { register } from "./register-service-worker";

onMount(() => {

  if (window.location.host !== "localhost:8080") {

    register();

  }

});
</script>

<ion-app>
  <Router {routes} />
</ion-app>
