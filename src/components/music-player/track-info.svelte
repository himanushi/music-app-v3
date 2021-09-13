<script lang="ts">
import CenterItem from "~/components/center-item.svelte";
import Image from "~/components/square-image.svelte";
import type { Track } from "~/graphql/types";
import { playerService } from "~/machines/jukebox-machine";

let currentTrack: Track | undefined;

$: ({
  currentTrack, name
} = $playerService.context);
</script>

<CenterItem>
  <Image src={currentTrack?.artworkL?.url} />
</CenterItem>
<ion-item>
  <ion-label class="ion-text-wrap">
    {currentTrack?.name || ""}
  </ion-label>
</ion-item>
