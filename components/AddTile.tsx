import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  subtitle: string;
}

const Tile: React.FC<TileDetails> = ({ title, subtitle }) => {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  return (
    <TileBase size={TileSize.ActionAdd} gradient={[tileColor, tileColor]}>
      <View style={styles.content}>
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="pill"
            size={42}
            color={"#24AC29"}
          />
          <View style={styles.textContent}>
            <Text style={{ fontSize: 14, opacity: 0.68, fontWeight: "600" }}>
              {title}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textContent: {
    justifyContent: "flex-end",
  },
  left: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  }
});

export default Tile;
