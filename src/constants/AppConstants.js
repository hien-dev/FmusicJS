import {Dimensions, Platform} from 'react-native';

const android = Platform.OS === 'android';
const iOS = Platform.OS === 'ios';
const window = Dimensions.get('window');

export const AppConstants = {
  android,
  iOS,
  window,
};
