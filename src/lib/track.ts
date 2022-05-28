import { store } from "~/store/ionic";

const key = "track-ids";

type TrackIds = {
  [key in string]: string;
};

export const getLibraryTrackId = async (appleMusicId: string) => {
  const trackIds = await store.get<TrackIds>(key);
  if (!trackIds) {
    return null;
  }

  return trackIds[appleMusicId];
};

export const setLibraryTrackIds = async (newTrackIds: TrackIds) => {
  const trackIds = await store.get<TrackIds>(key);
  if (!trackIds) {
    await store.set(key, newTrackIds);
    return;
  }

  await store.set(key, {
    ...trackIds,
    ...newTrackIds,
  });
};
