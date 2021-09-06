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
import SettingsScreen from "../screens/Settings";
import LinkingConfiguration from "./LinkingConfiguration";

import { Ionicons } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";

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
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
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
          gestureEnabled: false
        }}
      />
      <RootStack.Screen
        name="AddFlow"
        component={AddFlowNavigator}
        options={{ headerShown: false, cardShadowEnabled: true }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          cardShadowEnabled: true,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color={textColor}
              style={{ paddingLeft: 10 }}
            />
          ),
          headerStyle: {
            borderWidth: 0,
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </RootStack.Navigator>
  );
}
