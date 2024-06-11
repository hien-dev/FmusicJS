/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppNavigator from 'navigation/AppNavigator';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import appStyles from 'themes/appStyles';

const App = () => {
  return (
    <GestureHandlerRootView style={appStyles.flex}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
