<script lang="ts">
import { params } from "@roxi/routify";
import Artists from "./_artists.svelte";
import SearchDetail from "./_search-detail.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

const query = meQuery();
$: me = $query?.data?.me;

let component: HTMLElement;
</script>

<Content>
  {#if me && isAllowed(me, "artists")}
    <ion-list>
      <Artists params={$params} />
    </ion-list>
    <SearchDetailButton {component} />
  {/if}
</Content>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <SearchDetail />
  </span>
</span>
