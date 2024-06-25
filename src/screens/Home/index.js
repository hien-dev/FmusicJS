import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {useMutation, useQuery} from '@tanstack/react-query';
import Text from 'components/Text';
import API from 'networkings/api';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import ListRenderer from 'components/ListRenderer';
import {useVideoPlayer} from 'stores/videoStore';
import ImageIcons from 'components/ImageIcons';
import Assets from 'assets/images';
import {useAppStore} from 'stores/appStore';
import {useNavigationStore} from 'stores/navigationStore';
import {SCREEN_NAME} from 'utils/constants';

const Home = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigationStore();
  const {setVideo} = useVideoPlayer();
  const {show, hide, paddingTop, setPaddingTop} = useAppStore();

  const {data} = useQuery({
    queryKey: ['Home-List'],
    queryFn: () => API.getSearchResults({}),
  });

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

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
    if (!paddingTop) {
      setPaddingTop(insets.top);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paddingTop]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View
        style={[
          styles.height60,
          appStyles.row,
          appStyles.spaceBetween,
          appStyles.hCenter,
        ]}>
        <Text bold fontSize={appStyles.md} color={theme.colors.text}>
          Fmusic
        </Text>
        <ImageIcons
          source={Assets.search}
          size={25}
          color={theme.colors.icon}
          onPress={() => {
            navigate(SCREEN_NAME.SEARCH);
          }}
        />
      </View>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={data?.data ?? dataPlaceholderList}
        estimatedItemSize={50}
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
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  height60: {
    height: 60,
  },
  listFooter: {
    ...appStyles.fullWidth,
    height: 80,
  },
});

export default Home;
