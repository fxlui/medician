import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  index?: number;
  onPress: () => void;
  extraStyles?: StyleProp<ViewStyle>;
}

const SymptomTile: React.FC<TileDetails> = ({ title, index, onPress, extraStyles }) => {
  const colorScheme = useColorScheme();

  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  return (
    <TileBase
      size={TileSize.Default}
      gradient={[tileColor, tileColor]}
      onClick={onPress}
      style={extraStyles}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="pill"
          size={42}
          color={index == 0 ? "white" : "#24AC29"}
        />
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "transparent"
  }
});

export default SymptomTile;
