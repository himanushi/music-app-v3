<script lang="ts">
import "./seek-bar.scss";
import RangeSlider from "svelte-range-slider-pips/src/RangeSlider.svelte";
export let value: number;
export let min: number;
export let max: number;
export let formatter: (time: number) => string;
export let disabled = false;
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
  {disabled}
/>
