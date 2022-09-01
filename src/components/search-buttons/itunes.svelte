<script context="module">
export type Status = "loading" | "purchased" | "not purchased";
</script>

<script lang="ts">
import { url } from "@roxi/routify";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;
export let status: Status;

let token = "";
if (appleAffiliateToken) {
  token = `&at=${appleAffiliateToken}`;
}
</script>

<ion-item
  button
  href={$url(`itmss://music.apple.com/jp/album/${id}?app=itunes${token}`)}
  target="_blank"
>
  <ion-icon slot="start" src="/assets/logo-itunes.svg" />
  <ion-label>
    iTunes で聴く
    {#if status === "loading"}
      (同期中)
    {:else if status === "purchased"}
      (購入済み)
    {:else if status === "not purchased"}
      (未購入)
    {/if}
  </ion-label>
</ion-item>
