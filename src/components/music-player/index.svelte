<script>
import PlayerController from "./player-controller.svelte";
import SeekBar from "./seek-bar.svelte";
import TrackInfo from "./track-info.svelte";
import Content from "~/pages/_content.svelte";
</script>

<Content>
  <TrackInfo />
  <PlayerController />
  <SeekBar />
</Content>
