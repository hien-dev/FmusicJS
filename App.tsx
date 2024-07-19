/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import appStyles from 'utils/appStyles';
import AppNavigator from 'src/navigation/appNavigator';
import {initRequestHeader} from 'networkings/api';
import MusicBotomSheet from 'components/MusicBotomSheet';
import LoadingView from 'components/LoadingView';
import RealmContext from 'realms/realm';
import useNetworking from 'hooks/useNetworking';
import {StatusBar, useColorScheme} from 'react-native';
import useTheme from 'hooks/useTheme';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
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
      <RealmContext.RealmProvider>
        <StatusBar
          backgroundColor={theme.colors.background}
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <AppNavigator />
        <MusicBotomSheet />
        {loading && <LoadingView />}
      </RealmContext.RealmProvider>
    </GestureHandlerRootView>
  );
};

export default App;
