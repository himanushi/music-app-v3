<script lang="ts">
import { Capacitor } from "@capacitor/core";
import AppleMusicAccount from "~/components/initializers/apple-music-account.svelte";
import CookiePolicy from "~/components/initializers/cookie-policy.svelte";
import Version from "~/components/initializers/version.svelte";
</script>

<Version />
<AppleMusicAccount />
{#if Capacitor.getPlatform() === "web"}
  <CookiePolicy />
{/if}
