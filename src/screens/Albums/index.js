import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Text from 'components/Text';
import VerticalList from 'components/VerticalList';
import {MaterialIcons} from 'components/VectorIcons';
import useTheme from 'hooks/useTheme';
import useAlbum from 'hooks/useAlbum';
import useVideoPlayer from 'hooks/useVideoPlayer';
import useSafeArea from 'hooks/useSafeAreaInsets';
import useNavigationState from 'hooks/useNavigationState';
import appStyles from 'utils/appStyles';
import Constants from 'utils/constants';

const Albums = ({route}) => {
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

  useEffect(() => {
    if (params.playlistId && params.videoId) {
      (async () => {
        await onFetch({videoId: params.videoId, playlistId: params.playlistId});
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.playlistId, params.videoId]);

  return (
    <View style={[appStyles.flex, appStyles.pHSm, paddingTop()]}>
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
      <VerticalList
        data={renderPage ?? Constants.placeholderList}
        onEndReached={onEndReached}
        loading={loading}
        onPress={async value => {
          await getVideo(value.videoId, albums);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Albums;
