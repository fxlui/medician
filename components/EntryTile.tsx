import React from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";
import TileBase, { TileSize } from "./TileBase";
import useColorScheme from "../hooks/useColorScheme";

interface TileDetails {
  title: string ;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  list: string;
  emoji: string;
  onClick: () => void;
}

const Tile: React.FC<TileDetails> = ({
  title, style, size, list, onClick, emoji
}) => {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  return (
    <TileBase style={style} size={size} gradient={[tileColor, tileColor]} onClick={onClick}>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={{ fontSize: 42 }}>{emoji}</Text>
          <View style={styles.textContent}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
          </View>
        </View>
        {list == "symptoms" ? (
          <View style={styles.right}>
            <Text style={styles.list}>
              pain{"\n"}
              itchy{"\n"}
              hot {"\n"}
              cold{"\n"}
              ...
            </Text>
          </View>
        ) : 
          <View style={styles.right}>
            <Text style={styles.list}>
              sleep{"\n"}
              breathe{"\n"}
              see{"\n"}
              hear{"\n"}
              ...
            </Text>
          </View>
        }
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textContent: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
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
  list: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.68
  }
});

export default Tile;
