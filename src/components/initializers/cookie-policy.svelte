<script lang="ts">
import { goto } from "@roxi/routify";

import { cookie } from "~/lib/cookie";
import { openToast } from "~/lib/ionic";

if (cookie.get("cookieNotice") !== "true") {

  openToast({
    buttons: [
      {
        handler: () => {

          $goto("/cookie-policy");
          return false;

        },
        text: "確認"
      },
      {
        handler: () => {

          cookie.set("cookieNotice", "true");
          return true;

        },
        text: "OK"
      }
    ],
    color: "blue",
    header: "クッキーポリシー",
    message:
      "当サービスを利用することにより、当サービスのクッキーポリシーに記載されたクッキーの使用に同意することとみなされます。確認ボタンでクッキーポリシーを確認できます。",
    position: "bottom"
  });

}
</script>
