<script lang="ts">
import { accountService } from "~/machines/apple-music-account-machine";

$: if (accountService) {
  accountService.send("CHECKING");
}
</script>
