import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import API from 'networkings/api';
import {useAppStore} from 'stores/appStore';

const Albums = ({navigation, route}) => {
  const {playlistId, videoId} = route.params;
  const {show, hide} = useAppStore();

  const mutationGetAlbums = useMutation({
    mutationFn: value => {
      return API.getAlbums({
        videoId: value.videoId,
        playlistId: value.playlistId,
      });
    },
    onSuccess: res => {},
  });

  useEffect(() => {
    if (playlistId && videoId) {
      mutationGetAlbums.mutate({videoId, playlistId});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId, videoId]);

  return <View />;
};

export default Albums;
