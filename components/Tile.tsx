import * as React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Text, View } from "../components/Themed";

import PillSVG from "../assets/images/PillSVG";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const Tile: React.FC<TileDetails> = ({ title, style }) => {
  return (
    <TileBase style={style}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="pill"
          size={42}
          color="white"
        />
        <View style={styles.textContent}>
          <Text style={styles.primaryText}>{title}</Text>
          <Text style={styles.secondaryText}>{title}</Text>
        </View>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#24AC29",
    flexDirection: "column",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textContent: {
    backgroundColor: "#24AC29",
    justifyContent: "flex-end",
  },
  icon: {
    // marginBottom: 35,
  },
  primaryText: {
    fontSize: 16,
    color: "white",
  },
  secondaryText: {
    fontSize: 14,
    color: "white",
    opacity: 0.68,
  },
});

export default Tile;
