import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { TabBarButton, tabBarStyles } from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import RecordsScreen from "../screens/RecordsScreen";
import { View } from "../components/Themed";

import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const AddFlowPlaceholder = () => <View />;

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: tabBarStyles.tabBar,
        tabBarButton: TabBarButton,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <BottomTab.Screen
        name="DirectToAddFlow"
        component={AddFlowPlaceholder}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("ActionScreen");
          },
        })}
      />
      <BottomTab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="assignment" color={color} />
          )
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

export default BottomTabNavigator;
