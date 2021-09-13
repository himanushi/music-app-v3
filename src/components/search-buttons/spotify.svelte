<script>
import Logo from "~/icons/logo-spotify.svg";
export let name: string;
</script>

<ion-item
  button
  href={`https://open.spotify.com/search/${name}`}
  target="_blank"
>
  <ion-icon slot="start" src={Logo} />
  <ion-label> Spotify で検索 </ion-label>
</ion-item>
