import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import { TabBarButton, tabBarStyles } from "../components/TabBar";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ActionScreen from "../screens/ActionScreen";
import Notification from "../screens/Notification";
import RecordsScreen from "../screens/RecordsScreen";
import {
  BottomTabParamList,
  HomeParamList,
  AddFlowParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: tabBarStyles.tabBar,
        tabBarButton: TabBarButton
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddFlow"
        component={AddFlowNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="assignment" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) => {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () =>{
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator>
      <AddFlowStack.Screen
        name="ActionScreen"
        component={ActionScreen}
        options={{ headerShown: false }}
      />
    </AddFlowStack.Navigator>
  );
}

export default BottomTabNavigator;
