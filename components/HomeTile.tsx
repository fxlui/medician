import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "./Themed";
import { useColorScheme } from "react-native";
import Icon from "./Icon";
import { Ionicons } from "@expo/vector-icons";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient,
} from "../constants/Colors";
import { HomeTileTypes } from "../types";
import TileBase, { TileSize } from "./TileBase";

interface HomeTileProps {
  title: string;
  secondTitle?: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  type: HomeTileTypes;
  onPress: () => void;
  overDue?: boolean;
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

const getIcon = (type: HomeTileTypes, index: Number | undefined) => {
  switch (type) {
    case HomeTileTypes.Medication:
      return index === 0 ? (
        <Icon
          name="Medication"
          props={{
            fill: "white",
          }}
        />
      ) : (
        <Icon name="Medication" />
      );
    case HomeTileTypes.Exercise:
      return index === 0 ? (
        <Icon
          name="Exercise"
          props={{
            fill: "white",
          }}
        />
      ) : (
        <Icon name="Exercise" />
      );
    case HomeTileTypes.Appointment:
      return index === 0 ? (
        <Icon
          name="Appointment"
          props={{
            fill: "white",
          }}
        />
      ) : (
        <Icon name="Appointment" />
      );
    default:
      return null;
  }
};

const Tile: React.FC<HomeTileProps> = ({
  title,
  secondTitle,
  subTitle,
  style,
  size,
  index,
  type,
  onPress,
  overDue = false,
}) => {
  const colorScheme = useColorScheme();
  const textColor =
    index === 0 ? "#fff" : colorScheme === "light" ? "#333333" : "#fff";

  const tileGradient =
    index === 0
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
          <View
            style={{
              backgroundColor: "transparent",
              opacity: 0.9,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                padding: 5,
              }}
            >
              {getIcon(type, index)}
            </View>
            {overDue ? (
              <Ionicons name="ios-time-outline" size={22} color={textColor} />
            ) : null}
          </View>
          <View style={styles.textContent}>
            <Text
              style={{
                color: textColor,
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 2,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            {secondTitle ? (
              <Text
                style={{ color: textColor, fontSize: 16, opacity: 0.9 }}
                numberOfLines={1}
              >
                {secondTitle}
              </Text>
            ) : null}
            {subTitle ? (
              <Text
                style={{
                  marginTop: 3,
                  color: textColor,
                  fontSize: 14,
                  opacity: 0.68,
                }}
                numberOfLines={1}
              >
                {subTitle}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "transparent",
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
