<script lang="ts">
import { ApolloError } from "@apollo/client";
import { mutation } from "svelte-apollo";
import type {
  UpdateAlbumMutationVariables,
  UpdateAlbumPayload,
} from "~/graphql/types";
import { AlbumDocument, UpdateAlbumDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openConfirm, openLoading, openToast } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

export let id: string;
export let refresh: () => void;

const updateAlbum =
  mutation<UpdateAlbumPayload, UpdateAlbumMutationVariables>(
    UpdateAlbumDocument
  );

const update = () => {
  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル",
      },
      {
        handler: () => {
          (async () => {
            try {
              await openLoading();

              await updateAlbum({
                refetchQueries: [
                  {
                    query: AlbumDocument,
                    variables: { id },
                  },
                ],
                variables: { input: { albumId: id } },
              });

              refresh();

              openToast({
                color: "light-green",
                duration: 5000,
                message: "更新しました",
              });
            } catch (error) {
              if (error instanceof ApolloError) {
                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  duration: 5000,
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`,
                });
              }
            } finally {
              await closeLoading();
            }
          })();
        },
        text: "更新",
      },
    ],
    header: "Apple Music に問い合わせて更新しますか？",
  });
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "updateAlbum")}
  <ion-fab-button color="white" on:click={update}>
    <ion-icon name="sync-outline" />
  </ion-fab-button>
{/if}
