<script lang="ts">
import { goto } from "@roxi/routify";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;

const edit = () => $goto("/playlist/:id/edit", { id });

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertPlaylist")}
  <ion-fab-button color="white" on:click={edit}>
    <ion-icon name="build-outline" />
  </ion-fab-button>
{/if}
