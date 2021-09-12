<script lang="ts">
import { goto } from "@roxi/routify";
import {
  isAllowed, meQuery
} from "~/lib/me";

const create = () => $goto("/playlist/new");

const query = meQuery();
$: me = $query?.data?.me;

let fab: HTMLElement;
$: if (fab) {

  fab.setAttribute("slot", "fixed");

}
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <ion-fab vertical="bottom" horizontal="end" bind:this={fab}>
    <ion-fab-button on:click={create}>
      <ion-icon name="add" />
    </ion-fab-button>
  </ion-fab>
{/if}

<style lang="scss">
ion-fab {
  right: 76px;
}
</style>
