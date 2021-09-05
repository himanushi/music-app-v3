<script lang="ts">
// ページ遷移による scrollTop: 0 対策
import {
  afterPageLoad, beforeUrlChange
} from "@roxi/routify";
import {
  closeModal, isOpenModal
} from "~/lib/ionic";
import { googleAnalyticsId } from "~/lib/variable";
import { currentPath } from "~/store/history";
import { scrollLock } from "~/store/scroll-lock";

const content: HTMLElement | null = document.querySelector(
  "ion-app>ion-content"
);
let scrollContent: HTMLElement | null;

$: if (content) {

  content.getScrollElement().then((element) => {

    scrollContent = element;

  });

}

$beforeUrlChange(() => {

  if (isOpenModal()) {

    closeModal();
    return false;

  }

  if (scrollContent) {

    scrollLock.update($currentPath, scrollContent.scrollTop);

  }

  return true;

});

$afterPageLoad(() => {

  if (scrollContent) {

    scrollContent.scrollTop = $scrollLock[window.location.href] || 0;
    currentPath.set(window.location.href);

  }

  // Google Analytics
  if (googleAnalyticsId) {

    window.ga("set", "page", window.location.pathname);
    window.ga("send", "pageview");

  }

});
</script>
