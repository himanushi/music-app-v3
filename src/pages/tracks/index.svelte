<script lang="ts">
import { params } from "@roxi/routify";
import SearchDetail from "./_search-detail.svelte";
import Tracks from "./_tracks.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { SearchParams } from "~/lib/params";
import Content from "~/pages/_content.svelte";

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

<Content>
  {#if me && isAllowed(me, "tracks")}
    {#if canSearch}
      <div>
        <Tracks params={$params} />
      </div>
    {/if}
    <SearchDetailButton {component} />
  {/if}
</Content>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
