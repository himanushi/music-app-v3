<script lang="ts">
import { playerService } from "~/machines/jukebox-machine";

$: color = $playerService.context.repeat ? "main" : "gray";

const repeat = () => {
  playerService.send("REPEAT");
};
</script>

<ion-button {color} shape="round" on:click={repeat}>
  <ion-icon slot="icon-only" name="repeat" />
</ion-button>
