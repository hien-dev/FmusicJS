import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import Assets from 'assets/images';
import Text from 'components/Text';
import ImageIcons from 'components/ImageIcons';
import {useTheme} from 'themes/index';
import appStyles from 'themes/appStyles';
import {Constants} from 'utils/constants';

const VideoPlayer = ({
  videoDetail,
  sourceVideo,
  poster,
  expandedVideo,
  cancel,
}) => {
  const theme = useTheme();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showNotiControls, setShowNotiControls] = useState(false);
  const [paused, setPaused] = useState(true);

  const animationVideoContentStyle = () => {
    return {
      width: expandedVideo ? '100%' : 70,
      height: expandedVideo ? 220 : 50,
      marginTop: expandedVideo ? 20 : 0,
      borderWidth: expandedVideo ? 3 : 1,
      borderColor: theme.colors.border,
    };
  };

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[
        styles.videoContainer,
        !expandedVideo && appStyles.row,
        !expandedVideo && appStyles.hCenter,
      ]}>
      <Animated.View
        style={[styles.videoContent, animationVideoContentStyle()]}>
        {videoDetail && sourceVideo && (
          <Video
            ref={videoRef}
            source={sourceVideo}
            poster={poster}
            paused={paused}
            resizeMode={'stretch'}
            posterResizeMode={'stretch'}
            ignoreSilentSwitch={'ignore'}
            playWhenInactive={true}
            playInBackground={false}
            showNotificationControls={showNotiControls}
            style={styles.video}
            onLoadStart={e => {
              setShowNotiControls(false);
              setLoading(true);
            }}
            onEnd={() => {
              setPaused(true);
            }}
            onReadyForDisplay={() => {
              setShowNotiControls(true);
              setPaused(false);
            }}
            onProgress={e => {}}
            onPlaybackRateChange={e => {
              setPaused(e.playbackRate === 0);
            }}
            onBuffer={e => {
              setLoading(e.isBuffering);
            }}
          />
        )}
      </Animated.View>
      {videoDetail && (
        <>
          <Text
            bold
            fontSize={expandedVideo ? appStyles.sm : appStyles.xs}
            numberOfLines={expandedVideo ? 3 : 2}
            color={theme.colors.text}
            containerStyle={[
              expandedVideo ? appStyles.mVSm : appStyles.mLSm,
              !expandedVideo && {width: Constants.window.width - 150},
            ]}>
            {videoDetail.title}
          </Text>
          {!expandedVideo && (
            <ImageIcons
              source={Assets.cancel}
              size={25}
              color={theme.colors.icon}
              onPress={cancel}
              styles={appStyles.mLXs}
            />
          )}
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 'auto',
  },
  videoContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '99%',
    height: '98%',
  },
});

export default VideoPlayer;
