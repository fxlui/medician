import { StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient,
} from "../constants/Colors";
import Icon from "../components/Icon";
import { View, Text } from "react-native";
import SafeView from "../components/SafeView";
import { PressableBase } from "../components/PressableBase";
import { RootStackParamList, HomeTileTypes } from "../types";

type ScreenProps = StackScreenProps<RootStackParamList, "Notification">;

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

const NotificationScreen = ({
  navigation,
  route: {
    params: { id, type, title, notes },
  },
}: ScreenProps) => {
  const insets = useSafeAreaInsets();

  const iconType =
    type === HomeTileTypes.Appointment
      ? "Appointment"
      : type === HomeTileTypes.Exercise
      ? "Exercise"
      : "Medication";

  const colorTheme =
    type === HomeTileTypes.Appointment
      ? appointmentGradient[1]
      : type === HomeTileTypes.Medication
      ? medicationGradient[0]
      : exerciseGradient[0];

  return (
    <LinearGradient
      colors={getGradient(type)}
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.top}>
        <PressableBase
          onPress={() => navigation.pop()}
          extraProps={{
            style: { alignSelf: "center", padding: 10, opacity: 0.8 },
          }}
        >
          <Feather name="edit" size={25} color="#fff" />
        </PressableBase>
      </View>
      <View style={styles.centerView}>
        <Icon name={iconType} props={{ fill: "#fff", width: 80, height: 80 }} />
        <Text style={[styles.name]}>{title}</Text>
        <Text style={[styles.notes]}>{notes}</Text>
      </View>
      <View style={styles.bottomGroup}>
        <View style={styles.buttonGroup}>
          <ActionButton
            label="SNOOZE"
            iconName="Time"
            fillColor={colorTheme}
            onPress={() => navigation.pop()}
          />
          <ActionButton
            label="DONE"
            iconName="Checkmark"
            fillColor={colorTheme}
            onPress={() => navigation.pop()}
          />
          <ActionButton
            label="IGNORE"
            iconName="Ignore"
            fillColor={colorTheme}
            onPress={() => navigation.pop()}
          />
        </View>
        <PressableBase
          onPress={() => navigation.pop()}
          extraProps={{ style: { alignSelf: "center", paddingBottom: 20 } }}
        >
          <Entypo name="chevron-down" size={35} color="#fff" />
        </PressableBase>
      </View>
    </LinearGradient>
  );
};

const ActionButton: FC<{
  onPress: () => void;
  label: string;
  iconName: string;
  fillColor: string;
}> = ({ onPress, label, iconName, fillColor }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.3}
        style={styles.actionButton}
      >
        <Icon
          name={iconName}
          props={{ fill: fillColor, width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <Text style={[styles.buttonLabel]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  top: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    marginTop: 20,
  },
  centerView: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "#fff",
    marginTop: 20,
  },
  notes: {
    fontSize: 18,
    opacity: 0.6,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonLabel: {
    opacity: 0.7,
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  actionButton: {
    width: 60,
    height: 60,
    marginBottom: 15,
    opacity: 0.6,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    paddingLeft: 70,
    paddingRight: 70,
    marginBottom: 90,
  },
  bottomGroup: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignContent: "center",
  },
});

export default NotificationScreen;
