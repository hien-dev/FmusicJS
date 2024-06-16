import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import LoadingView from '../LoadingView';
import Text from '../Text';
import VideoControls, {VideoButton} from './VideoControls';
import {useThemeForScheme} from 'themes/index';
import appStyles from 'themes/appStyles';
import {AppConstants} from 'constants/AppConstants';
import Assets from 'assets/images';

const VideoPlayer = ({
  videoDetail,
  sourceVideo,
  poster,
  expandedVideo,
  cancel,
}) => {
  const theme = useThemeForScheme();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showNotiControls, setShowNotiControls] = useState(false);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCureentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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
              setCureentTime(0);
              setTotalTime(0);
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
            onProgress={e => {
              setCureentTime(e.currentTime);
              setTotalTime(e.seekableDuration);
            }}
            onPlaybackRateChange={e => {
              setPaused(e.playbackRate === 0);
            }}
            onBuffer={e => {
              setLoading(e.isBuffering);
            }}
          />
        )}
        <VideoControls
          videoRef={videoRef}
          loading={loading}
          expandedVideo={expandedVideo}
          paused={paused}
          setPaused={setPaused}
          currentTime={currentTime}
          totalTime={totalTime}
        />
        {loading ? <LoadingView /> : null}
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
              !expandedVideo && {width: AppConstants.window.width - 150},
            ]}>
            {videoDetail.title}
          </Text>
          {!expandedVideo && (
            <VideoButton
              source={Assets.cancel}
              size={25}
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
