<script lang="ts">
import ItemCard from "./_item-card.svelte";
import Items from "~/components/items.svelte";
import { PlaylistsDocument } from "~/graphql/types";

export let params: { [key: string]: any } | undefined = undefined;
export let variables: any | undefined = undefined;
export let loaded: boolean = false;
</script>

<Items
  {params}
  {variables}
  type="playlist"
  document={PlaylistsDocument}
  bind:loaded
  let:item
>
  <ItemCard {item} />
</Items>
