import React from "react";
import useColorScheme from "../hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomHaptics from "../utils/CustomHaptics";

import { PressableBase } from "./PressableBase";
import { View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TutorialNavBar: React.FC<{
  left: () => void;
  right: () => void;
  last?: boolean;
  preventLeftDefault?: boolean;
  preventRightDefault?: boolean;
  preventRightHaptics?: boolean;
  hideLeft?: boolean;
}> = ({
  left,
  right,
  last = false,
  preventLeftDefault = false,
  preventRightDefault = false,
  preventRightHaptics = false,
  hideLeft = false,
}) => {
  const funcWithHaptics = (func: () => void) => {
    CustomHaptics("light");
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
          paddingBottom: 15,
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
          { hideLeft ? 
            <View style={{
              width: 28,
              padding: 32.5,
              paddingLeft: 80,
              paddingRight: 55,
            }}/>  
            
          :
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
          }

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

export default TutorialNavBar;
