<script lang="ts">
import { setClient } from "svelte-apollo";
import ChangePage from "./_change-page.svelte";
import Content from "./_content.svelte";
import Footer from "./_footer.svelte";
import Header from "./_header.svelte";
import Sidebar from "./_sidebar.svelte";
import Initializer from "~/components/initializers/initializer.svelte";
import Player from "~/components/player.svelte";
import client from "~/graphql/client";

setClient(client);
</script>

<Initializer />
<Header />
<Content>
  <slot />
</Content>
<ChangePage />
<Footer />
<Sidebar />
<Player />
