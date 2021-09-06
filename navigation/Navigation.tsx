import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { RootStackParamList } from "../types";
import AddFlowNavigator from "./AddFlowNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import NotificationScreen from "../screens/Notification";
import ActionScreen from "../screens/ActionScreen";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
      <RootStack.Screen
        name="ActionScreen"
        component={ActionScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          cardShadowEnabled: true,
        }}
      />
      <RootStack.Screen
        name="AddFlow"
        component={AddFlowNavigator}
        options={{ headerShown: false, cardShadowEnabled: true }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </RootStack.Navigator>
  );
}
