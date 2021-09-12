<script lang="ts">
import {
  isAllowed, meQuery
} from "~/lib/me";
import { mergeMeta } from "~/lib/merge-meta";
import { accountService as account } from "~/machines/apple-music-account-machine";

const onClick = () => account.send("LOGIN_OR_LOGOUT");

$: meta = mergeMeta<{ label: string }>($account.meta);

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "appleMusicToken")}
  <ion-item button on:click={onClick}>
    <ion-icon color="pink" name="logo-apple" slot="start" />
    <ion-label>
      Apple Music {meta.label}
    </ion-label>
  </ion-item>
{/if}
