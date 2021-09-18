<script lang="ts">
import { mutation } from "svelte-apollo";
import Messages from "~/components/messages.svelte";
import type {
  IgnoreAlbumsMutationVariables,
  IgnoreAlbumsPayload
} from "~/graphql/types";
import { IgnoreAlbumsDocument } from "~/graphql/types";
import {
  openConfirm, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

const ignore =
  mutation<IgnoreAlbumsPayload, IgnoreAlbumsMutationVariables>(
    IgnoreAlbumsDocument
  );

const confirm = () => {

  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル"
      },
      {
        handler: () => {

          (async () => {

            try {

              const ignored = await ignore({ variables: { input: {} } });
              const names =
                ignored.data?.albums?.map((album) => album.name).join(", ") ||
                "";

              openToast({
                color: "light-green",
                duration: 5000,
                message: `除外しました。${names}`
              });

            } catch (error) {

              openToast({
                color: "light-red",
                duration: 5000,
                message: `エラーが発生しました: ${error}`
              });

            }

          })();

        },
        text: "除外"
      }
    ],
    header: "保留アルバムを全て除外しますか？"
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "ignoreAlbums")}
  <ion-item button on:click={confirm}>
    <ion-icon slot="start" color="yellow" name="disc-outline" />
    <ion-label> 保留中のアルバム全て除外 </ion-label>
  </ion-item>
  <Messages
    type="warn"
    messages={["保留中のアルバムを確認してから実行すること"]}
  />
{/if}
