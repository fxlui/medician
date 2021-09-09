import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import DashedBorder from "../assets/DashedBorder";

const TileBase = () => {
  return (
    <View style={styles.container}>
      <DashedBorder style={{ width: 50 }} />
      <View style={{ position: "absolute" }}>
        <Text>Hi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    justifyContent: "center",
    // overflow: "hidden",
    // width: 5,
  },
});

export default TileBase;
