<script lang="ts">
import {
  onDestroy, onMount
} from "svelte";
import { scrollElement } from "~/store/scroll-element";
import { initItems } from "~/store/virtual-list";

export let id: string;
export let items: any[];

const key = `${id}:${window.location.href}`;

let start: number | undefined = undefined;
let end: number = 0;

let itemHeight: number = 0;
let listElement: HTMLElement;
let viewItems: any[] = [];

$: if (start === undefined && $initItems[key] === undefined) {

  viewItems = items;

} else if (start === undefined && $initItems[key]) {

  viewItems = items.slice($initItems[key].start, $initItems[key].end);

} else {

  viewItems = items.slice(start, end);

}

const setItemHeight = () => {

  const firstIonItem = listElement.querySelector("ion-item");
  if (firstIonItem) {

    itemHeight = firstIonItem.clientHeight;

  }

};

// eslint-disable-next-line max-lines-per-function
const render = () => {

  if ($scrollElement && listElement && items.length > 0) {

    if (itemHeight === 0) {

      setItemHeight();

    }

    /**
     *    |---------------------------|
     *    |content                    |
     *    |                           |
     *    | |-----------------------| |
     *    | | list                  | |
     *    | |                       | |
     *    | | |-------------------| | |
     *    | | | items             | | |
     *    | | |                   | | |
     *    | | | |---------------| | | |
     *    | | | |item           | | | |
     *    | | | |---------------| | | |
     *    | | |                   | | |
     *    | | |-------------------| | |
     *    | |                       | |
     *    | |-----------------------| |
     *    |                           |
     *    |---------------------------|
     */

    const listHeight = items.length * itemHeight;
    const listTop = listElement.offsetTop;
    const listBottom = listTop + listHeight;

    const contentHeight = $scrollElement.clientHeight;
    const contentTop = $scrollElement.scrollTop;
    const contentBottom = contentTop + contentHeight;

    // 全消し
    const invisible = contentBottom < listTop || listBottom < contentTop;

    if (invisible) {

      // list が content 外にあるため全非表示
      listElement.style.paddingTop = `${listHeight}px`;
      start = 0;
      end = 0;
      initItems.update(key, start, end);

    } else {

      // list が content 内にあるため一部表示

      const paddingCount = 5;

      const viewTop = contentTop < listTop ? listTop : contentTop;
      const viewBottom =
        contentBottom > listBottom ? listBottom : contentBottom;
      const viewHeight = viewBottom - viewTop;

      let paddingTop = 0;
      if (contentTop > listTop) {

        const prevStart = start;
        start = Math.floor((contentTop - listTop) / itemHeight);
        if (prevStart && prevStart > start) {

          // 戻る場合
          console.log("もどる");
          start -= 1;
          paddingTop = itemHeight * (start + 2);

        } else {

          // 進む場合
          console.log("進む");
          paddingTop = itemHeight * start;

        }

      } else {

        start = 0;

      }

      end = start + Math.floor(viewHeight / itemHeight) + paddingCount;

      initItems.update(key, start, end);

      const paddingBottom = (items.length - end) * itemHeight;
      listElement.style.paddingTop = `${paddingTop}px`;
      listElement.style.paddingBottom = `${paddingBottom}px`;

    }

  }

};

const scrollEvent = () => {

  render();

};

let ready = false;

$: if ($scrollElement && listElement && ready) {

  ready = false;
  $scrollElement.addEventListener("scroll", scrollEvent);
  render();

}

onMount(() => {

  ready = true;

});

onDestroy(() => {

  if ($scrollElement) {

    $scrollElement.removeEventListener("scroll", scrollEvent);

  }

});
</script>

<div bind:this={listElement}>
  {#each viewItems as item, index (item.id)}
    <slot {items} {item} {index} />
  {/each}
</div>
