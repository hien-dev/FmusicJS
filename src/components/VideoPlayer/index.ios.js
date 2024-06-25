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
      width: '100%',
      height: expandedVideo ? 220 : 0,
      borderWidth: 1,
      borderColor: theme.colors.border,
      opacity: expandedVideo ? 1 : 0,
    };
  };

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[styles.videoContainer]}>
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
