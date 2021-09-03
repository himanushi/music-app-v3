<script lang="ts">
import { goto } from "@roxi/routify";
import LogoutButton from "./_logout-button.svelte";
import InfoMessage from "~/components/info-message.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";

const go = (path: string) => () => {

  $goto(path);

};

$: query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "updateMe") && me.registered}
  <ion-item button on:click={go("/me/edit")}>
    <ion-icon name="build-outline" slot="start" />
    設定を変更する
  </ion-item>
{/if}

{#if me && isAllowed(me, "logout") && me.registered}
  <LogoutButton />
{:else if me && isAllowed(me, "login")}
  <ion-item button on:click={go("/me/login")}>
    <ion-icon color="blue" name="home-outline" slot="start" />
    ログイン
  </ion-item>
  <ion-item button on:click={go("/me/signup")}>
    <ion-icon color="green" name="person-add-outline" slot="start" />
    登録する
  </ion-item>
  <InfoMessage>
    ログインすると、プレイリストの作成公開、ラジオの作成公開などが出来るようになります。アカウントの復旧も出来るようになります。
  </InfoMessage>
{/if}
