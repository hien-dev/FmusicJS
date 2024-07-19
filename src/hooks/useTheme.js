import {useColorScheme} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';

/**
 *
 * @returns {LightTheme}
 */
export default function useTheme() {
  return useColorScheme() === 'dark' ? DarkTheme : LightTheme;
}

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C2F829',
    background: '#111325',
    card: 'rgb(255, 255, 255)',
    text: '#FFFFFF',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    icon: '#FFFFFF',
  },
  primaryColors: {
    orange: '#FF6827',
    red: '#FF371C',
    green: '#C2F829',
    purple: '#C963ED',
    black: '#000000',
    steel: '#D2D7D8',
    xLightGrey: '#FAFAFA',
    lightGrey: '#DEDEDE',
    mediumGrey: '#A0A0A0',
    midLightGrey: '#EBE9EF',
    xMediumGrey: '#808080',
    white: '#FFFFFF',
    cyanBlue: '#1877F2',
    whiteSmoke: '#F2F2F2',
    eerieBlack: '#1B1A17',
    gray76: '#C2C2C2',
    overlayBackground: '#00000050',
  },
};

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C2F829',
    background: '#FAFAFA',
    card: 'rgb(255, 255, 255)',
    text: '#000000',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    icon: '#000000',
  },
  primaryColors: {
    orange: '#FF6827',
    red: '#FF371C',
    green: '#C2F829',
    purple: '#C963ED',
    black: '#000000',
    steel: '#D2D7D8',
    xLightGrey: '#FAFAFA',
    lightGrey: '#DEDEDE',
    mediumGrey: '#A0A0A0',
    midLightGrey: '#EBE9EF',
    xMediumGrey: '#808080',
    white: '#FFFFFF',
    cyanBlue: '#1877F2',
    whiteSmoke: '#F2F2F2',
    eerieBlack: '#1B1A17',
    gray76: '#C2C2C2',
    overlayBackground: '#00000050',
  },
};
