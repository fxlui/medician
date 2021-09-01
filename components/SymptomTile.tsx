import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "./Icon";
import TileBase, { TileSize } from "./TileBase";

interface TileDetails {
  title: string;
  index?: number;
  onPress: () => void;
  iconName: string;
  extraStyles?: StyleProp<ViewStyle>;
}

const SymptomTile: React.FC<TileDetails> = ({
  title, onPress, extraStyles, iconName
}) => {
  const colorScheme = useColorScheme();

  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

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
            fill: "#000"
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "transparent"
  }
});

export default SymptomTile;
