<script lang="ts">
import { params } from "@roxi/routify";
import Artists from "./_artists.svelte";
import SearchDetail from "./_search-detail.svelte";
import Refresher from "~/components/refresher.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";

$: tggle = true;
const refresh = () => {

  client.cache.evict({
    fieldName: "albums",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

{#if me && isAllowed(me, "artists")}
  <Refresher {refresh} />
  <ion-list>
    {#key tggle}
      <Artists params={$params} />
    {/key}
  </ion-list>
  <SearchDetailButton {component} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
