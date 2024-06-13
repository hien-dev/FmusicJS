/**
 * @format
 */
require('@node-libs-react-native/globals');
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  "The provided value 'ms-stream' is not a valid 'responseType'.",
  "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  "[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet."
]);

AppRegistry.registerComponent(appName, () => App);
