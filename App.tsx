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
import MusicBotomSheet from 'components/MusicBotomSheet';
import {useAppStore} from 'stores/appStore';
import LoadingView from 'components/LoadingView';

const queryClient = new QueryClient();
const App = () => {
  const {loading} = useAppStore();
  const [onboarding, setOnboarding] = React.useState(true);

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      let hide = await API.initialize();
      if (hide) {
        setTimeout(() => {
          setOnboarding(false);
        }, 500);
      }
    })();
  });
  if (onboarding) {
    return <LoadingView />;
  }
  return (
    <GestureHandlerRootView style={appStyles.flex}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
        <MusicBotomSheet />
        {loading && <LoadingView />}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
