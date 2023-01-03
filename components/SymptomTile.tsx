import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";

import { Icon } from "./Icon";
import { Text } from "./Themed";
import { useColorScheme } from "react-native";
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
      size={TileSize.HalfHeight}
      gradient={[tileColor, tileColor]}
      onClick={onPress}
      style={extraStyles}
    >
      <View style={styles.content}>
        <Icon
          name={iconName}
          props={{
            width: 35,
            height: 35,
            fill: contentColor,
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: contentColor,
            maxWidth: 80,
            textAlign: "right",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SymptomTile;
