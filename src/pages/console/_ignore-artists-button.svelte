<script lang="ts">
import { ApolloError } from "@apollo/client";
import { mutation } from "svelte-apollo";
import Messages from "~/components/messages.svelte";
import type {
  IgnoreArtistsMutationVariables,
  IgnoreArtistsPayload,
} from "~/graphql/types";
import { IgnoreArtistsDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openConfirm, openLoading, openToast } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

const ignore = mutation<IgnoreArtistsPayload, IgnoreArtistsMutationVariables>(
  IgnoreArtistsDocument
);

const confirm = () => {
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

              await ignore({ variables: { input: {} } });

              openToast({
                color: "light-green",
                duration: 5000,
                message: "除外しました。",
              });
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
        text: "除外",
      },
    ],
    header: "保留アーティストを全て除外しますか？",
  });
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "ignoreArtists")}
  <ion-item button on:click={confirm}>
    <ion-icon slot="start" color="yellow" name="people-outline" />
    <ion-label> 保留中のアーティスト全て除外 </ion-label>
  </ion-item>
  <Messages
    type="warn"
    messages={["保留中のアーティストを確認してから実行すること"]}
  />
{/if}
