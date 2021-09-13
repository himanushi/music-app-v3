<script lang="ts">
import isMobile from "ismobilejs";
import Logo from "~/icons/logo-apple-music.svg";
import { appleAffiliateToken } from "~/lib/variable";
import { accountService } from "~/machines/apple-music-account-machine";

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}

let href = "";

if (isMobile(window.navigator).apple.device) {

  href = `musics://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else if ((/Mac|Win/iu).test(navigator.platform)) {

  href = `itmss://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else if (isMobile(window.navigator).android.device) {

  href = `https://music.apple.com/deeplink?app=music&p=subscribe${token}`;

} else {

  href = `https://music.apple.com/jp/browse?app=music&p=subscribe${token}`;

}
</script>

{#if accountService && $accountService.matches("unauthorized")}
  <ion-item button class="apple" target="_blank" {href}>
    <ion-icon slot="start" src={Logo} />
    <ion-label> Apple Music に加入 </ion-label>
  </ion-item>
{/if}
