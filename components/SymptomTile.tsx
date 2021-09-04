import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";

import { Icon } from "./Icon";
import { Text } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  index?: number;
  onPress: () => void;
  iconName: string;
  selected: boolean;
  extraStyles?: StyleProp<ViewStyle>;
}

const SymptomTile: React.FC<TileDetails> = ({
  title,
  onPress,
  extraStyles,
  iconName,
  selected,
}) => {
  const colorScheme = useColorScheme();

  const tileColor = selected
    ? "#FF7272"
    : colorScheme === "light"
    ? "#fff"
    : "#252525";

  const contentColor =
    colorScheme === "dark" ? "#fff" : selected ? "#fff" : "#000";

  return (
    <TileBase
      size={TileSize.Default}
      gradient={[tileColor, tileColor]}
      onClick={onPress}
      style={extraStyles}
    >
      <View style={styles.content}>
        <Icon
          name={iconName}
          props={{
            width: 42,
            height: 42,
            fill: contentColor,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: contentColor,
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
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});

export default SymptomTile;
