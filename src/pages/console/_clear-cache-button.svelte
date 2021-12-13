<script lang="ts">
import { ApolloError } from "@apollo/client";
import { mutation } from "svelte-apollo";
import type {
  ClearCacheMutationVariables,
  ClearCachePayload,
} from "~/graphql/types";
import { ClearCacheDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { openConfirm, openToast } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

const clearCache =
  mutation<ClearCachePayload, ClearCacheMutationVariables>(ClearCacheDocument);

const clear = () => {
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
              await clearCache({ variables: { input: {} } });

              openToast({
                color: "light-green",
                duration: 5000,
                message: "キャッシュクリアしました。",
              });
            } catch (error) {
              if (error instanceof ApolloError) {
                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`,
                });
              }
            }
          })();
        },
        text: "キャッシュクリア",
      },
    ],
    header: "キャッシュクリアしますか？",
  });
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "clearCache")}
  <ion-item button on:click={clear}>
    <ion-icon slot="start" color="red" name="trash-outline" />
    <ion-label>キャッシュクリア</ion-label>
  </ion-item>
{/if}
