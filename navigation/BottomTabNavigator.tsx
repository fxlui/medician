import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { TabBarButton, tabBarStyles } from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import RecordsScreen from "../screens/RecordsScreen";
import { View } from "../components/Themed";

import AreaSelectScreen from "../screens/add-flow/AreaSelectScreen";
import Notification from "../screens/Notification";
import { TouchableOpacity, Pressable } from "react-native";
import { BottomTabParamList, HomeParamList, AddFlowParamList } from "../types";

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
        tabBarButton: TabBarButton,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        //name="DirectToAddFlow"
        //component={AddFlowPlaceholder}
        name="DirectToAddFlow"
        component={AddFlowStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
        }}
        /*listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddFlow");
          },
        })}*/
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
};

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) => {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default BottomTabNavigator;

const AddFlowStack = createStackNavigator<AddFlowParamList>();

function AddFlowStackNavigator() {
  return (
    <AddFlowStack.Navigator>
      <AddFlowStack.Screen
        name="AreaSelectScreen"
        component={AreaSelectScreen}
        options={{ headerTitle: "Add Flow 1", headerShown: false }}
      />
    </AddFlowStack.Navigator>
  );
}
