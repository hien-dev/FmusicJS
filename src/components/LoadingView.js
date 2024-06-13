import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Assets from 'assets/images';
import {useThemeForScheme} from 'themes/index';

const LoadingView = () => {
  const theme = useThemeForScheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.primaryColors.overlayBackground},
      ]}>
      <LottieView source={Assets.loading} autoPlay loop style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '50%',
    height: 200,
  },
});

export default LoadingView;
