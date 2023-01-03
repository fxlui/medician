import React, { FC } from "react";
import { View } from "./Themed";
import { useColorScheme } from "react-native";
import { observer } from "mobx-react-lite";
import { useStores } from "../models/root-store-provider";
import { StyleSheet } from "react-native";

export const ProgressBar = observer(() => {
  const colorScheme = useColorScheme();
  const { progressStore } = useStores();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressBarBackDrop,
          { backgroundColor: colorScheme === "light" ? "#EDEDED" : "#323232" },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width:
                (progressStore.currentProgress / progressStore.progressLength) *
                95,
            },
          ]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 160,
    paddingLeft: 30,
    paddingBottom: 15,
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
