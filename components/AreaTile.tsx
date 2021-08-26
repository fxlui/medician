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
import useColorScheme from "../hooks/useColorScheme";

import TileBase, { TileSize } from "./TileBase";

interface AreaTileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  selected: boolean;
}

const AreaTile: React.FC<AreaTileDetails> = ({
  title,
  style,
  size,
  index,
  selected,
}) => {
  const colorScheme = useColorScheme();
  const textColor =
    index == 0 ? "#fff" : colorScheme === "light" ? "#333333" : "#fff";
  const tileColor =
    index == 0 ? "#24AC29" : colorScheme === "light" ? "#fff" : "#252525";
  return (
    <TileBase style={style} size={size} backgroundColor={tileColor}>
      <View style={styles.content}>
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="pill"
            size={42}
            color={index == 0 ? "white" : "#24AC29"}
          />
          <View style={styles.textContent}>
            <Text style={[styles.primaryText && { color: textColor }]}>
              {title}
            </Text>
            <Text
              style={[
                styles.secondaryText && { color: textColor, opacity: 0.68 },
              ]}
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

export default AreaTile;
