<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputCheckbox from "~/components/input-checkbox.svelte";
import InputDate from "~/components/input-date.svelte";
import InputText from "~/components/input-item.svelte";
import Messages from "~/components/messages.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type { PlaylistConditionInputObject } from "~/graphql/types";
import type {
  UpsertPlaylistMutationVariables,
  UpsertPlaylistMutation,
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openLoading } from "~/lib/ionic";

const upsertPlaylist = mutation<
  UpsertPlaylistMutation,
  UpsertPlaylistMutationVariables
>(UpsertPlaylistDocument);

let name = "";
let description = "";
let isCondition = false;
let messages: Record<string, string[]> = {};
let disabled = false;

// conditions
const order = "POPULARITY";
const asc = true;
let conditionFavorite = false;
let minPopularity = "";
let maxPopularity = "";
let fromReleaseDate = "";
let toReleaseDate = "";

const create = async () => {
  disabled = true;

  const conditions: PlaylistConditionInputObject = {
    asc,
    favorite: conditionFavorite,
    fromReleaseDate: fromReleaseDate === "" ? undefined : fromReleaseDate,
    maxPopularity: parseInt(maxPopularity, 10),
    minPopularity: parseInt(minPopularity, 10),
    order,
    toReleaseDate: toReleaseDate === "" ? undefined : toReleaseDate,
  };

  try {
    await openLoading();

    await upsertPlaylist({
      variables: {
        input: {
          conditions: isCondition ? conditions : undefined,
          description,
          isCondition,
          name,
          publicType: "NON_OPEN",
          trackIds: [],
        },
      },
    });

    $goto("/playlist", { pm: "1" });
  } catch (error) {
    disabled = false;

    if (error instanceof ApolloError) {
      messages = errorMessages(error);
    }
  } finally {
    await closeLoading();
  }
};
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Playlist</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputText
        label="タイトル"
        bind:value={name}
        errorMessages={messages.name}
      />

      <InputText
        label="説明"
        bind:value={description}
        errorMessages={messages.description}
      />

      <InputCheckbox
        label="条件プレイリストにする"
        bind:checked={isCondition}
        lines="none"
      />

      <ion-item>
        <ion-icon name="information-circle-outline" slot="start" color="blue" />
        <ion-label class="ion-text-wrap">
          条件を設定して自動で選曲します
        </ion-label>
      </ion-item>

      {#if isCondition}
        <InputCheckbox
          label="お気に入りした曲"
          bind:checked={conditionFavorite}
          lines="none"
        />
        <ion-item>
          <ion-label class="ion-text-wrap">
            プレイリスト作成者のお気に入りが選曲されます
          </ion-label>
        </ion-item>
        <InputText
          label="人気度"
          bind:value={minPopularity}
          type="number"
          errorMessages={messages.minPopularity}
          placeholder="0"
          autocomplete="off"
          lines="none"
        />
        <InputText
          label="〜"
          bind:value={maxPopularity}
          type="number"
          errorMessages={messages.maxPopularity}
          placeholder="1000"
          autocomplete="off"
        />
        <ion-item lines="none">
          <ion-label class="ion-text-wrap"> 配信日 </ion-label>
        </ion-item>
        <InputDate
          bind:value={fromReleaseDate}
          errorMessages={messages.fromReleaseDate}
        />
        <ion-item lines="none">
          <ion-label class="ion-text-wrap"> 〜 </ion-label>
        </ion-item>
        <InputDate
          bind:value={toReleaseDate}
          errorMessages={messages.toReleaseDate}
        />
      {/if}

      <Messages type="error" messages={messages.publicType} />

      <ion-item {disabled} button on:click={create} lines="full">
        <ion-icon name="add" slot="start" />
        保存
      </ion-item>
      <Messages type="error" messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>
