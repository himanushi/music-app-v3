<script lang="ts">
import { title } from "~/lib/variable";
</script>

<ion-header translucent>
  <ion-toolbar>
    <ion-buttons slot="end">
      <ion-menu-button menu="sidebar" auto-hide={false}>
        <ion-icon name="menu" />
      </ion-menu-button>
    </ion-buttons>
    <ion-title>{title}</ion-title>
  </ion-toolbar>
</ion-header>
<!-- <IconButton class="h-10 w-10 mr-2" on:click={showSidebar}>
    <MenuIcon class="h-7 w-7" />
  </IconButton>

  <h1 class="clickable">
    <a href={$url("./albums")}>{title}</a>
  </h1> -->
