<script lang="ts">
import { goto } from "@roxi/routify";
import { isAllowed, meQuery } from "~/lib/me";

const path = "/console/roles";

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, ["roles", "updateRole"])}
  <ion-item button on:click={() => $goto(path)}>
    <ion-icon slot="start" color="yellow" name="key" />
    <ion-label>権限管理</ion-label>
  </ion-item>
{/if}
