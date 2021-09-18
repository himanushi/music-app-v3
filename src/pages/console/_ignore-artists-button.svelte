<script lang="ts">
import { mutation } from "svelte-apollo";
import Messages from "~/components/messages.svelte";
import type {
  IgnoreArtistsMutationVariables,
  IgnoreArtistsPayload
} from "~/graphql/types";
import { IgnoreArtistsDocument } from "~/graphql/types";
import {
  openConfirm, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

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
        text: "キャンセル"
      },
      {
        handler: () => {

          (async () => {

            try {

              const ignored = await ignore({ variables: { input: {} } });
              const names =
                ignored.data?.artists?.
                  map((artist) => artist.name).
                  join(", ") || "";

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
    header: "保留アーティストを全て除外しますか？"
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
