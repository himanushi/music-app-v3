<script lang="ts">
import ItemCard from "./_item-card.svelte";
import Items from "~/components/items.svelte";
import { AlbumsDocument } from "~/graphql/types";

export let params: { [key: string]: any } | undefined = undefined;
export let variables: any | undefined = undefined;
export let loaded: boolean = false;
export let virtual: boolean = false;
</script>

<Items
  {params}
  {variables}
  {virtual}
  type="album"
  document={AlbumsDocument}
  bind:loaded
  let:item
>
  <ItemCard {item} />
</Items>
