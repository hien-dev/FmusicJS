import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import appStyles from 'utils/appStyles';
import ListRenderer from 'components/ListRenderer';
import useVideoPlayer from 'hooks/useVideoPlayer';
import useNavigationState from 'hooks/useNavigationState';
import {SCREEN_NAME} from 'utils/constants';
import Header from 'components/Header';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useHome from 'hooks/useHome';

const Home = () => {
  const areaInsets = useSafeAreaInsets();
  const {navigate} = useNavigationState();
  const {insets, setInsets, paddingTop} = useSafeArea();

  const {data} = useHome();
  const {getVideo} = useVideoPlayer();

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

  useEffect(() => {
    if (!insets) {
      setInsets(areaInsets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insets]);

  return (
    <View style={[styles.container, paddingTop()]}>
      <Header
        title={'Fmusic'}
        iconName={'search'}
        onPress={() => {
          navigate(SCREEN_NAME.SEARCH);
        }}
      />
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
              getVideo(value.videoId);
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
