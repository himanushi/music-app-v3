<script lang="ts">
import {
  onDestroy, onMount
} from "svelte";
import { cookie } from "~/lib/cookie";
import { recaptchaKey } from "~/lib/variable";

let widgetId = 0;

const resetCookie = () => cookie.remove("reCAPTCHAv2Token");

export const reset = () => {

  resetCookie();
  grecaptcha.reset(widgetId);

};

const callback = (code: string) => {

  cookie.set("reCAPTCHAv2Token", code, { expires: 1 / 48 });

};

const expiredCallback = () => {

  resetCookie();

};

onMount(() => {

  if (recaptchaKey) {

    resetCookie();
    widgetId = grecaptcha.render("g-recaptcha", {
      callback,
      "expired-callback": expiredCallback,
      sitekey: recaptchaKey,
      theme: "dark"
    });

  }

});

onDestroy(() => {

  resetCookie();

});
</script>

<ion-item>
  <div id="g-recaptcha" />
</ion-item>
