import React, { FC } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useWindowDimensions } from "react-native";

interface FillerTileProps {
  onPress: () => void
}

const FillerTile:FC<FillerTileProps> = ({ onPress }) => {
  const { height, width } = useWindowDimensions();
  return (
    <Pressable
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
      onPress={onPress}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default FillerTile;
