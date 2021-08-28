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
import SymptomsData from "../assets/Symptoms.json";


import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient,
} from "../constants/Colors";
import TileBase, { TileSize } from "./TileBase";

export enum EntryTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}

interface TileDetails {
  title: string ;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  type: EntryTileTypes;
  list: string;
}

const getGradient = (type: EntryTileTypes) => {
  switch (type) {
    case EntryTileTypes.Medication:
      return medicationGradient;
    case EntryTileTypes.Exercise:
      return exerciseGradient;
    case EntryTileTypes.Appointment:
      return appointmentGradient;
    default:
      return ["fff", "fff"];
  }
};

const Tile: React.FC<TileDetails> = ({ title, style, size, index, type, list }) => {
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
            <Text style={{ color: textColor, fontSize: 16 }}>{title}</Text>
          </View>
        </View>
        {list == "symptoms" ? (
          <View style={styles.right}>
                      <Text>
            {/* {SymptomsData.slice(0, 4).map((symptom) => {
              return (
                <Text key={symptom.id}>
                  {symptom.description}
                  {"\n"}
                </Text>
              );
            })} */}
            pain{"\n"}
            itchy{"\n"}
            hot {"\n"}
            cold{"\n"}
            ...
          </Text>
          </View>
        ) : 
          <View style={styles.right}>
            <Text>
              {/* {SymptomsData.slice(0, 4).map((symptom) => {
                return (
                  <Text key={symptom.id}>
                    {symptom.description}
                    {"\n"}
                  </Text>
                );
              })} */}
              sleep{"\n"}
              breath{"\n"}
              see{"\n"}
              hear{"\n"}
              ...
            </Text>
          </View>
        }
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
