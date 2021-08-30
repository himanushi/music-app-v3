<script lang="ts">
import Track from "./_track.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  {#if me && isAllowed(me, "track")}
    <Track {id} />
  {/if}
</Content>
