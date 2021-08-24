import * as React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";

import PillSVG from "../assets/images/PillSVG";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
}

const Tile: React.FC<TileDetails> = ({ title }) => {
  return (
    <TileBase>
      <View style={styles.content}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="pill"
          size={42}
          color="white"
        />
        <Text style={styles.tileText}>{title}</Text>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#24AC29",
    flexDirection: "column",
    height: 100,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  icon: {
    // marginBottom: 35,
  },
  tileText: {
    color: "white",
  },
});

export default Tile;
