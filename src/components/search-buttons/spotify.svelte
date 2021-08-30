<script>
import SearchButton from "./search-button.svelte";
export let name: string;
</script>

<SearchButton href={`https://open.spotify.com/search/${name}`}>
  Spotify で検索
</SearchButton>
