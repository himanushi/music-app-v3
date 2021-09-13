<script lang="ts">
import { goto } from "@roxi/routify";

import { mutation } from "svelte-apollo";
import type {
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
} from "~/graphql/types";
import { DeletePlaylistDocument } from "~/graphql/types";
import {
  openConfirm, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;

const deletePlaylist = mutation<
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
>(DeletePlaylistDocument);

const remove = () => {

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

              await deletePlaylist({ variables: { input: { playlistId: id } } });

              openToast({
                color: "green",
                duration: 5000,
                message: "プレイリストを削除しました"
              });

              $goto("/playlist", { pm: 1 });

            } catch (error) {

              openToast({
                color: "red",
                duration: 5000,
                message: "エラーが発生しました"
              });

            }

          })();

        },
        text: "削除"
      }
    ],
    header: "削除しますか？"
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "deletePlaylist")}
  <ion-fab-button color="red" on:click={remove}>
    <ion-icon name="trash-outline" />
  </ion-fab-button>
{/if}
