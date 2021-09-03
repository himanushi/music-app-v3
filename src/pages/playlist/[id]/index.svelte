<script lang="ts">
import Playlist from "./_playlist.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  {#if me && isAllowed(me, "playlist")}
    <Playlist {id} />
  {/if}
</Content>
