<script lang="ts">
import { onMount } from "svelte";
import { closeModal, openModal, openToast } from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";
import CookiePolicy from "~/pages/cookie-policy.svelte";
import { store } from "~/store/ionic";

let component: HTMLElement;

const notice = async () => {
  const cookieNotice = await store.get("cookieNotice");
  if (!cookieNotice) {
    openToast({
      buttons: [
        {
          handler: async () => {
            await closeModal();
            await openModal({ component });
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
  <span bind:this={component}>
    <ModalContent>
      <CookiePolicy />
    </ModalContent>
  </span>
</span>
