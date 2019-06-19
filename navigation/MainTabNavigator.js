import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapViewScreen from '../screens/MapViewScreen';
import MyProfile from '../screens/MyProfile';
import SignUpScreen from '../screens/SignUpScreen';
import CameraScreen from '../screens/Camera';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Map: MapViewScreen,
  SignUp: SignUpScreen,
  Profile: MyProfile,
  Camera: CameraScreen
});

HomeStack.navigationOptions = {
  // tabBarVisible: false,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: MapViewScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: MyProfile,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
