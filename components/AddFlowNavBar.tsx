import React from "react";
import useColorScheme from "../hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomHaptics from "../utils/CustomHaptics";

import { PressableBase } from "./PressableBase";
import { View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { useStores } from "../models/root-store-provider";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddFlowNavBar: React.FC<{
  left: () => void;
  right: () => void;
  last?: boolean;
  preventLeftDefault?: boolean;
  preventRightDefault?: boolean;
  preventRightHaptics?: boolean;
}> = ({
  left,
  right,
  last = false,
  preventLeftDefault = false,
  preventRightDefault = false,
  preventRightHaptics = false,
}) => {
  const funcWithHaptics = (func: () => void) => {
    CustomHaptics("light");
    func();
  };
  const colorScheme = useColorScheme();
  const { progressStore } = useStores();
  const insets = useSafeAreaInsets();

  return (
    <>
      <LinearGradient
        colors={[
          colorScheme === "light" ? "rgba(249,249,249,0.8)" : "transparent",
          colorScheme === "light" ? "rgba(249,249,249,0.95)" : "#000",
        ]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
        }}
        locations={[0, 0.5]}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingBottom: insets.bottom === 0 ? 0 : 15,
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0)",
        }}
      >
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
                padding: 32.5,
                paddingLeft: 80,
                paddingRight: 55,
              },
              accessibilityLabel: "Navigate to previous screen",
            }}
            onPress={() => {
              if (!preventLeftDefault) {
                progressStore.goBack();
              }
              funcWithHaptics(left);
            }}
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
                padding: 32.5,
                paddingLeft: 55,
                paddingRight: 80,
              },
              accessibilityLabel: "Navigate to next screen",
            }}
            onPress={() => {
              if (!preventRightDefault) {
                progressStore.goForward();
              }
              if (preventRightHaptics) {
                right();
              } else {
                funcWithHaptics(right);
              }
            }}
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
