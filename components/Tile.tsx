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
  size?: TileSize;
  index?: number;
}

const Tile: React.FC<TileDetails> = ({ title, style, size, index }) => {
  return (
    <TileBase
      style={style}
      size={size}
      backgroundColour={index == 0 ? "#24AC29" : "white"}
    >
      <View style={index == 0 ? styles.content : styles.contentWhite}>
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="pill"
            size={42}
            color={index == 0 ? "white" : "#24AC29"}
          />
          <View style={styles.textContent}>
            <Text
              style={[styles.primaryText, index == 0 && { color: "white" }]}
            >
              {title}
            </Text>
            <Text
              style={[styles.secondaryText, index == 0 && { color: "white" }]}
            >
              {title}
            </Text>
          </View>
        </View>
        {size == TileSize.Large ? (
          <View style={styles.right}>
            <Text>hi</Text>
          </View>
        ) : null}
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#24AC29",
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  contentWhite: {
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textContent: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    color: "#333333",
  },
  primaryText: {
    fontSize: 16,
  },
  secondaryText: {
    fontSize: 14,
    opacity: 0.68,
  },
  left: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  right: {
    backgroundColor: "transparent",
  },
});

export default Tile;
