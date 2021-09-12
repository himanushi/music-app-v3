<script lang="ts">
import { cookie } from "~/lib/cookie";
import {
  closeModal, openModal, openToast
} from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";
import CookiePolicy from "~/pages/cookie-policy.svelte";

let cookiePolicy: HTMLElement;

if (cookie.get("cookieNotice") !== "true") {

  openToast({
    buttons: [
      {
        handler: async () => {

          await closeModal();
          await openModal(cookiePolicy);
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

<!-- Modal -->
<span style="display:none">
  <span bind:this={cookiePolicy}>
    <ModalContent>
      <CookiePolicy />
    </ModalContent>
  </span>
</span>
