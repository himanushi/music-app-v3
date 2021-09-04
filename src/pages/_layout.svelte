<script lang="ts">
import { setClient } from "svelte-apollo";
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
<slot />
<Footer />
<Sidebar />
<Player />
