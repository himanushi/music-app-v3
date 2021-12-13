<script lang="ts">
import Login from "./_login.svelte";
import { isAllowed, meQuery } from "~/lib/me";

const mq = meQuery();
$: me = $mq?.data?.me;
</script>

{#if me && isAllowed(me, "login")}
  <Login />
{/if}
