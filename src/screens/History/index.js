import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {isEmpty} from 'lodash';
import appStyles from 'utils/appStyles';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import Header from 'components/Header';
import useVideoRealm from 'hooks/useVideoRealm';
import useSafeArea from 'hooks/useSafeAreaInsets';
import HorizotalList from 'components/HorizotalList';
import useVideoPlayer from 'hooks/useVideoPlayer';

const History = () => {
  const {paddingTop} = useSafeArea();
  const theme = useTheme();
  const {recentlyPlayed, favouritePlayed} = useVideoRealm();
  const {getVideo} = useVideoPlayer();

  if (recentlyPlayed || favouritePlayed) {
    return (
      <View style={[appStyles.pHSm, paddingTop()]}>
        {!isEmpty(recentlyPlayed) && (
          <>
            <Header title={'Recent'} />
            <HorizotalList
              data={recentlyPlayed}
              onPress={async value => {
                await getVideo(value.videoId);
              }}
            />
          </>
        )}
        {!isEmpty(favouritePlayed) && (
          <>
            <Header title={'Favourite'} />
            <HorizotalList
              data={favouritePlayed}
              onPress={async value => {
                await getVideo(value.videoId);
              }}
            />
          </>
        )}
      </View>
    );
  }

  return (
    <View style={[appStyles.flex, appStyles.hCenter, appStyles.vCenter]}>
      <Text textAlign="center" fontSize={appStyles.sm} medium>
        {'New to our app?\nStart your musical adventure now!'}
      </Text>
      <TouchableOpacity
        style={[styles.nowPlaying, {borderColor: theme.colors.border}]}>
        <Text medium>Now Playing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
