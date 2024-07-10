import {useCallback, useMemo} from 'react';
import RealmContext from 'realms/realm';
import VideoRealm from 'realms/videoRealm';

const parseVideo = video => {
  return {
    videoId: video?.videoDetail?.videoId,
    title: video?.videoDetail?.title,
    thumbnail: video?.poster?.url,
  };
};

const useVideoRealm = () => {
  const {useRealm, useQuery} = RealmContext;
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

  const isFavourite = useCallback(
    video => {
      if (video && realm) {
        let pVideo = parseVideo(video);
        let existVideo = realm.objectForPrimaryKey(VideoRealm, pVideo.videoId);
        if (existVideo?.favourite) {
          return true;
        }
      }
      return false;
    },
    [realm],
  );

  const addVideoRealm = useCallback(
    ({video, favourite = false}) => {
      if (video && realm) {
        let pVideo = parseVideo(video);
        let existVideo = realm.objectForPrimaryKey(VideoRealm, pVideo.videoId);
        realm.write(() => {
          if (existVideo) {
            if (favourite) {
              existVideo.favourite = !existVideo.favourite;
            }
          } else {
            realm.create(VideoRealm, pVideo);
          }
        });
      }
    },
    [realm],
  );

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
    addVideoRealm,
    deleteCache,
  };
};

export default useVideoRealm;
