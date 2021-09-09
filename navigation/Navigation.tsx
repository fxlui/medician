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

import TimelineScreen from "../screens/TimelineScreen";
import TimelineDetailsScreen from "../screens/TimelineDetailsScreen";

import LinkingConfiguration from "./LinkingConfiguration";

import { Feather, Ionicons } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import { PressableBase } from "../components/PressableBase";
import { themeTextColor } from "../constants/Colors";
import AppLoading from "expo-app-loading";

import WelcomeTut from "../screens/tutorial/WelcomeTut";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;

  const [newUser, setNewUser] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    const checkNewUser = async () => {
      const newUser = await AsyncStorage.getItem("@new_user");
      console.log(newUser);
      if (newUser) {
        setNewUser(false);
      } else {
        setNewUser(true);
      }
    };
    checkNewUser();
  }, []);

  if (newUser === undefined) {
    return <AppLoading />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {newUser ? (
        <RootStack.Screen name="Tutorial" component={WelcomeTut} />
      ) : (
        <>
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
              gestureEnabled: false,
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
            name="Timeline"
            component={TimelineScreen}
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
            name="TimelineDetails"
            component={TimelineDetailsScreen}
            options={{
              title: "Details",
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
        </>
      )}
    </RootStack.Navigator>
  );
}
