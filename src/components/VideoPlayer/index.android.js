import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {useTheme} from 'themes/index';
import appStyles from 'themes/appStyles';

const VideoPlayer = ({sourceVideo, poster, expandedVideo}) => {
  const theme = useTheme();
  const videoRef = useRef(null);
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
        {sourceVideo && (
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
            onBuffer={e => {}}
          />
        )}
      </Animated.View>
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
