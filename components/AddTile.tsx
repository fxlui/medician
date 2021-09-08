import * as React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "./Icon";
import { Text } from "./Themed";
import TileBase, { TileSize } from "./TileBase";
import useColorScheme from "../hooks/useColorScheme";
import { themeTileColor } from "../constants/Colors";

interface TileDetails {
  title: string;
  subtitle: string;
  onPress?: () => void;
  style?: object;
}

const Tile: React.FC<TileDetails> = ({
  title,
  subtitle,
  onPress,
  style = {},
}) => {
  const colorScheme = useColorScheme();
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  return (
    <TileBase
      size={TileSize.ActionAdd}
      gradient={[tileColor, tileColor]}
      onClick={onPress}
      style={style}
    >
      <View style={styles.content}>
        {subtitle === "Routine" ? (
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <View style={{ marginRight: 10 }}>
              <Icon name="Exercise" props={{}} />
            </View>
            <Icon name="Medication" props={{}} />
          </View>
        ) : (
          <View style={{ paddingTop: 5, paddingLeft: 3 }}>
            <Icon name="Appointment" props={{}} />
          </View>
        )}
        <View>
          <Text style={{ fontSize: 14, opacity: 0.68, fontWeight: "600" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{subtitle}</Text>
        </View>
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

export default Tile;
