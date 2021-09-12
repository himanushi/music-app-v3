<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetail from "./_search-detail.svelte";
import Refresher from "~/components/refresher.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";

let tggle = true;
let loaded = false;
const refresh = () => {

  client.cache.evict({
    fieldName: "albums",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;

let modal: HTMLElement;
</script>

{#if me && isAllowed(me, "albums")}
  <Refresher {refresh} bind:loaded />
  <ion-list>
    {#key tggle}
      <Albums params={$params} bind:loaded />
    {/key}
  </ion-list>
  <SearchDetailButton component={modal} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={modal}>
    <SearchDetail />
  </span>
</span>
