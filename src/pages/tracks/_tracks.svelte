<script lang="ts">
import ItemCard from "./_item-card.svelte";
import Items from "~/components/items.svelte";
import { TracksDocument } from "~/graphql/types";

export let id: string;
export let params: { [key: string]: any } | undefined = undefined;
</script>

<Items
  {id}
  {params}
  type="track"
  document={TracksDocument}
  let:items
  let:item
  let:index
>
  <ItemCard {items} {item} {index} />
</Items>
