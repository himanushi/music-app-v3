<script lang="ts">
export let path: string;
export let text: string;
export let hashtags: string[];

// ref: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
const url = `https://video-game-music.net${path}`;
let twitterUrl = "https://twitter.com/intent/tweet";
twitterUrl += `?text=${text}%0A`;
twitterUrl += `&url=${url}%20%0A`;
twitterUrl += `&hashtags=${hashtags.join(",")}`;
</script>

<ion-button href={twitterUrl} target="_blank">
  <ion-icon name="logo-twitter" />
</ion-button>
