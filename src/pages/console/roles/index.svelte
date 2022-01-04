<script lang="ts">
import Roles from "./_roles.svelte";
import { isAllowed, meQuery } from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, ["roles", "updateRole"])}
  <Roles />
{/if}
