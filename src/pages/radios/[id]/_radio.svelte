<script lang="ts">
import { query } from "svelte-apollo";
import DeleteButton from "./_delete-button.svelte";
import LiveButton from "./_live-button.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import SettingAppleMusicButton from "~/components/setting-apple-music-button.svelte";
import Image from "~/components/square-image.svelte";
import { RadioDocument } from "~/graphql/types";
import type {
  Radio, RadioQuery
} from "~/graphql/types";
import { accountService } from "~/machines/apple-music-account-machine";

export let id = "";

const radioQuery = query<RadioQuery>(RadioDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

let radio: Radio;
let isMine = false;

let first = true;
$: if ($radioQuery?.data && first) {

  radio = $radioQuery?.data.radio as Radio;
  isMine = Boolean(radio.isMine);
  first = false;

}
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Radio</ion-label>
  </ion-item-divider>

  <Image src={radio?.track?.artworkL.url} />
  {#if radio}
    <ion-item>
      <ion-label class="ion-text-wrap">
        {radio.name}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap">
        {radio.description}
      </ion-label>
    </ion-item>
  {:else}
    <LoadingItems count={2} />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Live</ion-label>
  </ion-item-divider>
  {#if accountService && $accountService.matches("authorized")}
    <LiveButton {id} />
  {:else}
    <SettingAppleMusicButton
      message="ラジオを聴くには Apple Music のログインが必須です"
    />
  {/if}
</ion-item-group>
