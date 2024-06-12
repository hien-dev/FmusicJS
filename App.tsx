/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import appStyles from 'themes/appStyles';
import AppNavigator from 'navigation/AppNavigator';
import API from 'networkings/api';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    (async () => {
      let hide = await API.initialize();
      if (hide) {
        SplashScreen.hide();
      }
    })();
  });

  return (
    <GestureHandlerRootView style={appStyles.flex}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
