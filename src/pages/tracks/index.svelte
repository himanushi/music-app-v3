<script lang="ts">
import { params } from "@roxi/routify";
import SearchDetail from "./_search-detail.svelte";
import Tracks from "./_tracks.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { SearchParams } from "~/lib/params";

$: canSearch = false;

$: if (params) {

  canSearch = $params[SearchParams.track.favorite] === "1";

  const keyword = $params[SearchParams.track.keyword];
  if (keyword && keyword.length >= 2) {

    canSearch = true;

  }

}

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

{#if me && isAllowed(me, "tracks")}
  {#if canSearch}
    <div>
      <Tracks params={$params} />
    </div>
  {/if}
  <SearchDetailButton {component} />
{/if}

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
