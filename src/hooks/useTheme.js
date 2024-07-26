import {useColorScheme} from 'react-native';
import {LightTheme, DarkTheme} from 'utils/theme';
/**
 *
 * @returns {LightTheme}
 */
export default function useTheme() {
  return useColorScheme() === 'dark' ? DarkTheme : LightTheme;
}
