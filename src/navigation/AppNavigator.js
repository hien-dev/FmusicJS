import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from 'screens/Home';
import AlbumScreen from 'screens/Albums';
import SettingScreen from 'screens/Setting';
import HistoryScreen from 'screens/History';
import ImageIcons from 'components/ImageIcons';
import Assets from 'assets/images';
import {DarkTheme} from 'themes/dark';
import {LightTheme} from 'themes/light';
import {useTheme} from 'themes/index';

const AppBottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const tabBarIcon = ({icon, color}) => (
    <ImageIcons source={icon} color={color} />
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primaryColors.white,
        tabBarStyle: {backgroundColor: theme.primaryColors.black},
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) =>
            tabBarIcon({icon: Assets.home, color: color}),
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color}) =>
            tabBarIcon({icon: Assets.timePast, color: color}),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
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
      <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
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
