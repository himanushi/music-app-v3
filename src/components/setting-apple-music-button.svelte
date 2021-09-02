<script lang="ts">
import { goto } from "@roxi/routify";
import InfoMessage from "~/components/info-message.svelte";
import { accountService } from "~/machines/apple-music-account-machine";

export let message: string | undefined = undefined;
</script>

{#if accountService && $accountService.matches("unauthorized")}
  {#if message}
    <InfoMessage>{message}</InfoMessage>
  {/if}
  <ion-item button>
    <ion-label on:click={() => $goto("/me")}> Apple Music の設定へ </ion-label>
  </ion-item>
{/if}
