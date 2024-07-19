import React from 'react';
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
import Search from 'screens/Search';
import ImageIcons from 'components/ImageIcons';
import Assets from 'assets/images';
import useTheme from 'hooks/useTheme';
import {SCREEN_NAME} from 'utils/constants';

const HomeScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={SCREEN_NAME.HOME} component={Home} />
      <HomeStack.Screen name={SCREEN_NAME.ALBUMS} component={Albums} />
      <HomeStack.Screen name={SCREEN_NAME.SEARCH} component={Search} />
    </HomeStack.Navigator>
  );
};

const AppBottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const tabBarIcon = ({icon, color}) => (
    <ImageIcons source={icon} color={color} />
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.HOME_NAVIGATOR}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.primaryColors.xMediumGrey,
        tabBarStyle: {backgroundColor: theme.colors.background},
      }}>
      <Tab.Screen
        name={SCREEN_NAME.HOME_NAVIGATOR}
        component={HomeScreen}
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
    </Stack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();

const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
