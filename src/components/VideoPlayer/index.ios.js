import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'themes/index';
import appStyles from 'themes/appStyles';
import {Constants} from 'utils/constants';
import {useVideoPlayer} from 'stores/videoStore';
import Text from 'components/Text';
import {Slider} from '@miblanchard/react-native-slider';
import {msToTime} from 'utils/timer';

const VideoPlayer = () => {
  const theme = useTheme();
  const videoRef = useRef(null);
  const {video, paused, setPaused} = useVideoPlayer();
  const [showNotiControls, setShowNotiControls] = useState(false);
  const [progress, setOnProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });

  const animationVideoContentStyle = () => {
    return {
      height: video
        ? (Constants.window.width * video.poster.height) / video.poster.width
        : 220,
      borderColor: theme.colors.border,
    };
  };

  return (
    <View style={[styles.videoContainer]}>
      <View style={[styles.videoContent, animationVideoContentStyle()]}>
        {video && (
          <Video
            ref={videoRef}
            source={video.sourceVideo}
            poster={video.poster.url}
            paused={paused}
            resizeMode={'cover'}
            posterResizeMode={'cover'}
            ignoreSilentSwitch={'ignore'}
            playWhenInactive={true}
            playInBackground={false}
            showNotificationControls={showNotiControls}
            style={styles.video}
            onLoadStart={e => {
              setOnProgress({
                currentTime: 0,
                seekableDuration: 0,
              });
              setShowNotiControls(false);
            }}
            onReadyForDisplay={() => {}}
            onProgress={e => setOnProgress(e)}
            onPlaybackRateChange={e => {}}
            onBuffer={e => {
              if (e.isBuffering) {
                setShowNotiControls(true);
                setPaused(false);
              }
            }}
            onEnd={() => {
              setPaused(true);
            }}
            onError={e => {
              console.log(`error: ${JSON.stringify(e)}`);
            }}
          />
        )}
      </View>
      <View>
        <View style={styles.slider}>
          <Text bold fontSize={appStyles.xxs} color={theme.primaryColors.white}>
            {msToTime(progress.currentTime)}
          </Text>
          <Text bold fontSize={appStyles.xxs} color={theme.primaryColors.white}>
            {msToTime(progress.seekableDuration)}
          </Text>
        </View>
        <View style={appStyles.pHXL}>
          <Slider
            animationType={'timing'}
            maximumValue={progress.seekableDuration}
            trackStyle={styles.trackStyle}
            thumbStyle={styles.thumbStyle}
            minimumTrackTintColor={theme.primaryColors.white}
            value={progress.currentTime}
            onValueChange={value => {
              if (videoRef.current && value[0] !== undefined) {
                videoRef.current.seek(value[0]);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 'auto',
  },
  videoContent: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '99%',
    height: '98%',
  },
  slider: {
    position: 'absolute',
    bottom: 14,
    ...appStyles.row,
    ...appStyles.fullWidth,
    ...appStyles.spaceBetween,
    ...appStyles.pHXs,
  },
  thumbStyle: {
    width: 5,
    height: 0,
  },
  trackStyle: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#A0A0A0',
  },
});

export default VideoPlayer;
