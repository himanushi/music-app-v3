<script>
import { define } from "~/lib/customElement";
import AlbumMenu from "~/pages/albums/_album-menu.svelte";
import AlbumsSearch from "~/pages/albums/_search-detail.svelte";

define("page-albums-menu", AlbumMenu);
define("modal-albums-search", AlbumsSearch);
</script>
