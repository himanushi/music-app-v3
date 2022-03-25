<script lang="ts">
// ページ遷移による scrollTop: 0 対策
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { afterPageLoad, beforeUrlChange } from "@roxi/routify";
import { closeModal, isOpenModal } from "~/lib/ionic";
import { currentPath } from "~/store/history";
import { scrollLock } from "~/store/scroll-lock";

export let scrollElement: HTMLElement | null;

$beforeUrlChange(() => {
  if (isOpenModal()) {
    closeModal();
    return false;
  }

  if (scrollElement) {
    scrollLock.update($currentPath, scrollElement.scrollTop);
  }

  return true;
});

$afterPageLoad(() => {
  if (scrollElement) {
    scrollElement.scrollTop = $scrollLock[window.location.href] || 0;
    currentPath.set(window.location.href);
  }

  // Google Analytics
  const page_view = {
    name: "page_view",
    params: {
      page_path: window.location.pathname,
    },
  };
  console.log({ ...page_view });
  FirebaseAnalytics.logEvent(page_view);
});
</script>
