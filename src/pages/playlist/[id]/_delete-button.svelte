<script lang="ts">
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import type { Props } from "~/components/confirm.svelte";
import Confirm from "~/components/confirm.svelte";
import { modals } from "~/components/modals.svelte";
import type {
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
} from "~/graphql/types";
import { DeletePlaylistDocument } from "~/graphql/types";
import { openToast } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;

const deletePlaylist = mutation<
  DeletePlaylistMutation,
  DeletePlaylistMutationVariables
>(DeletePlaylistDocument);

const remove = () => {

  modals.open<Props>({
    component: Confirm,
    props: {
      noClick: () => modals.close(),
      title: "削除しますか？",
      yesClick: async () => {

        try {

          await deletePlaylist({ variables: { input: { playlistId: id } } });

          openToast({
            color: "green",
            duration: 5000,
            message: "プレイリストを削除しました"
          });

        } catch (error) {

          openToast({
            color: "red",
            duration: 5000,
            message: "エラーが発生しました"
          });

        }

        modals.close();
        $goto("/playlist", { pm: "1" });

      }
    }
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
