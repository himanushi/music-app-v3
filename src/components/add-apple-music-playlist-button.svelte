<script lang="ts">
import SettingAppleMusicButton from "./setting-apple-music-button.svelte";
import type { TrackObject } from "~/graphql/types";
import { openToast } from "~/lib/ionic";
import { accountService } from "~/machines/apple-music-account-machine";
import { service } from "~/machines/apple-music-create-playlist";

export let name: string;
export let description: string;
export let tracks: TrackObject[];
let disabled = false;

const addPlaylist = () => {
  disabled = true;

  service.send({
    description,
    name,
    tracks,
    type: "CREATE",
  });
};

$: if ($service.matches("done")) {
  openToast({
    color: "light-green",
    duration: 5000,
    message: "Apple Music にプレイリストを追加しました。",
  });

  disabled = false;
} else if ($service.matches("error")) {
  openToast({
    color: "light-red",
    duration: 5000,
    message: "エラーが発生しました。",
  });

  disabled = false;
}
</script>

{#if tracks.length > 0 && accountService && $accountService.matches("authorized")}
  <ion-item button>
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
    <ion-label {disabled} on:click={addPlaylist}>
      {disabled ? "追加中..." : "Apple Music に追加"}
    </ion-label>
  </ion-item>
{:else}
  <SettingAppleMusicButton
    message="Apple Music にプレイリストを追加するには Apple Music のログインが必須です"
  />
{/if}
