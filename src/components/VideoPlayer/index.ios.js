import React, {useCallback, useState} from 'react';
import {isEmpty, head} from 'lodash';
import Video from 'react-native-video';
import {StyleSheet, View} from 'react-native';
import SliderTime from 'components/VideoPlayer/sliderTime';
import VideoAction from 'components/VideoPlayer/videoAction';
import useVideoRealm from 'hooks/useVideoRealm';
import useVideoPlayer, {useVideoState} from 'hooks/useVideoPlayer';
import useTheme from 'hooks/useTheme';
import {Constants} from 'utils/constants';

const VideoPlayer = React.forwardRef(({}, videoRef) => {
  const theme = useTheme();
  const {
    source,
    poster,
    paused,
    albums,
    relatedVideos,
    setPaused,
    repeat,
    setRepeat,
  } = useVideoState();
  const {getVideo, onPause, onResume} = useVideoPlayer(videoRef);
  const {isFavourite, updateFavourite, saveVideoRealm} = useVideoRealm();
  const [showNotiControls, setShowNotiControls] = useState(false);
  const [progress, setOnProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });

  const animationVideoContentStyle = useCallback(() => {
    if (poster) {
      return {
        height: (Constants.window.width * poster.height) / poster.width,
        borderColor: theme.colors.border,
      };
    }
    return {height: 220, borderColor: theme.colors.border};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poster]);

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
    updateFavourite();
  };

  const VideoView = useCallback(() => {
    if (source && poster) {
      return (
        <Video
          ref={videoRef}
          source={source}
          poster={poster.url}
          repeat={repeat}
          paused={false}
          resizeMode={'cover'}
          posterResizeMode={'cover'}
          ignoreSilentSwitch={'ignore'}
          playWhenInactive={true}
          playInBackground={false}
          showNotificationControls={true}
          style={styles.video}
          onLoadStart={e => {
            setOnProgress({
              currentTime: 0,
              seekableDuration: 0,
            });
            setShowNotiControls(false);
            saveVideoRealm();
          }}
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
          onEnd={async () => {
            if (!repeat) {
              let videoId = !isEmpty(relatedVideos) && head(relatedVideos).id;
              await getVideo(videoId);
            }
          }}
          onError={e => {
            console.log(`error: ${JSON.stringify(source)}`);
          }}
        />
      );
    }
    return <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, poster]);

  return (
    <View style={[styles.videoContainer]}>
      <View style={[styles.videoContent, animationVideoContentStyle()]}>
        <VideoView />
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
        isFavourite={isFavourite()}
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
