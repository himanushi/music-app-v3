<script lang="ts">
import { onMount } from "svelte";
import { cookie } from "~/lib/cookie";
import { closeModal, openModal, openToast } from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";
import CookiePolicy from "~/pages/cookie-policy.svelte";
import { store } from "~/store/ionic";

let cookiePolicy: HTMLElement;

const notice = async () => {
  // TODO: 2022/10/1 に消す
  if (cookie.get("cookieNotice") === "true") {
    cookie.remove("cookieNotice");
    await store.set("cookieNotice", true);
  }

  const cookieNotice = await store.get("cookieNotice");

  if (!cookieNotice) {
    openToast({
      buttons: [
        {
          handler: async () => {
            await closeModal();
            await openModal(cookiePolicy);
            return false;
          },
          text: "確認",
        },
        {
          handler: async () => {
            await store.set("cookieNotice", true);
            return true;
          },
          text: "OK",
        },
      ],
      color: "light-blue",
      header: "クッキーポリシー",
      message:
        "当サービスを利用することにより、当サービスのクッキーポリシーに記載されたクッキーの使用に同意することとみなされます。確認ボタンでクッキーポリシーを確認できます。",
      position: "bottom",
    });
  }
};

onMount(() => {
  notice();
});
</script>

<!-- Modal -->
<span style="display:none">
  <span bind:this={cookiePolicy}>
    <ModalContent>
      <CookiePolicy />
    </ModalContent>
  </span>
</span>
