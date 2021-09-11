import React from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { PressableBase } from "./PressableBase";

export const TabBarButton = (props: BottomTabBarButtonProps) => {
  return (
    <PressableBase extraProps={props} tabBar>
      {props.children}
    </PressableBase>
  );
};

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 100,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingLeft: 60,
    paddingRight: 60,
    elevation: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
});
