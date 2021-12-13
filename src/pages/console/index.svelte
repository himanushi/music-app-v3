<script lang="ts">
import Console from "./_console.svelte";
import { isAllowed, meQuery } from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "console")}
  <Console />
{/if}
