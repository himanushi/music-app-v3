<script>
import Logo from "~/icons/logo-line.svg";

export let name: string;
name = name.replaceAll(/\s/giu, "+");
</script>

<ion-item
  button
  href={`https://music.line.me/webapp/search/tracks?query=${name}`}
  target="_blank"
>
  <ion-icon slot="start" src={Logo} />
  <ion-label> Line Music で検索 </ion-label>
</ion-item>
