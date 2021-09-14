import { query } from "svelte-apollo";
import { MeDocument } from "~/graphql/types";
import type { ActionEnum } from "~/graphql/types";
import type {
  CurrentUser, MeQuery
} from "~/graphql/types";

export const isAllowed = (
  me: CurrentUser,
  actionName: ActionEnum | ActionEnum[]
) => {

  if (typeof actionName === "string") {

    return me.role.allowedActions.includes(actionName);

  }

  return actionName.every((action) => me.role.allowedActions.includes(action));

};

export const isFavorite = (me: CurrentUser, id: string) => {

  const favoriteIds = [
    ...me.favorite.artistIds,
    ...me.favorite.albumIds,
    ...me.favorite.trackIds,
    ...me.favorite.playlistIds,
    ...me.favorite.radioIds
  ];

  return favoriteIds.includes(id);

};

export const meQuery = () => query<MeQuery>(MeDocument, { fetchPolicy: "cache-first" });
