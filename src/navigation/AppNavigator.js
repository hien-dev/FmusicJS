import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'screens/Home';
import Albums from 'screens/Albums';
import Setting from 'screens/Setting';
import History from 'screens/History';
import ImageIcons from 'components/ImageIcons';
import Assets from 'assets/images';
import {useTheme, LightTheme, DarkTheme} from 'themes/index';
import {SCREEN_NAME} from 'constants/ScreenNames';

const AppBottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const tabBarIcon = ({icon, color}) => (
    <ImageIcons source={icon} color={color} />
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarStyle: {backgroundColor: theme.colors.background},
      }}>
      <Tab.Screen
        name={SCREEN_NAME.HOME}
        component={Home}
        options={{
          tabBarIcon: ({color}) =>
            tabBarIcon({icon: Assets.home, color: color}),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.HISTORY}
        component={History}
        options={{
          tabBarIcon: ({color}) =>
            tabBarIcon({icon: Assets.history, color: color}),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.SETTING}
        component={Setting}
        options={{
          tabBarIcon: ({color}) =>
            tabBarIcon({icon: Assets.menu, color: color}),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={AppBottomTabs} />
      <Stack.Screen name={SCREEN_NAME.ALBUMS} component={Albums} />
    </Stack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();

const AppNavigator = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
