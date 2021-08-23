<script>
import { mutation } from "svelte-apollo";
import type { Mutable } from "~/@types/extends";
import { ChangeFavoritesDocument } from "~/graphql/types";
import type {
  ChangeFavoritesMutationVariables,
  ChangeFavoritesInput
} from "~/graphql/types";
import {
  isAllowed, isFavorite, meQuery
} from "~/lib/me";

export let id: string;
export let type: "album" | "artist" | "track" | "playlist" | "radio";

const query = meQuery();
$: me = $query?.data?.me;

let favorite = false;

$: if (me) {

  favorite = isFavorite(me, id);

}

const changeFavorites = mutation<unknown, ChangeFavoritesMutationVariables>(
  ChangeFavoritesDocument
);

const onClick = async () => {

  const input: Mutable<ChangeFavoritesInput> = { favorite: !favorite };

  if (type === "album") {

    input.albumIds = [id];

  } else if (type === "artist") {

    input.artistIds = [id];

  } else if (type === "track") {

    input.trackIds = [id];

  } else if (type === "playlist") {

    input.playlistIds = [id];

  }

  await changeFavorites({ variables: { input } });

};
</script>

{#if me && isAllowed(me, "changeFavorites")}
  <ion-button on:click|preventDefault|stopPropagation={onClick}>
    {#if favorite}
      <ion-icon name="heart" />
    {:else}
      <ion-icon name="heart-outline" />
    {/if}
  </ion-button>
{/if}
