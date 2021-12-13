<script lang="ts">
import { ApolloError } from "@apollo/client";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import type {
  AddAlbumInput,
  AddAlbumMutation,
  AddAlbumMutationVariables,
} from "~/graphql/types";
import { AddAlbumDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openConfirm, openLoading, openToast } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

const addAlbum =
  mutation<AddAlbumMutation, AddAlbumMutationVariables>(AddAlbumDocument);

const add = () => {
  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル",
      },
      {
        handler: (values: AddAlbumInput) => {
          (async () => {
            try {
              if (values.appleMusicId && values.appleMusicId !== "") {
                await openLoading();

                const result = await addAlbum({
                  variables: { input: values },
                });

                if (result.data?.addAlbum?.album) {
                  const album = result.data.addAlbum.album;
                  $goto(`/albums/${album.id}`);

                  openToast({
                    color: "light-green",
                    duration: 5000,
                    message: "追加しました",
                  });
                } else {
                  openToast({
                    color: "light-blue",
                    duration: 5000,
                    message: "一致するアルバムがありませんでした",
                  });
                }
              }
            } catch (error) {
              if (error instanceof ApolloError) {
                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`,
                });
              }
            } finally {
              await closeLoading();
            }
          })();
        },
        text: "追加",
      },
    ],
    header: "Apple Music ID でアルバムを追加します",
    inputs: [
      {
        name: "appleMusicId",
        placeholder: "Apple Music ID",
        type: "text",
      },
    ],
  });
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "addAlbum")}
  <ion-item button on:click={add}>
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
    <ion-label> Apple Music ID でアルバムを追加 </ion-label>
  </ion-item>
{/if}
