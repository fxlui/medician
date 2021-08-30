import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import AddFlowNavigator from './AddFlowNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import NotificationScreen from '../screens/Notification';
import LinkingConfiguration from './LinkingConfiguration';
import Symptoms from '../screens/SymptomsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} >
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
      <RootStack.Group screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS
      }}>
        <RootStack.Screen name="AddFlow" component={AddFlowNavigator} />
      </RootStack.Group>
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </RootStack.Navigator>
  );
}
