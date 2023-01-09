import React from "react";
import { Dimensions, useColorScheme, View as DefaultView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomHaptics from "../utils/CustomHaptics";

import { PressableBase } from "./PressableBase";
import { View, Text } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { useStores } from "../models/root-store-provider";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircularProgress from "react-native-circular-progress-indicator";
import { BlurView } from "expo-blur";

const AddFlowNavBar: React.FC<{
  left: () => void;
  right: () => void;
  last?: boolean;
  preventLeftDefault?: boolean;
  preventRightDefault?: boolean;
  preventRightHaptics?: boolean;
  showProgress?: boolean;
  showBackdrop?: boolean;
}> = ({
  left,
  right,
  last = false,
  preventLeftDefault = false,
  preventRightDefault = false,
  preventRightHaptics = false,
  showProgress = true,
  showBackdrop = true,
}) => {
  const funcWithHaptics = (func: () => void) => {
    CustomHaptics("light");
    func();
  };
  const colorScheme = useColorScheme();
  const { progressStore } = useStores();
  const insets = useSafeAreaInsets();
  const [barHeight, setBarHeight] = React.useState(90);

  return (
    <>
      {showBackdrop && (
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
            height: showProgress ? barHeight + 30 : barHeight,
          }}
          locations={[0, 0.5]}
          pointerEvents="none"
        />
      )}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingBottom: insets.bottom === 0 ? 0 : insets.bottom,
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <PressableBase
          extraProps={{
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
          <View
            onLayout={(event) => {
              setBarHeight(event.nativeEvent.layout.height);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width - 50,
              backgroundColor: colorScheme === "light" ? "#fff" : "#252525",
              borderRadius: showProgress ? 25 : 15,
              padding: 15,
              paddingHorizontal: 18,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.12,
              shadowRadius: 10.65,
              elevation: 6,
            }}
          >
            {showProgress ? (
              <CircularProgress
                value={
                  (progressStore.currentProgress /
                    progressStore.progressLength) *
                  100
                }
                radius={30}
                inActiveStrokeColor={
                  colorScheme === "light" ? "#DFDFDF" : "#rgba(0,0,0,0.3)"
                }
                progressValueStyle={{
                  fontSize: 16,
                }}
                valueSuffix={"%"}
              />
            ) : (
              <DefaultView />
            )}
            <DefaultView
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 5 }}>
                {last ? "Finish" : "Next"}
              </Text>
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
            </DefaultView>
          </View>
        </PressableBase>
      </View>
    </>
  );
};

export default AddFlowNavBar;
