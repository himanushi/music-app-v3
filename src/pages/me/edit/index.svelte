<script lang="ts">
import Edit from "./_edit.svelte";
import {
  isAllowed, meQuery
} from "~/lib/me";
import Content from "~/pages/_content.svelte";

const mq = meQuery();
$: me = $mq?.data?.me;
</script>

<Content>
  {#if me && me.registered && isAllowed(me, "updateMe")}
    <Edit name={me.name} />
  {/if}
</Content>
