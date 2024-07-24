import {Dimensions, Platform} from 'react-native';

const android = Platform.OS === 'android';
const iOS = Platform.OS === 'ios';
const window = Dimensions.get('window');

const placeholderList = Array.from({length: 15}).map(_ => undefined);

export const SCREEN_NAME = {
  HOME_NAVIGATOR: 'HOME_NAVIGATOR',
  HOME: 'HOME',
  ALBUMS: 'ALBUMS',
  HISTORY: 'HISTORY',
  SETTING: 'SETTING',
  SEARCH: 'SEARCH',
};

const Constants = {
  android,
  iOS,
  window,
  placeholderList,
};

export default Constants;
