import {useCallback, useMemo} from 'react';
import RealmContext from 'realms/realm';
import VideoRealm from 'realms/videoRealm';
import {useVideoState} from 'hooks/useVideoPlayer';

const useVideoRealm = () => {
  const {useRealm, useQuery} = RealmContext;
  const videoState = useVideoState();
  const realm = useRealm();

  const recentlyPlayed = useQuery({
    type: VideoRealm,
    query: e => {
      return e.sorted('createDate', true);
    },
  });

  const recentlyPlayed5 = useMemo(() => {
    return recentlyPlayed.slice(0, 5);
  }, [recentlyPlayed]);

  const favouritePlayed = useMemo(() => {
    return recentlyPlayed.filter(i => i.favourite) || [];
  }, [recentlyPlayed]);

  const favouritePlayed5 = useMemo(() => {
    return (recentlyPlayed.filter(i => i.favourite) || []).slice(0, 5);
  }, [recentlyPlayed]);

  const isFavourite = useCallback(() => {
    if (videoState && videoState.videoId && realm) {
      let existVideo = realm.objectForPrimaryKey(
        VideoRealm,
        videoState.videoId,
      );
      return existVideo?.favourite;
    }
    return false;
  }, [realm, videoState]);

  const updateFavourite = useCallback(() => {
    if (videoState && videoState.videoId && realm) {
      let existVideo = realm.objectForPrimaryKey(
        VideoRealm,
        videoState.videoId,
      );
      if (existVideo) {
        realm.write(() => {
          existVideo.favourite = !existVideo.favourite;
        });
      }
    }
  }, [realm, videoState]);

  const saveVideoRealm = useCallback(() => {
    if (videoState && realm) {
      const {videoId, title, poster} = videoState;
      let existVideo = realm.objectForPrimaryKey(VideoRealm, videoId);
      if (!existVideo) {
        realm.write(() => {
          realm.create(VideoRealm, {
            videoId: videoId,
            title: title,
            poster: poster,
          });
        });
      }
    }
  }, [realm, videoState]);

  const deleteCache = useCallback(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  }, [realm]);

  return {
    recentlyPlayed,
    recentlyPlayed5,
    favouritePlayed,
    favouritePlayed5,
    isFavourite,
    updateFavourite,
    saveVideoRealm,
    deleteCache,
  };
};

export default useVideoRealm;
