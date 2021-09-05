import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  index?: number;
  onPress: () => void;
  selected: boolean | null;
  extraStyles?: StyleProp<ViewStyle>;
}

const SelectionTile: React.FC<TileDetails> = ({
  title,
  onPress,
  extraStyles,
  selected,
}) => {
  const colorScheme = useColorScheme();

  const tileColor = selected
    ? "#FF7272"
    : colorScheme === "light"
    ? "#fff"
    : "#252525";

  const iconColor = colorScheme === "dark" ? "#fff" : "#333";

  return (
    <TileBase
      size={TileSize.Default}
      gradient={[tileColor, tileColor]}
      onClick={onPress}
      style={extraStyles}
    >
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: selected ? "#fff" : iconColor,
          }}
        >
          {title}
        </Text>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default SelectionTile;
