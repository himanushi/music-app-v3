<script lang="ts">
import Image from "~/components/square-image.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;

$: ({
  currentTrack, name
} = $playerService.context);
</script>

{#key currentTrack?.id}
  <Image src={currentTrack?.artworkL?.url} />

  <ion-item>
    <ion-label class="ion-text-wrap">
      {currentTrack?.name || ""}
    </ion-label>
  </ion-item>
{/key}
