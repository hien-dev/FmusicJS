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
import {initRequestHeader} from 'networkings/api';
import MusicBotomSheet from 'components/MusicBotomSheet';
import LoadingView from 'components/LoadingView';
import RealmContext from 'realms/realm';
import useNetworking from 'hooks/useNetworking';

const queryClient = new QueryClient();
const App = () => {
  const {loading} = useNetworking();
  const [onboarding, setOnboarding] = React.useState(true);

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      let hide = await initRequestHeader();
      if (hide) {
        setOnboarding(false);
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
