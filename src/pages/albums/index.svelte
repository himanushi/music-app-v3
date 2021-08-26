<script lang="ts">
import { params } from "@roxi/routify";
import Albums from "./_albums.svelte";
import SearchDetailButton from "~/components/search-detail-button.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  {#if me && isAllowed(me, "albums")}
    <ion-list>
      <Albums params={$params} />
    </ion-list>

    <SearchDetailButton modalName="modal-albums-search" />
  {/if}
</Content>
