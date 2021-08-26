import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import { TabBarButton } from "../components/TabBar";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import RecordsScreen from "../screens/RecordsScreen";
import Notification from "../screens/Notification";
import {
  BottomTabParamList,
  HomeParamList,
  RecordsParamList,
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
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          bottom: 30,
          borderRadius: 15,
          marginLeft: 10,
          marginRight: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          paddingBottom: 0,
          paddingLeft: 30,
          paddingRight: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        },
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
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Records"
        component={RecordsNavigator}
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
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const RecordsStack = createStackNavigator<RecordsParamList>();

const RecordsNavigator = () => {
  return (
    <RecordsStack.Navigator>
      <RecordsStack.Screen
        name="RecordsScreen"
        component={RecordsScreen}
        options={{ headerShown: false }}
      />
    </RecordsStack.Navigator>
  );
}

export default BottomTabNavigator;
