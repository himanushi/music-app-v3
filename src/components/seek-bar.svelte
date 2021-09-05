<script lang="ts">
import RangeSlider from "svelte-range-slider-pips/src/RangeSlider.svelte";
export let value: number;
export let min: number;
export let max: number;
export let formatter: (time: number) => string;
const id = "seek-bar" as never;

const range = "min" as unknown as boolean;
</script>

<RangeSlider
  {id}
  values={[value]}
  {min}
  {max}
  {formatter}
  float
  hover
  step={100}
  on:change
  on:start
  on:stop
  {range}
/>

<style lang="scss">
:global(.rangeSlider.range.min) {
  background-color: rgba(209, 213, 219);
  :global(.rangeNub) {
    background-color: rgba(20, 184, 166);
  }
  :global(.rangeFloat) {
    background-color: rgba(20, 184, 166);
  }
  :global(.rangeBar) {
    background-color: rgba(20, 184, 166);
  }
}

:global(.rangeSlider.range.min.focus) {
  :global(.rangeNub) {
    background-color: rgba(20, 184, 166);
  }
}
</style>
