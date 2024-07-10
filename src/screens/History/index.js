import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {isEmpty} from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import appStyles from 'themes/appStyles';
import Text from 'components/Text';
import {useTheme} from 'themes/index';
import {FlatList} from 'react-native-gesture-handler';
import RecentlyVideo from 'components/RecentlyVideo';
import Header from 'components/Header';
import useVideoRealm from 'hooks/useVideoRealm';

const HorizontalList = ({mini, all, onPress}) => {
  const theme = useTheme();
  return (
    <View>
      <FlatList
        data={mini}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item?.videoId || index.toString()}
        renderItem={({item, index}) => (
          <RecentlyVideo
            key={item.videoId ?? index.toString()}
            item={item}
            onPress={onPress}
          />
        )}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
      {all.length > 3 && (
        <TouchableOpacity style={styles.seeAll}>
          <Text fontSize={appStyles.xxs} color={theme.primaryColors.cyanBlue}>
            See All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const History = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {recentlyPlayed, recentlyPlayed5, favouritePlayed, favouritePlayed5} =
    useVideoRealm();

  // if (isEmpty(recentlyPlayed)) {
  //   return (
  //     <View
  //       style={[
  //         styles.container,
  //         appStyles.hCenter,
  //         appStyles.vCenter,
  //         {paddingTop: insets.top},
  //       ]}>
  //       <TouchableOpacity style={styles.nowPlaying}>
  //         <Text medium>Now Playing</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Header title={'Recent'} />
      <HorizontalList
        all={recentlyPlayed}
        mini={recentlyPlayed5}
        onPress={async value => {
          // await videoState.fetch({videoId: value.videoId})
        }}
      />
      {!isEmpty(recentlyPlayed) ? (
        <>
          <Header title={'My Favourite'} />
          <HorizontalList
            all={favouritePlayed}
            mini={favouritePlayed5}
            onPress={async value => {
              // await videoState.fetch({videoId: value.videoId})
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
  seeAll: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default History;
