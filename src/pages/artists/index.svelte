<script lang="ts">
import { params } from "@roxi/routify";
import Artists from "./_artists.svelte";
import SearchDetail from "./_search-detail.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

{#if me && isAllowed(me, "artists")}
  <ion-list>
    <Artists id="artists" params={$params} />
  </ion-list>
  <SearchDetailButton {component} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
