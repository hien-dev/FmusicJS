import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {isEmpty} from 'lodash';
import appStyles from 'themes/appStyles';
import Text from 'components/Text';
import {useTheme} from 'themes/index';
import Header from 'components/Header';
import useVideoRealm from 'hooks/useVideoRealm';
import useSafeArea from 'hooks/useSafeAreaInsets';
import RecentlyVideoHorizotal from 'components/RecentlyVideoHorizotal';
import useVideoPlayer from 'hooks/useVideoPlayer';

const History = () => {
  const {paddingTop} = useSafeArea();
  const theme = useTheme();
  const {recentlyPlayed, recentlyPlayed5, favouritePlayed, favouritePlayed5} =
    useVideoRealm();
  const {getVideo} = useVideoPlayer();

  return (
    <View style={[styles.container, paddingTop()]}>
      <Header title={'Recent'} />
      <RecentlyVideoHorizotal
        all={recentlyPlayed}
        mini={recentlyPlayed5}
        onPress={async value => {
          await getVideo(value.videoId);
        }}
      />
      {!isEmpty(recentlyPlayed) ? (
        <>
          <Header title={'My Favourite'} />
          <RecentlyVideoHorizotal
            all={favouritePlayed}
            mini={favouritePlayed5}
            onPress={async value => {
              await getVideo(value.videoId);
            }}
          />
        </>
      ) : (
        <View style={[styles.container, appStyles.hCenter, appStyles.vCenter]}>
          <Text textAlign="center" fontSize={appStyles.sm} medium>
            {'New to our app?\nStart your musical adventure now!'}
          </Text>
          <TouchableOpacity
            style={[styles.nowPlaying, {borderColor: theme.colors.border}]}>
            <Text medium>Now Playing</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flex,
    ...appStyles.pHSm,
  },
  nowPlaying: {
    ...appStyles.hCenter,
    ...appStyles.vCenter,
    ...appStyles.mTMd,
    width: 130,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default History;
