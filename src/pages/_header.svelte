<script lang="ts">
import { goto } from "@roxi/routify";
import { title } from "~/lib/variable";
</script>

<ion-header translucent>
  <ion-toolbar>
    <ion-buttons slot="end">
      <ion-menu-button menu="sidebar" auto-hide={false}>
        <ion-icon name="menu" />
      </ion-menu-button>
    </ion-buttons>
    <ion-title on:click={() => $goto("/albums")}>{title}</ion-title>
  </ion-toolbar>
</ion-header>
