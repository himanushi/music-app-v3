<script lang="ts">
import { params } from "@roxi/routify";
import NewButton from "./_new-button.svelte";
import Playlists from "./_playlists.svelte";
import SearchDetail from "./_search-detail.svelte";
import SyncButton from "./_sync-button.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

$: tggle = true;
const render = () => {

  client.cache.evict({
    fieldName: "playlists",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

<Content>
  {#if me && isAllowed(me, "playlists")}
    {#key tggle}
      <ion-list>
        <Playlists params={$params} />
      </ion-list>
    {/key}
    <SearchDetailButton {component} />
  {/if}
</Content>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
