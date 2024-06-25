import {Dimensions, Platform} from 'react-native';

const android = Platform.OS === 'android';
const iOS = Platform.OS === 'ios';
const window = Dimensions.get('window');

export const SCREEN_NAME = {
  HOME_NAVIGATOR: 'HOME_NAVIGATOR',
  HOME: 'HOME',
  ALBUMS: 'ALBUMS',
  HISTORY: 'HISTORY',
  SETTING: 'SETTING',
  SEARCH: 'SEARCH',
};

export const Constants = {
  android,
  iOS,
  window,
};
