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
  href={$url(`https://music.apple.com/jp/album/${id}?app=music${token}`)}
>
  Apple Music で聴く
</SearchButton>
