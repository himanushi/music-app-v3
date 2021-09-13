<script lang="ts">
import { params } from "@roxi/routify";
import Radios from "./_radios.svelte";
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
    fieldName: "radios",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

{#if me && isAllowed(me, "radios")}
  <Refresher {refresh} bind:loaded />

  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Radios</ion-label>
    </ion-item-divider>
    <ion-list>
      {#key tggle}
        <Radios params={$params} bind:loaded />
      {/key}
    </ion-list>
  </ion-item-group>

  <SearchDetailButton {component} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
