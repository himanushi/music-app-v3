<script lang="ts">
import { ApolloError } from "@apollo/client";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import type {
  UpsertAlbumInput,
  UpsertAlbumMutation,
  UpsertAlbumMutationVariables
} from "~/graphql/types";
import { UpsertAlbumDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  closeLoading, openConfirm, openLoading, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

const upsertAlbum =
  mutation<UpsertAlbumMutation, UpsertAlbumMutationVariables>(
    UpsertAlbumDocument
  );

const add = () => {

  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル"
      },
      {
        handler: (values: UpsertAlbumInput) => {

          (async () => {

            try {

              if (values.appleMusicId && values.appleMusicId !== "") {

                await openLoading();

                const result = await upsertAlbum({ variables: { input: values } });

                if (
                  result.data?.upsertAlbum?.albums &&
                  result.data?.upsertAlbum?.albums.length > 0
                ) {

                  const album = result.data?.upsertAlbum?.albums[0];
                  $goto(`/albums/${album.id}`);

                  openToast({
                    color: "light-green",
                    duration: 5000,
                    message: "追加しました"
                  });

                } else {

                  openToast({
                    color: "light-blue",
                    duration: 5000,
                    message: "一致するアルバムがありませんでした"
                  });

                }

              }

            } catch (error) {

              if (error instanceof ApolloError) {

                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`
                });

              }

            } finally {

              await closeLoading();

            }

          })();

        },
        text: "追加"
      }
    ],
    header: "Apple Music ID でアルバムを追加します",
    inputs: [
      {
        name: "appleMusicId",
        placeholder: "Apple Music ID",
        type: "text"
      }
    ]
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertAlbum")}
  <ion-item button on:click={add}>
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
    <ion-label> Apple Music ID でアルバムを追加 </ion-label>
  </ion-item>
{/if}
