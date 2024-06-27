import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation} from '@tanstack/react-query';
import {isEmpty} from 'lodash';
import Assets from 'assets/images';
import ImageIcons from 'components/ImageIcons';
import ListRenderer from 'components/ListRenderer';
import API from 'networkings/api';
import {useNavigationStore} from 'stores/navigationStore';
import {useVideoPlayer} from 'stores/videoStore';
import {useAppStore} from 'stores/appStore';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {Constants, SCREEN_NAME} from 'utils/constants';

const Search = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {setVideo} = useVideoPlayer();
  const {goBack, navigate} = useNavigationStore();
  const {show, hide} = useAppStore();
  const ref = useRef(null);
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [continuation, setContinuation] = useState(undefined);

  const mutationGetSearch = useMutation({
    mutationFn: query => {
      show();
      return API.getSearchResults({query});
    },
    onSuccess: res => {
      hide();
      if (ref) {
        ref.current?.scrollToOffset(0);
      }
      setVideos(res?.data ?? []);
      setContinuation(res?.continuation);
    },
    onError: err => {
      hide();
      console.log('error', err);
    },
  });

  const mutationNextSearch = useMutation({
    mutationFn: value => API.getSearchResults({query: '', continuation: value}),
    onSuccess: res => {
      setVideos(videos.concat(res?.data ?? []));
      setContinuation(res?.continuation);
    },
  });

  const mutationGetStream = useMutation({
    mutationFn: videoId => {
      show();
      return API.getStream(videoId);
    },
    onSuccess: res => {
      hide();
      setVideo(res);
    },
    onError: err => {
      hide();
      console.log('error', err);
    },
  });

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={[styles.topView, {borderColor: theme.colors.border}]}>
        <ImageIcons
          source={Assets.arrowBack}
          color={theme.colors.icon}
          onPress={() => goBack()}
        />
        <View style={styles.inputView}>
          <TextInput
            value={searchText}
            placeholder="Search"
            placeholderTextColor={theme.primaryColors.gray76}
            onChangeText={value => setSearchText(value)}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (!isEmpty(searchText)) {
                mutationGetSearch.mutate(searchText);
              }
            }}
            style={[
              appStyles.full,
              appStyles.pHSm,
              styles.radius,
              {backgroundColor: theme.primaryColors.midLightGrey},
            ]}
          />
        </View>
      </View>
      {!isEmpty(videos) && (
        <FlatList
          ref={ref}
          showsVerticalScrollIndicator={false}
          data={videos}
          estimatedItemSize={30}
          onEndReached={() => {
            if (!isEmpty(continuation)) {
              mutationNextSearch.mutate(continuation);
            }
          }}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <ListRenderer
              item={item}
              index={index}
              onPress={value => {
                if (value?.playlistId) {
                  navigate(SCREEN_NAME.ALBUMS, {
                    videoId: value?.videoId,
                    playlistId: value?.playlistId,
                    title: value?.title,
                  });
                  return;
                }
                mutationGetStream.mutate(value.videoId);
              }}
            />
          )}
          ListFooterComponent={
            <View style={styles.listFooter}>
              {mutationNextSearch.isPending && (
                <ActivityIndicator size={'large'} color={theme.colors.icon} />
              )}
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  topView: {
    ...appStyles.row,
    ...appStyles.spaceBetween,
    ...appStyles.hCenter,
    ...appStyles.mBSm,
    height: 60,
    borderBottomWidth: 1,
  },
  inputView: {
    width: Constants.window.width - 28 - 30,
    height: 35,
  },
  radius: {
    borderRadius: 40,
  },
  listFooter: {
    ...appStyles.fullWidth,
    ...appStyles.pTSm,
    height: 120,
  },
});

export default Search;
