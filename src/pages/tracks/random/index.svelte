<script lang="ts">
import Random from "./_random.svelte";
import Refresher from "~/components/refresher.svelte";
import client from "~/graphql/client";
import {
  isAllowed, meQuery
} from "~/lib/me";

let tggle = true;
let loaded = false;
const refresh = () => {

  client.cache.evict({
    fieldName: "tracks",
    id: "ROOT_QUERY"
  });

  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "tracks")}
  <Refresher {refresh} bind:loaded />
  {#key tggle}
    <Random bind:loaded />
  {/key}
{/if}
