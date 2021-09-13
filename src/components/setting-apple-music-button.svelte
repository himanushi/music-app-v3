<script lang="ts">
import { goto } from "@roxi/routify";
import Messages from "~/components/messages.svelte";
import { accountService } from "~/machines/apple-music-account-machine";

export let message: string | undefined = undefined;
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <ion-item button on:click={() => $goto("/me")}>
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
    <ion-label> Apple Music の設定へ </ion-label>
  </ion-item>
  {#if message}
    <Messages messages={[message]} />
  {/if}
{/if}
