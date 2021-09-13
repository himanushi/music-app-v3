<script lang="ts">
import { goto } from "@roxi/routify";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;

const createRadio = () => $goto("/playlist/:id/create-radio", { id });

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "createRadio")}
  <ion-fab-button color="white" on:click={createRadio}>
    <ion-icon color="red" name="radio" />
  </ion-fab-button>
{/if}
