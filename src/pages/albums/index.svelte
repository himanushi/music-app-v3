<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import { openModal } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<ion-content>
  {#if me && isAllowed(me, "albums")}
    <ion-list>
      <Albums params={$params} />
    </ion-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button on:click={openModal("modal-albums-search")}>
        <ion-icon name="search-outline" />
      </ion-fab-button>
    </ion-fab>
  {/if}
</ion-content>
