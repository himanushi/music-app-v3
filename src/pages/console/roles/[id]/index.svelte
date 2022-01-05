<script lang="ts">
import Role from "./_role.svelte";
import { isAllowed, meQuery } from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, ["roles", "updateRole"])}
  <Role {id} />
{/if}
