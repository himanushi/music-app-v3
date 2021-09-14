<script lang="ts">
import Album from "./_album.svelte";
import type { CurrentUser } from "~/graphql/types";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me as CurrentUser;
</script>

{#if me && isAllowed(me, "album")}
  <Album {id} {me} />
{/if}
