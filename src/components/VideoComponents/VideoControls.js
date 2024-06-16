import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import appStyles from 'themes/appStyles';
import ImageIcons from '../ImageIcons';
import Assets from 'assets/images';
import Text from '../Text';
import {msToTime} from 'utils/timer';
import {Slider} from '@miblanchard/react-native-slider';
import {useThemeForScheme} from 'themes/index';

export const VideoButton = ({source, size = 30, styles, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageIcons source={source} size={size} color={'#FFF'} styles={styles} />
    </TouchableOpacity>
  );
};
const VideoControls = ({
  videoRef,
  loading,
  expandedVideo,
  paused,
  setPaused,
  currentTime,
  totalTime,
}) => {
  const theme = useThemeForScheme();
  const [show, setShow] = useState(false);
  const [delayShow, setDelayShow] = useState(false);
  useEffect(() => {
    if (paused) {
      setShow(true);
    } else {
      setDelayShow(true);
      setShow(false);
    }
    if (!expandedVideo) {
      setDelayShow(false);
      setShow(false);
    }
  }, [paused, expandedVideo]);

  useEffect(() => {
    if (delayShow) {
      setTimeout(() => {
        setDelayShow(false);
      }, 5000);
    }
  }, [delayShow]);

  return (
    <TouchableOpacity
      onPress={() => {
        expandedVideo && setDelayShow(true);
      }}
      activeOpacity={1}
      style={styles.container}>
      {(show || delayShow) && !loading && (
        <>
          <View
            style={[
              appStyles.fullWidth,
              appStyles.row,
              appStyles.spaceBetween,
              appStyles.pHXs,
            ]}>
            <VideoButton
              source={Assets.expand}
              styles={[appStyles.rotated]}
              onPress={async () => {
                if (videoRef.current) {
                  await videoRef.current.presentFullscreenPlayer();
                  await videoRef.current.dismissFullscreenPlayer();
                }
              }}
            />
            <VideoButton source={Assets.volumeUp} />
          </View>
          <View style={styles.videoAction}>
            <VideoButton
              source={Assets.replay10}
              onPress={() => {
                if (videoRef.current) {
                  if (currentTime - 10 < 0) {
                    videoRef.current.seek(0);
                  } else {
                    videoRef.current.seek(currentTime - 10);
                  }
                }
              }}
            />
            <VideoButton
              source={paused ? Assets.play_arrow : Assets.paused}
              size={80}
              onPress={() => setPaused(!paused)}
            />
            <VideoButton
              source={Assets.forward10}
              onPress={() => {
                if (videoRef.current) {
                  videoRef.current.seek(currentTime + 10);
                }
              }}
            />
          </View>
          <View>
            <View style={styles.slider}>
              <Text
                bold
                fontSize={appStyles.xxs}
                color={theme.primaryColors.white}>
                {msToTime(currentTime)}
              </Text>
              <Text
                bold
                fontSize={appStyles.xxs}
                color={theme.primaryColors.white}>
                {msToTime(totalTime)}
              </Text>
            </View>
            <View style={appStyles.pHXL}>
              <Slider
                animationType={'timing'}
                maximumValue={totalTime}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
                minimumTrackTintColor={theme.primaryColors.white}
                value={currentTime}
                onValueChange={value => {
                  if (videoRef.current && value[0] !== undefined) {
                    videoRef.current.seek(value[0]);
                  }
                }}
              />
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000000',
    ...appStyles.spaceBetween,
  },
  videoAction: {
    ...appStyles.row,
    ...appStyles.fullWidth,
    ...appStyles.hCenter,
    ...appStyles.spaceAround,
  },
  h30: {
    height: 30,
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

export default VideoControls;
