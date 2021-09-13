<script>
export let name: string;
</script>

<ion-item
  button
  href={`https://open.spotify.com/search/${name}`}
  target="_blank"
>
  <ion-icon slot="start" src="/assets/logo-spotify.svg" />
  <ion-label> Spotify で検索 </ion-label>
</ion-item>
