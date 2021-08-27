<script lang="ts">
import IconButton from "~/components/icon-button.svelte";
import Text from "~/components/text.svelte";
import SearchIcon from "~/icons/search.svelte";
import { closeModal } from "~/lib/ionic";

export let title: string;
export let onClick: () => void;

const click = () => {

  onClick();
  closeModal();

};
</script>

<ion-content>
  <form on:submit|preventDefault>
    <div class="separate">
      <Text class="text-white">{title}</Text>
    </div>
    <slot />
    <IconButton class="w-16 h-16" on:click={click}>
      <SearchIcon class="w-10 h-10 mr-2" />
    </IconButton>
  </form>
</ion-content>
