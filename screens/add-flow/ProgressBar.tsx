import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.progress}>
      <View
        style={[
          styles.progressBar,
          {
            width: percentage * 95,
          },
        ]}
      />
      <View
        style={[
          styles.progressBarBackDrop,
          { backgroundColor: colorScheme === "light" ? "#EDEDED" : "#323232" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 10,
    width: 125,
    marginTop: 55,
    paddingLeft: 30,
  },
  progressBar: {
    backgroundColor: "#45B649",
    flex: 1,
    borderRadius: 10,
    opacity: 1,
  },
  progressBarBackDrop: {
    backgroundColor: "#EDEDED",
    position: "absolute",
    borderRadius: 10,
    height: 10,
    width: 125 - 30,
    left: 30,
    zIndex: -99,
  },
});

export default ProgressBar;
