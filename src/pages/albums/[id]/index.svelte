<script lang="ts">
import Album from "./_album.svelte";
import FabButton from "./_fab-button.svelte";
import Refresher from "~/components/refresher.svelte";
import client from "~/graphql/client";
import type { CurrentUserObject } from "~/graphql/types";
import { isAllowed, meQuery } from "~/lib/me";

export let id = "";

let tggle = true;
let loaded = false;
const refresh = () => {
  client.cache.evict({ id: `AlbumObject:${id}` });
  tggle = !tggle;
};

const query = meQuery();
$: me = $query?.data?.me as CurrentUserObject;
</script>

{#if me && isAllowed(me, "album")}
  <Refresher {refresh} bind:loaded />
  {#key tggle}
    <Album {id} {me} bind:loaded />
  {/key}
{/if}

{#if me && isAllowed(me, "console")}
  <FabButton {id} {refresh} />
{/if}
