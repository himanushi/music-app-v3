<script lang="ts">
import { onMount } from "svelte";
import { markdown } from "~/lib/markdown";
import { twitterAccount } from "~/lib/variable";
import { currentVersion, reset } from "~/lib/version";

let html: string | HTMLElement | DocumentFragment = "";
onMount(async () => {
  const version = await currentVersion() || "";

  html = markdown(`
# このアプリについて
## 概要
音楽サブスクリプションで配信中の音楽を検索できるサービスです。

## 目的
ユーザー同士で音楽を楽しく共有できるよう開発を進めています。

## SNS, 開発プロジェクトなど
* [Twitter](https://twitter.com/${twitterAccount})
* [Instagram](https://www.instagram.com/himanushi777)
* [note](https://note.com/himanushi/n/nd598a3d92a15)
* [Github](https://github.com/users/himanushi/projects/2)

## 問い合わせ
* [Q & A](https://note.com/himanushi/n/na2e56d4ee4d6)
* [Twitter にてダイレクトメッセージをお願いします](https://twitter.com/${twitterAccount})
* [または、Instagram にてダイレクトメッセージをお願いします](https://www.instagram.com/himanushi777)

#### ファイルバージョン
${version}

#### リセット
再生されないなどの不具合がある場合は下のボタンをクリックしてください。
`);
});
</script>

<div class="ion-padding">
  {@html html}
</div>

<ion-item button on:click={reset}>
  <ion-icon name="refresh-outline" slot="start" />
  リセット
</ion-item>
