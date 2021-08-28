import * as React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";

import PillSVG from "../assets/images/PillSVG";
import useColorScheme from "../hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient,
} from "../constants/Colors";
import TileBase, { TileSize } from "./TileBase";

export enum HomeTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}

interface TileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  type: HomeTileTypes;
  subtitle: string;
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

const Tile: React.FC<TileDetails> = ({ title, style, size, index, type, subtitle }) => {
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
    <TileBase style={style} size={size} gradient={tileGradient}>
      <View style={styles.content}>
        <View style={styles.left}>
          <MaterialCommunityIcons
            name="pill"
            size={42}
            color={index == 0 ? "white" : "#24AC29"}
          />
          <View style={styles.textContent}>
            <Text style={{ color: textColor, fontSize: 14, opacity: 0.68 }}>
              {title}
            </Text>
            <Text style={{ color: textColor, fontSize: 16 }}>{subtitle}</Text>
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
