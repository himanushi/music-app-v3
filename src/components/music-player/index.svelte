<script>
import PlayerController from "./player-controller.svelte";
import SeekBar from "./seek-bar.svelte";
import TrackInfo from "./track-info.svelte";
import ModalContent from "~/pages/_modal-content.svelte";
</script>

<ModalContent>
  <TrackInfo />
  <PlayerController />
  <SeekBar />
</ModalContent>
