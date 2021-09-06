<script>
import PlayerController from "./player-controller.svelte";
import SeekBar from "./seek-bar.svelte";
import TrackInfo from "./track-info.svelte";
import Modal from "~/pages/_modal.svelte";
</script>

<Modal>
  <TrackInfo />
  <PlayerController />
  <SeekBar />
</Modal>
