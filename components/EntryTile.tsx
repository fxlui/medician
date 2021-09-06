import React from "react";
import { View, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text } from "./Themed";
import TileBase, { TileSize } from "./TileBase";
import useColorScheme from "../hooks/useColorScheme";

interface TileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  list: string;
  emoji: string;
  onClick: () => void;
}

const Tile: React.FC<TileDetails> = ({
  title,
  style,
  size,
  list,
  onClick,
  emoji,
}) => {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  return (
    <TileBase
      style={style}
      size={size}
      gradient={[tileColor, tileColor]}
      onClick={onClick}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={{ fontSize: 42 }}>{emoji}</Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
        </View>
        {list == "symptoms" ? (
          <Text style={styles.list}>
            pain{"\n"}
            itchy{"\n"}
            hot {"\n"}
            cold{"\n"}
            ...
          </Text>
        ) : (
          <Text style={styles.list}>
            sleep{"\n"}
            breathe{"\n"}
            see{"\n"}
            hear{"\n"}
            ...
          </Text>
        )}
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    justifyContent: "space-between",
  },
  list: {
    fontSize: 16,
    opacity: 0.68,
    fontWeight: "500",
    textAlign: "right",
  },
});

export default Tile;
