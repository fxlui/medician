import React, { FC } from "react";
import { View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { StyleSheet } from "react-native";

interface ProgressProps {
  percentage: number;
}

export const ProgressBar: FC<ProgressProps> = ({ percentage }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressBarBackDrop,
          { backgroundColor: colorScheme === "light" ? "#EDEDED" : "#323232" },
        ]}
      >
        <View style={[styles.progressBar, { width: percentage * 0.9 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    paddingLeft: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  progressBarBackDrop: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    height: 10,
    width: 95,
  },
  progressBar: {
    backgroundColor: "#45B649",
    borderRadius: 10,
    height: 10,
  },
});

export default ProgressBar;
