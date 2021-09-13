<script lang="ts">
import { url } from "@roxi/routify";
import Logo from "~/icons/logo-apple-music.svg";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}
</script>

<ion-item
  button
  href={$url(`https://music.apple.com/jp/album/${id}?app=music${token}`)}
  target="_blank"
>
  <ion-icon slot="start" src={Logo} />
  <ion-label> Apple Music で聴く </ion-label>
</ion-item>
