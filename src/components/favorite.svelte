<script lang="ts">
import { createAnimation } from "@ionic/core";
import { mutation } from "svelte-apollo";
import type { Mutable } from "~/@types/extends";
import { ChangeFavoritesDocument } from "~/graphql/types";
import type {
  ChangeFavoritesMutationVariables,
  ChangeFavoritesInput,
} from "~/graphql/types";
import { isAllowed, isFavorite, meQuery } from "~/lib/me";

export let id: string;
export let type: "album" | "artist" | "track" | "playlist";

const query = meQuery();
$: me = $query?.data?.me;

let favorite = false;
let icon: any;

$: if (me) {
  favorite = isFavorite(me, id);
}

const changeFavorites = mutation<unknown, ChangeFavoritesMutationVariables>(
  ChangeFavoritesDocument
);

const onClick = async () => {
  if (icon && !favorite) {
    createAnimation().
      addElement(icon).
      duration(300).
      iterations(1).
      easing("steps(20, end)").
      keyframes([
        {
          offset: 0,
          transform: "scale(0.9)",
        },
        {
          offset: 0.7,
          transform: "scale(1.5)",
        },
        {
          offset: 1,
          transform: "scale(0.9)",
        },
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
    size="large"
    bind:this={icon}
    on:click|preventDefault|stopPropagation={onClick}
  >
    {#if favorite}
      <ion-icon slot="icon-only" color="red" name="heart" />
    {:else}
      <ion-icon slot="icon-only" name="heart-outline" />
    {/if}
  </ion-button>
{/if}
