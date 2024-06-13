import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import LoadingView from './LoadingView';
import Text from './Text';
import useAppState from 'utils/useAppState';

const VideoPlayer = ({videoDetail, sourceVideo, expandedVideo, canPlaying}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [controls, setControls] = useState(true);

  const animationVideoContentStyle = () => {
    return {
      width: expandedVideo ? '100%' : 70,
      height: expandedVideo ? 220 : 50,
      marginTop: expandedVideo ? 20 : 0,
      borderWidth: expandedVideo ? 3 : 1,
    };
  };

  useEffect(() => {
    if (!canPlaying) {
      videoRef.current = null;
    }
  }, [canPlaying]);

  useAppState({
    onForeground: () => {
      setControls(true);
    },
    onBackground: () => {
      setControls(false);
    },
  });

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={styles.videoContainer}>
      <Animated.View
        style={[styles.videoContent, animationVideoContentStyle()]}>
        {videoDetail && sourceVideo && canPlaying && (
          <Video
            ref={videoRef}
            source={sourceVideo}
            resizeMode={'stretch'}
            ignoreSilentSwitch={'ignore'}
            controls={controls}
            playWhenInactive={true}
            playInBackground={false}
            allowsExternalPlayback
            showNotificationControls
            automaticallyWaitsToMinimizeStalling
            style={styles.video}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            onLoadStart={e => {
              setLoading(true);
            }}
            onBuffer={e => {
              setLoading(e.isBuffering);
            }}
          />
        )}
        {!canPlaying || loading ? <LoadingView /> : null}
      </Animated.View>
      {expandedVideo && videoDetail && <Text>{videoDetail.title}</Text>}
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
