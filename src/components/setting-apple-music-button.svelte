<script lang="ts">
import { goto } from "@roxi/routify";
import { accountService } from "~/machines/apple-music-account-machine";
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <ion-item button>
    <ion-label on:click={() => $goto("/me")}> Apple Music 設定へ </ion-label>
  </ion-item>
{/if}
