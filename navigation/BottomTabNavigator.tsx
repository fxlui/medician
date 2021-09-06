import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { TabBarButton, tabBarStyles } from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import SymptomOverview from "../screens/SymptomOverview";
import { View, Text } from "../components/Themed";
import Icon from "../components/Icon";

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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="DirectToAddFlow"
        component={AddFlowPlaceholder}
        options={{
          tabBarIcon: () => {
            return (
              <Icon
                name="Add"
                props={{
                  fill: "#F8583B",
                  width: 30,
                  height: 30,
                }}
              />
            );
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("ActionScreen");
          },
        })}
      />
      <BottomTab.Screen
        name="OverviewScreen"
        component={SymptomOverview}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="assignment" color={color} />
          ),
          headerShown: true,
          headerStyle: {
            height: 100,
            shadowColor: "transparent",
          },
          title: "Overview",
          headerTitleStyle: {
            fontSize: 19,
          },
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
