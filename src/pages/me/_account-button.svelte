<script lang="ts">
import { goto } from "@roxi/routify";
import LogoutButton from "./_logout-button.svelte";
import Messages from "~/components/messages.svelte";
import { isAllowed, meQuery } from "~/lib/me";

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
    <ion-icon color="blue" name="log-in-outline" slot="start" />
    ログイン
  </ion-item>
  <ion-item button on:click={go("/me/signup")}>
    <ion-icon color="green" name="person-add-outline" slot="start" />
    登録する
  </ion-item>
  <Messages
    messages={[
      "ログインすると、プレイリストの作成公開が出来るようになります。",
    ]}
  />
{/if}
