import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import * as Haptics from "expo-haptics";

import { PressableBase } from "./PressableBase";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";

const AddFlowNavBar: React.FC<{ left: () => void; right: () => void }> = ({
  left,
  right,
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        paddingBottom: 30,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width,
      }}
    >
      <PressableBase
        extraProps={{
          style: {
            padding: 30,
            paddingLeft: 80,
            paddingRight: 55,
          },
          ariaLabel: "Navigate to previous screen",
        }}
        onPress={left}
      >
        <Entypo
          name="chevron-left"
          size={28}
          color={colorScheme === "light" ? "#333" : "#fff"}
        />
      </PressableBase>
      <PressableBase
        extraProps={{
          style: {
            padding: 30,
            paddingLeft: 55,
            paddingRight: 80,
          },
          ariaLabel: "Navigate to next screen",
        }}
        onPress={right}
      >
        <Entypo
          name="chevron-right"
          size={28}
          color={colorScheme === "light" ? "#333" : "#fff"}
        />
      </PressableBase>
    </View>
  );
};

export default AddFlowNavBar;
