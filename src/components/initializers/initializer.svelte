<script lang="ts">
import { Capacitor } from "@capacitor/core";
import GoogleAnalytics from "./google-analytics.svelte";
import AppleMusicNativeAccount from "~/components/initializers/apple-music-native-account.svelte";
import AppleMusicWebAccount from "~/components/initializers/apple-music-web-account.svelte";
import CookiePolicy from "~/components/initializers/cookie-policy.svelte";
import Version from "~/components/initializers/version.svelte";
import PreloadLibraryAlbums from "~/components/initializers/preload-library-albums.svelte";
</script>

<Version />
<!-- <PreloadLibraryAlbums /> -->
{#if Capacitor.getPlatform() === "web"}
  <AppleMusicWebAccount />
  <CookiePolicy />
  <GoogleAnalytics />
{:else}
  <AppleMusicNativeAccount />
{/if}
