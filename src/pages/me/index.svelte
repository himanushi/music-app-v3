<script lang="ts">
import isMobile from "ismobilejs";
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import InfoMessage from "~/components/info-message.svelte";
import JoinAppleMusicButton from "~/components/join-apple-music-button.svelte";
import { meQuery } from "~/lib/me";
import Content from "~/pages/_content.svelte";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  <ion-list>
    <ion-item-group>
      <ion-item-divider sticky>
        <ion-label>User Setting</ion-label>
      </ion-item-divider>

      {#if me?.registered}
        <ion-item>
          <ion-label> ユーザーID </ion-label>
          <ion-note color="white" slot="end">
            {me.username}
          </ion-note>
        </ion-item>
        <ion-item>
          <ion-label> 名前 </ion-label>
          <ion-note color="white" slot="end">
            {me.name}
          </ion-note>
        </ion-item>
        <ion-item>
          <ion-label> 権限 </ion-label>
          <ion-note slot="end">
            {me.role.description}
          </ion-note>
        </ion-item>
      {/if}

      <AccountButton />
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider sticky>
        <ion-label>Music Services</ion-label>
      </ion-item-divider>
      <AppleMusicButton />
      <JoinAppleMusicButton />
      <InfoMessage>
        Apple Music 加入後にログインすると、このアプリ上でフル再生や Apple Music
        にプレイリスト追加などが出来るようになります。
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
      </InfoMessage>
    </ion-item-group>
  </ion-list>
</Content>
