import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {head} from 'lodash';
import {useMutation} from '@tanstack/react-query';
import API from 'networkings/api';
import {useAppStore} from 'stores/appStore';
import appStyles from 'themes/appStyles';
import ImageIcons from 'components/ImageIcons';
import Assets from 'assets/images';
import {useTheme} from 'themes/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigationStore} from 'stores/navigationStore';
import Text from 'components/Text';
import {Marquee} from '@animatereactnative/marquee';
import {Constants} from 'utils/constants';
import ListRenderer from 'components/ListRenderer';
import {useVideoPlayer} from 'stores/videoStore';

const generatePage = (array, chunkSize) => {
  let results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

const Albums = ({navigation, route}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {goBack} = useNavigationStore();
  const {setVideo} = useVideoPlayer();
  const {show, hide} = useAppStore();
  const params = route.params;

  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState(undefined);
  const [pages, setPages] = useState(undefined);
  const [renderPage, setRenderPage] = useState(undefined);

  const sizeText = useMemo(() => {
    let size = params.title.length * 10;
    return size > Constants.window.width - 60;
  }, [params.title]);

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

  const mutationGetAlbums = useMutation({
    mutationFn: value => {
      return API.getAlbums({
        videoId: value.videoId,
        playlistId: value.playlistId,
      });
    },
    onSuccess: res => {
      setAlbums(res);
      setPages(generatePage(res, 25));
      setRenderPage(head(generatePage(res, 25)));
    },
    onError: err => {
      console.log('error', err);
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

  useEffect(() => {
    if (params.playlistId && params.videoId) {
      mutationGetAlbums.mutate({
        videoId: params.videoId,
        playlistId: params.playlistId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.playlistId, params.videoId]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={[styles.topView, {borderColor: theme.colors.border}]}>
        <View
          style={[styles.iconLeft, {backgroundColor: theme.colors.background}]}>
          <ImageIcons
            source={Assets.arrowBack}
            color={theme.colors.icon}
            onPress={() => goBack()}
          />
        </View>
        {sizeText ? (
          <Marquee spacing={120} speed={0.5}>
            <Text color={theme.colors.text} fontSize={appStyles.sm} bold>
              {params.title}
            </Text>
          </Marquee>
        ) : (
          <Text color={theme.colors.text} fontSize={appStyles.sm} bold>
            {params.title}
          </Text>
        )}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.videoId || index.toString()}
        data={renderPage || dataPlaceholderList}
        estimatedItemSize={30}
        onEndReached={() => {
          if (albums && albums.length > renderPage.length) {
            setLoading(true);
            let nextPage = pages[renderPage.length / 25];
            setRenderPage(renderPage.concat(nextPage));
          } else {
            setLoading(false);
          }
        }}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <ListRenderer
            isHome={false}
            item={item}
            onPress={value => {
              mutationGetStream.mutate(value.videoId);
            }}
          />
        )}
        ListFooterComponent={
          <View style={styles.listFooter}>
            {loading && (
              <ActivityIndicator size={'large'} color={theme.colors.icon} />
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  topView: {
    ...appStyles.vCenter,
    ...appStyles.hCenter,
    ...appStyles.mBSm,
    height: 60,
    borderBottomWidth: 1,
  },
  iconLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  listFooter: {
    ...appStyles.fullWidth,
    ...appStyles.pTSm,
    height: 120,
  },
});

export default Albums;
