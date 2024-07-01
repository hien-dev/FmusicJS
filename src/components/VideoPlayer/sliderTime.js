import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/Text';
import {Slider} from '@miblanchard/react-native-slider';
import appStyles from 'themes/appStyles';
import {useTheme} from 'themes/index';
import {msToTime} from 'utils/timer';

const SliderTime = ({progress, onSlidingComplete}) => {
  const theme = useTheme();
  return (
    <View>
      <View style={styles.slider}>
        <Text bold fontSize={appStyles.xxs} color={theme.colors.text}>
          {msToTime(progress.currentTime)}
        </Text>
        <Text bold fontSize={appStyles.xxs} color={theme.colors.text}>
          {msToTime(progress.seekableDuration)}
        </Text>
      </View>
      <View style={appStyles.pHXL}>
        <Slider
          animationType={'timing'}
          maximumValue={progress.seekableDuration}
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          minimumTrackTintColor={theme.colors.text}
          value={progress.currentTime}
          onSlidingComplete={onSlidingComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SliderTime;
