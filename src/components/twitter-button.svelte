<script>
import { title as pageTitle } from "~/lib/variable";

export let path: string;
export let title: string;
export let hashtags: string[];

// ref: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
const url = `https://video-game-music.net${path}`;
let twitterUrl = "https://twitter.com/intent/tweet";
twitterUrl += `?text=${title} - ${pageTitle}`;
twitterUrl += `&url=${url}`;
twitterUrl += `&hashtags=${hashtags.join(",")}`;
</script>

<ion-button href={twitterUrl} target="_blank">
  <ion-icon name="logo-twitter" />
</ion-button>
