<script lang="ts">
import { ApolloError } from "@apollo/client";

import { mutation } from "svelte-apollo";
import type {
  ForceIgnoreAlbumPayload,
  ForceIgnoreAlbumMutationVariables
} from "~/graphql/types";
import {
  AlbumDocument, ForceIgnoreAlbumDocument
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  closeLoading, openConfirm, openLoading, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;
export let refresh: () => void;

const forceIgnoreAlbum = mutation<
  ForceIgnoreAlbumPayload,
  ForceIgnoreAlbumMutationVariables
>(ForceIgnoreAlbumDocument);

const change = () => {

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

              await openLoading();

              await forceIgnoreAlbum({
                refetchQueries: [
                  {
                    query: AlbumDocument,
                    variables: { id }
                  }
                ],
                variables: { input: { albumId: id } }
              });

              refresh();

              openToast({
                color: "light-green",
                duration: 5000,
                message: "アルバムを削除しました"
              });

            } catch (error) {

              if (error instanceof ApolloError) {

                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  duration: 5000,
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`
                });

              }

            } finally {

              await closeLoading();

            }

          })();

        },
        text: "更新"
      }
    ],
    header: "元に戻せませんがアルバムを削除しますか？"
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertAlbum")}
  <ion-fab-button color="red" on:click={change}>
    <ion-icon name="trash-outline" />
  </ion-fab-button>
{/if}
