<script lang="ts">
import { query } from "svelte-apollo";
import { AppleMusicTokenDocument } from "~/graphql/types";
import type { AppleMusicTokenQuery } from "~/graphql/types";
import { accountService } from "~/machines/apple-music-account-machine";

const tokenQuery = query<AppleMusicTokenQuery>(AppleMusicTokenDocument);

let token: string | undefined;

$: if ($tokenQuery?.data?.appleMusicToken) {

  token = $tokenQuery.data.appleMusicToken;

  accountService.send({
    config: {
      app: {
        build: "2.0.1",
        name: "video-game-music.net"
      },
      developerToken: token
    },
    type: "SET_TOKEN"
  });

}
</script>
