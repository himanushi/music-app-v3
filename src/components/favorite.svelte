<script>
import { createAnimation } from "@ionic/core";
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
let button: HTMLElement;

$: if (me) {

  favorite = isFavorite(me, id);

}

const changeFavorites = mutation<unknown, ChangeFavoritesMutationVariables>(
  ChangeFavoritesDocument
);

const onClick = async () => {

  if (button && !favorite) {

    createAnimation().
      addElement(button).
      duration(300).
      iterations(1).
      easing("steps(28, end)").
      keyframes([
        {
          offset: 0,
          transform: "scale(0.9)"
        },
        {
          offset: 0.7,
          transform: "scale(1.5)"
        },
        {
          offset: 1,
          transform: "scale(0.9)"
        }
      ]).
      play();

  }

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
  <ion-button
    bind:this={button}
    on:click|preventDefault|stopPropagation={onClick}
  >
    {#if favorite}
      <ion-icon name="heart" />
    {:else}
      <ion-icon name="heart-outline" />
    {/if}
  </ion-button>
{/if}
