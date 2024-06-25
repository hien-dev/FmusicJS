import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
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

const Albums = ({navigation, route}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {goBack} = useNavigationStore();
  const {show, hide} = useAppStore();
  const {playlistId, videoId, title} = route.params;

  const sizeText = useMemo(() => {
    let size = title.length * 10;
    return size > Constants.window.width - 60;
  }, [title]);

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
          <Marquee spacing={120} speed={1}>
            <Text color={theme.colors.text} fontSize={appStyles.sm} bold>
              {title}
            </Text>
          </Marquee>
        ) : (
          <Text color={theme.colors.text} fontSize={appStyles.sm} bold>
            {title}
          </Text>
        )}
      </View>
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
});

export default Albums;
