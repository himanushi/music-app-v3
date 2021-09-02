<script lang="ts">
import Radio from "./_radio.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

export let id = "";

const query = meQuery();
$: me = $query?.data?.me;
</script>

<Content>
  {#if me && isAllowed(me, "radio")}
    <Radio {id} />
  {/if}
</Content>
