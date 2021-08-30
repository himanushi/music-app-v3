<script lang="ts">
import Artist from "./_artist.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  {#if me && isAllowed(me, "artist")}
    <Artist {id} />
  {/if}
</Content>
