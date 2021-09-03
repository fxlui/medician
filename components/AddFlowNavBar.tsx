import React from "react";
import useColorScheme from "../hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { PressableBase } from "./PressableBase";
import { View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const AddFlowNavBar: React.FC<{
  left: () => void;
  right: () => void;
  last?: boolean;
}> = ({ left, right, children, last = false }) => {
  const funcWithHaptics = (func: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    func();
  };
  const colorScheme = useColorScheme();
  return (
    <>
      <LinearGradient
        colors={[
          colorScheme === "light" ? "rgba(249,249,249,0)" : "transparent",
          colorScheme === "light" ? "#F9F9F9" : "#000",
        ]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
        }}
        locations={[0, 0.5]}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingBottom: 10,
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0)",
        }}
      >
        <View>{children}</View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0)",
          }}
        >
          <PressableBase
            extraProps={{
              style: {
                padding: 30,
                paddingLeft: 80,
                paddingRight: 55,
              },
              ariaLabel: "Navigate to previous screen",
            }}
            onPress={() => funcWithHaptics(left)}
          >
            <Entypo
              name="chevron-left"
              size={28}
              color={colorScheme === "light" ? "#333" : "#fff"}
            />
          </PressableBase>
          <PressableBase
            extraProps={{
              style: {
                padding: 30,
                paddingLeft: 55,
                paddingRight: 80,
              },
              ariaLabel: "Navigate to next screen",
            }}
            onPress={() => funcWithHaptics(right)}
          >
            {last ? (
              <MaterialIcons
                name="done"
                size={28}
                color={colorScheme === "light" ? "#333" : "#fff"}
              />
            ) : (
              <Entypo
                name="chevron-right"
                size={28}
                color={colorScheme === "light" ? "#333" : "#fff"}
              />
            )}
          </PressableBase>
        </View>
      </View>
    </>
  );
};

export default AddFlowNavBar;