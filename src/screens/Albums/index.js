import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import appStyles from 'utils/appStyles';
import useTheme from 'hooks/useTheme';
import Text from 'components/Text';
import {Marquee} from '@animatereactnative/marquee';
import {Constants} from 'utils/constants';
import ListRenderer from 'components/ListRenderer';
import useVideoPlayer from 'hooks/useVideoPlayer';
import {MaterialIcons} from 'components/VectorIcons';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useAlbum from 'hooks/useAlbum';
import useNavigationState from 'hooks/useNavigationState';

const Albums = ({navigation, route}) => {
  const theme = useTheme();
  const {paddingTop} = useSafeArea();
  const {goBack} = useNavigationState();
  const {getVideo} = useVideoPlayer();
  const {albums, renderPage, loading, onFetch, onEndReached} = useAlbum();
  const params = route.params;

  const sizeText = useMemo(() => {
    let size = params.title.length * 10;
    return size > Constants.window.width - 60;
  }, [params.title]);

  const dataPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);

  useEffect(() => {
    if (params.playlistId && params.videoId) {
      (async () => {
        await onFetch({videoId: params.videoId, playlistId: params.playlistId});
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.playlistId, params.videoId]);

  return (
    <View style={[styles.container, paddingTop()]}>
      <View style={[styles.topView, {borderColor: theme.colors.border}]}>
        <View
          style={[styles.iconLeft, {backgroundColor: theme.colors.background}]}>
          <MaterialIcons
            name={'arrow-back-ios-new'}
            size={24}
            onPress={() => goBack()}
          />
        </View>
        {sizeText ? (
          <Marquee spacing={120} speed={0.5}>
            <Text fontSize={appStyles.sm} bold>
              {params.title}
            </Text>
          </Marquee>
        ) : (
          <Text fontSize={appStyles.sm} bold>
            {params.title}
          </Text>
        )}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.videoId || index.toString()}
        data={renderPage || dataPlaceholderList}
        estimatedItemSize={30}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <ListRenderer
            isAlbum
            item={item}
            onPress={async value => {
              await getVideo(value.videoId, albums);
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
