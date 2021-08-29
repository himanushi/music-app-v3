<script lang="ts">
import {
  goto, params
} from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetail from "./_search-detail.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import { define } from "~/lib/customElement";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

const query = meQuery();
$: me = $query?.data?.me;

const name = "modal-albums-search";
define(name, SearchDetail);

const go = (url: string) => $goto(url);
</script>

<Content>
  {#if me && isAllowed(me, "albums")}
    <ion-list>
      <Albums params={$params} />
    </ion-list>
    <SearchDetailButton {name} props={{ go }} />
  {/if}
</Content>
