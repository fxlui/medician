import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useWindowDimensions } from "react-native";

const TileBase = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={{
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "dashed",
        borderRadius: 16,
        borderWidth: 2,
        height: 155,
        width: width - 50,
      }}
    >
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "grey" }}>Click "+" to add</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TileBase;
