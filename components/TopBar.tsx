import React from "react";
import { useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomHaptics from "../utils/CustomHaptics";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";

import { PressableBase } from "./PressableBase";
import { Entypo } from "@expo/vector-icons";

const TopBar: React.FC<{ left: () => void; title: string }> = ({
  left,
  title,
}) => {
  const funcWithHaptics = (func: () => void) => {
    CustomHaptics("light");
    func();
  };
  const colorScheme = useColorScheme();
  return (
    <>
      <View style={styles.container}>
        <View style={{ width: 28 }} />

        <Text style={styles.title}>{title}</Text>

        <PressableBase
          extraProps={{
            accessibilityLabel: "Navigate to previous screen",
          }}
          onPress={() => funcWithHaptics(left)}
        >
          <Entypo
            name="dots-three-horizontal"
            size={28}
            color={colorScheme === "light" ? "#333" : "#fff"}
          />
        </PressableBase>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
});

export default TopBar;
