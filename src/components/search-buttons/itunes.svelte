<script lang="ts">
import { url } from "@roxi/routify";
import SearchButton from "./search-button.svelte";
import { appleAffiliateToken } from "~/lib/variable";

export let id: string;

let token = "";
if (appleAffiliateToken) {

  token = `&at=${appleAffiliateToken}`;

}
</script>

<SearchButton
  href={$url(`itmss://music.apple.com/jp/album/${id}?app=itunes${token}`)}
>
  iTunes で聴く
</SearchButton>
