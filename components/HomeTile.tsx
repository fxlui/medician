import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient,
} from "../constants/Colors";
import { HomeTileTypes } from "../types";
import TileBase, { TileSize } from "./TileBase";

interface HomeTileProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  type: HomeTileTypes;
  onPress: () => void;
}

const getGradient = (type: HomeTileTypes) => {
  switch (type) {
    case HomeTileTypes.Medication:
      return medicationGradient;
    case HomeTileTypes.Exercise:
      return exerciseGradient;
    case HomeTileTypes.Appointment:
      return appointmentGradient;
    default:
      return ["fff", "fff"];
  }
};

const Tile: React.FC<HomeTileProps> = ({
  title, style, size, index, type, onPress
}) => {
  const colorScheme = useColorScheme();
  const textColor =
    index == 0 ? "#fff" : colorScheme === "light" ? "#333333" : "#fff";

  const tileGradient =
    index == 0
      ? getGradient(type)
      : colorScheme === "light"
      ? ["#fff", "#fff"]
      : ["#252525", "#252525"];

  return (
    <TileBase
      onClick={onPress}
      style={style}
      size={size}
      gradient={tileGradient}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="pill"
            size={42}
            color={index == 0 ? "white" : "#24AC29"}
          />
          <View style={styles.textContent}>
            <Text style={{ color: textColor, fontSize: 16 }}>{title}</Text>
            <Text style={{ color: textColor, fontSize: 14, opacity: 0.68 }}>
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
});

export default Tile;
