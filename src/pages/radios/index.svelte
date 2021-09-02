<script lang="ts">
import { params } from "@roxi/routify";
import Radios from "./_radios.svelte";
import SearchDetail from "./_search-detail.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

$: tggle = true;

const render = () => {

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

<Content>
  {#if me && isAllowed(me, "radios")}
    {#key tggle}
      <ion-list>
        <Radios params={$params} />
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
