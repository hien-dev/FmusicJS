import React, {useState} from 'react';
import Video from 'react-native-video';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'themes/index';
import {Constants} from 'utils/constants';
import {useVideoPlayer} from 'stores/videoStore';
import SliderTime from 'components/VideoPlayer/sliderTime';
import VideoAction from 'components/VideoPlayer/videoAction';
import {useAppStore} from 'stores/appStore';
import useVideoRealm from 'hooks/useVideoRealm';

const VideoPlayer = React.forwardRef(({}, videoRef) => {
  const theme = useTheme();
  const {video, paused, setPaused} = useVideoPlayer();
  const {isFavourite, addVideoRealm} = useVideoRealm();
  const {repeat, setRepeat} = useAppStore();
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

  const onResume = async () => {
    if (videoRef.current) {
      await videoRef.current.resume();
    }
  };

  const onPause = async () => {
    if (videoRef.current) {
      await videoRef.current.pause();
    }
  };

  const onReplay = () => {
    if (progress.currentTime < 10) {
      onSeek(0);
      return;
    }
    onSeek(progress.currentTime - 10);
  };

  const onForward = () => {
    onSeek(progress.currentTime + 10);
  };

  const onSeek = value => {
    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };

  const onRepeat = () => {
    setRepeat(!repeat);
  };

  const onFavourite = () => {
    addVideoRealm({video: video, favourite: true});
  };

  return (
    <View style={[styles.videoContainer]}>
      <View style={[styles.videoContent, animationVideoContentStyle()]}>
        {video && video.sourceVideo && (
          <Video
            ref={videoRef}
            source={video.sourceVideo}
            poster={video.poster.url}
            repeat={repeat}
            paused={false}
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
              addVideoRealm({video: video});
            }}
            onReadyForDisplay={() => {}}
            onProgress={e => setOnProgress(e)}
            onPlaybackRateChange={e => {
              setPaused(e.playbackRate === 0);
            }}
            onBuffer={e => {
              if (e.isBuffering) {
                setShowNotiControls(true);
                onResume();
              }
            }}
            onEnd={() => {
              !repeat && onPause();
            }}
            onError={e => {
              console.log(`error: ${JSON.stringify(e)}`);
            }}
          />
        )}
      </View>
      <SliderTime
        progress={progress}
        onSlidingComplete={value => {
          if (value[0] !== undefined) {
            onSeek(value[0]);
          }
        }}
      />
      <VideoAction
        paused={paused}
        repeat={repeat}
        isFavourite={isFavourite(video)}
        onPaused={async () => (paused ? await onResume() : await onPause())}
        onReplay={onReplay}
        onForward={onForward}
        onRepeat={onRepeat}
        onFavourite={onFavourite}
      />
    </View>
  );
});

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
});

export default VideoPlayer;
