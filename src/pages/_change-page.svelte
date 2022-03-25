<script lang="ts">
// ページ遷移による scrollTop: 0 対策
import { afterPageLoad, beforeUrlChange } from "@roxi/routify";
import { closeModal, isOpenModal } from "~/lib/ionic";
import { googleAnalyticsId } from "~/lib/variable";
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
  if (googleAnalyticsId) {
    window.gtag("set", "page_path", window.location.pathname);
    window.gtag("event", "page_view");
  }
});
</script>
