<script lang="ts">
import { Capacitor } from "@capacitor/core";
import isMobile from "ismobilejs";
import { accountService } from "~/machines/apple-music-account-machine";
</script>

<ion-item>
  <ion-icon color="blue" name="information-circle-outline" slot="start" />
  <ion-label class="ion-text-wrap">
    {#if accountService && $accountService.matches("authorized")}
      {#if Capacitor.getPlatform() === "ios"}
        ログアウトする場合は設定で
        <strong>メディアと Apple Music</strong>
        を無効にしてください。
      {/if}
      ログアウトした場合は30秒の試聴再生となります。
    {:else}
      {#if Capacitor.getPlatform() === "ios"}
        ログインする場合は設定で
        <strong>メディアと Apple Music</strong>
        を有効にしてください。
      {/if}
      Apple Music にログインすると、フル再生やプレイリスト追加などが出来るようになります。
      ログインしない場合は30秒の試聴再生となります。
      {#if (/Win/iu).test(navigator.platform)}
        Windows の場合は事前に、
        <a
          class="windows"
          href="https://support.apple.com/ja-jp/HT210384"
          target="_blank"
        >
          iTunes for Windows
        </a>
        をインストールをしてください。
      {/if}
      {#if isMobile(window.navigator).android.device}
        Android の場合は事前に、
        <a
          class="android"
          href="https://play.google.com/store/apps/details?id=com.apple.android.music"
          target="_blank"
        >
          Apple Music
        </a>
        をインストールをしてください。
      {/if}
    {/if}
  </ion-label>
</ion-item>
