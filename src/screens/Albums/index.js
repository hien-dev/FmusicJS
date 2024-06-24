import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import API from 'networkings/api';
import {useLoading} from 'stores/appStore';

const Albums = ({navigation, route}) => {
  const {playlistId, videoId} = route.params;
  const {show, hide} = useLoading();

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
  });

  return <View />;
};

export default Albums;
