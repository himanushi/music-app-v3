<script lang="ts">
import { CapacitorAppleMusic } from "capacitor-plugin-applemusic";

import isMobile from "ismobilejs";
import { onMount } from "svelte";
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

let hasMusicSubscription = false;
onMount(async () => {
  hasMusicSubscription = (await CapacitorAppleMusic.hasMusicSubscription()).
    result;
});
</script>

{#if accountService && ($accountService.matches("unauthorized") || !hasMusicSubscription)}
  <ion-item button class="apple" target="_blank" {href}>
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
    <ion-label> Apple Music に加入 </ion-label>
  </ion-item>
{/if}
