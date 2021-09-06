<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetail from "./_search-detail.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;

let modal: HTMLElement;
</script>

{#if me && isAllowed(me, "albums")}
  <ion-list>
    <Albums params={$params} />
  </ion-list>
  <SearchDetailButton component={modal} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={modal}>
    <SearchDetail />
  </span>
</span>
