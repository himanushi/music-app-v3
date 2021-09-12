<script lang="ts">
import { goto } from "@roxi/routify";
import InfoMessage from "~/components/info-message.svelte";
import { accountService } from "~/machines/apple-music-account-machine";

export let message: string | undefined = undefined;
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <ion-item button on:click={() => $goto("/me")}>
    <ion-icon color="pink" name="logo-apple" slot="start" />
    <ion-label> Apple Music の設定へ </ion-label>
  </ion-item>
  {#if message}
    <InfoMessage>{message}</InfoMessage>
  {/if}
{/if}
