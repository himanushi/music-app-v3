<script context="module">
type listType = {
  text: string;
  onClick: any;
};
</script>

<script lang="ts">
import { fly } from "svelte/transition";
import IconButton from "./icon-button.svelte";
import { modals } from "./modals.svelte";
import Text from "./text.svelte";
import Close from "~/icons/close.svelte";

// export let lists: listType[];

const close = () => modals.close();
</script>

<div
  on:click|stopPropagation
  transition:fly={{
    duration: 400,
    opacity: 100,
    y: document.body.clientHeight
  }}
>
  <div>
    <Text>プレイリストに追加</Text>
  </div>
  <div class="list">
    <ul />
  </div>
  <div class="buttons">
    <IconButton on:click={close} class="w-10 h-10">
      <Close class="w-10 h-10" />
    </IconButton>
  </div>
</div>
