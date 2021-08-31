import React, { FC } from "react";
import { View } from "./Themed";
import { StyleSheet } from "react-native";

interface ProgressProps {
  progress: 0 | 25 | 50 | 75 | 100;
}

export const ProgressBar:FC<ProgressProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progress,
          progress === 0
          ? styles.noProgess
          : styles.someProgress
        ]}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    paddingLeft: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  progressContainer: {
    width: 100,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    alignItems: "stretch"
  },
  progress: {
    borderRadius: 5,
    backgroundColor: "#45B649"
  },
  noProgess: {
    width: 15
  },
  someProgress: {
    width: 25
  }
});

export default ProgressBar
