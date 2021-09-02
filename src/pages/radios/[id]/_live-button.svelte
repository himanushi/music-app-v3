<script lang="ts">
import { radioService } from "~/machines/radio-machine";

export let id: string;

let disabled = false;

const live = () => {

  radioService.send({
    id,
    type: "SET_ID"
  });

  disabled = true;
  setTimeout(() => disabled = false, 10000);

};
</script>

<ion-item button detail={false} {disabled} on:click={live}>
  <ion-icon color="red" slot="start" name="radio" />
  <ion-label>ラジオを聴く</ion-label>
</ion-item>
