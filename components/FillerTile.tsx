import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const TileBase = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "grey" }}>Click "+" to add </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderRadius: 16,
    borderWidth: 3,
    height: 155,
    width: 155,
  },
});

export default TileBase;
