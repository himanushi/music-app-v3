<script lang="ts">
import { url } from "@roxi/routify";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;

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
  <ion-label> iTunes で聴く </ion-label>
</ion-item>
