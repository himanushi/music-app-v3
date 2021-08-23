<script lang="ts">
import { url } from "@roxi/routify";
import Sidebar from "./_sidebar.svelte";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import MenuIcon from "~/icons/menu.svelte";
import { title } from "~/lib/variable";

const showSidebar = () => modals.open(Sidebar);
</script>

<ion-header translucent>
  <ion-toolbar>
    <ion-title>{title}</ion-title>
  </ion-toolbar>
</ion-header>
<!-- <IconButton class="h-10 w-10 mr-2" on:click={showSidebar}>
    <MenuIcon class="h-7 w-7" />
  </IconButton>

  <h1 class="clickable">
    <a href={$url("./albums")}>{title}</a>
  </h1> -->
