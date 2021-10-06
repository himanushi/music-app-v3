<script lang="ts">
import AccountButton from "./_account-button.svelte";
import AppleMusicButton from "./_apple-music-button.svelte";
import AppleMusicInfo from "./_apple-music-info.svelte";
import JoinAppleMusicButton from "~/components/join-apple-music-button.svelte";
import { meQuery } from "~/lib/me";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>User Setting</ion-label>
    </ion-item-divider>

    {#if me?.registered}
      <ion-item>
        <ion-label> ユーザーID </ion-label>
        <ion-note color="white" slot="end">
          {me.username}
        </ion-note>
      </ion-item>
      <ion-item>
        <ion-label> 名前 </ion-label>
        <ion-note color="white" slot="end">
          {me.name}
        </ion-note>
      </ion-item>
      <ion-item>
        <ion-label> 権限 </ion-label>
        <ion-note slot="end">
          {me.role.description}
        </ion-note>
      </ion-item>
    {/if}

    <AccountButton />

    <ion-item-divider sticky>
      <ion-label>Music Services</ion-label>
    </ion-item-divider>
    <AppleMusicButton />
    <JoinAppleMusicButton />
    <AppleMusicInfo />
  </ion-item-group>
</ion-list>
