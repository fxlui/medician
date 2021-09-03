import * as React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "./Icon";
import { Text } from "./Themed";
import TileBase, { TileSize } from "./TileBase";
import useColorScheme from "../hooks/useColorScheme";

interface TileDetails {
  title: string;
  subtitle: string;
}

const Tile: React.FC<TileDetails> = ({ title, subtitle }) => {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  return (
    <TileBase size={TileSize.ActionAdd} gradient={[tileColor, tileColor]}>
      <View style={styles.content}>
        {subtitle === "Routine"
          ?
          <View style={{ flexDirection: "row" }}>
            <Icon name="Exercise" props={{
              fill: "#4E54C8",
              width: 42,
              height: 42
            }}/>
            <Icon name="Medication" props={{
              fill: "#24AC29",
              width: 42,
              height: 42
            }}/>
          </View>
          : 
          <View>
            <Icon name="Appointment" props={{
              fill: "#18BDF1",
              width: 42,
              height: 42
            }}/>
          </View>
        }
        <View>
          <Text style={{ fontSize: 14, opacity: 0.68, fontWeight: "600" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {subtitle}
          </Text>
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
  }
});

export default Tile;
