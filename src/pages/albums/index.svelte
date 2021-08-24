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
</script>

<ion-content>
  {#if me && isAllowed(me, "albums")}
    <ion-list>
      <Albums params={$params} />
    </ion-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <SearchDetailButton component={SearchDetail} />
    </ion-fab>
  {/if}
</ion-content>
