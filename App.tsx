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
import AppNavigator from 'navigation/appNavigator';
import API from 'networkings/api';
import MusicBotomSheet from 'components/MusicBotomSheet';
import {useAppStore} from 'stores/appStore';
import LoadingView from 'components/LoadingView';
import RealmContext from 'realms/realm';

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
        <RealmContext.RealmProvider>
          <AppNavigator />
          <MusicBotomSheet />
          {loading && <LoadingView />}
        </RealmContext.RealmProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
