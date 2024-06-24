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
import StreamBotomSheet from 'components/BottomSheet';
import {useLoading} from 'stores/appStore';
import LoadingView from 'components/LoadingView';

const queryClient = new QueryClient();
const App = () => {
  const {loading} = useLoading();
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
        <StreamBotomSheet />
        {loading && <LoadingView />}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
