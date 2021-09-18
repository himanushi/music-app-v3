<script lang="ts">
import Artist from "./_artist.svelte";
import FabButton from "./_fab-button.svelte";
import Refresher from "~/components/refresher.svelte";
import client from "~/graphql/client";
import type { CurrentUser } from "~/graphql/types";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

let tggle = true;
let loaded = false;
const refresh = () => {

  client.cache.evict({ id: `Artist:${id}` });
  tggle = !tggle;

};

const query = meQuery();
$: me = $query?.data?.me as CurrentUser;
</script>

{#if me && isAllowed(me, "artist")}
  <Refresher {refresh} bind:loaded />
  {#key tggle}
    <Artist {id} {me} bind:loaded />
  {/key}
{/if}

{#if me && isAllowed(me, "console")}
  <FabButton {id} {refresh} />
{/if}
