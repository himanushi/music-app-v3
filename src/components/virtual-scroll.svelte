<script>
// ref: https://github.com/Prinzhorn/better-svelte-virtual-list

import { onMount } from "svelte";
import { scrollElement } from "~/store/scroll-element";

export let items: any[];

const dummySymbol = Symbol("dummy item");
const itemHeight = 60;

let scrollTop: number;
let visibleHeight: number;
let virtualElement: HTMLElement;

const sliceArray = (arr: any[], start: number, end: number) => {

  const sliceArr = arr.slice(start, end);
  const expectedLength = end - start;
  while (sliceArr.length < expectedLength) {

    sliceArr.push(dummySymbol);

  }

  return sliceArr;

};

const shiftArray = (arr: any[], count: number) => {

  for (let index = 0; index < count; index += 1) {

    arr.unshift(arr.pop());

  }
  return arr;

};

$: if ($scrollElement) {

  const maxHeight = items.length * itemHeight;
  if ($scrollElement.clientHeight > maxHeight) {

    visibleHeight = maxHeight;

  } else {

    visibleHeight = $scrollElement.clientHeight;

  }

}
$: spacerHeight = Math.max(visibleHeight, items.length * itemHeight);
$: numItems = Math.ceil(visibleHeight / itemHeight) + 3;
$: startIndex = Math.floor(scrollTop / itemHeight);
$: endIndex = startIndex + numItems;
$: numOverlap = startIndex % numItems;
$: blockHeight = numItems * itemHeight;
$: globalOffset = blockHeight * Math.floor(scrollTop / blockHeight);
$: slice = shiftArray(sliceArray(items, startIndex, endIndex), numOverlap);

onMount(() => {

  let frame: number;

  const loop = () => {

    if (
      virtualElement &&
      $scrollElement &&
      $scrollElement.scrollTop !== scrollTop
    ) {

      if ($scrollElement.scrollTop - virtualElement.offsetTop >= 0) {

        scrollTop = $scrollElement.scrollTop - virtualElement.offsetTop || 1;

      } else {

        scrollTop = 1;

      }

    }
    frame = requestAnimationFrame(loop);

  };

  frame = requestAnimationFrame(loop);

  return () => cancelAnimationFrame(frame);

});
</script>

<div
  class="spacer"
  style="height: {spacerHeight}px;"
  tabindex="-1"
  on:keydown
  on:wheel
  bind:this={virtualElement}
>
  {#each slice as item, index (`${item.id}_${index}`)}
    <div
      class="item"
      style="top: {globalOffset +
        (index < numOverlap ? blockHeight : 0)}px; height: {itemHeight}px;"
    >
      {#if item !== dummySymbol}
        <slot {item} {index} />
      {/if}
    </div>
  {/each}
</div>

<style>
.spacer {
  overflow: hidden;
  width: 100%;
  font-size: 0;
  line-height: 0;
}
.item {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}
</style>
