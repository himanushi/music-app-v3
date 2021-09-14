<script lang="ts">
import Artist from "./_artist.svelte";
import type { CurrentUser } from "~/graphql/types";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me as CurrentUser;
</script>

{#if me && isAllowed(me, "artist")}
  <Artist {id} {me} />
{/if}
