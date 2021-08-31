import {
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import React, { FC } from "react";
import { Entypo } from '@expo/vector-icons';
import { StackScreenProps } from "@react-navigation/stack";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient
} from "../constants/Colors";
import { View, Text } from "react-native";
// import { Text } from "../components/Themed";
import SafeView from "../components/SafeView";
import { PressableBase } from "../components/PressableBase";
import { RootStackParamList, HomeTileTypes } from "../types";

type ScreenProps = StackScreenProps<RootStackParamList, "Notification">;

const NotificationScreen = ({
  navigation,
  route: {
    params: { id, type, name, notes}
  }
} : ScreenProps) => {

  return (
    <SafeView style={[styles.container,
      type === HomeTileTypes.Appointment
      ? styles.appointmentBg
      : type === HomeTileTypes.Medication
      ? styles.medicationBg
      : styles.exerciseBg
    ]}>
      <StatusBar barStyle="dark-content" />
      <View />
      <View style={styles.centerView}>
        <Text style={[styles.text, styles.name]}>
          {name}
        </Text>
        <Text style={[styles.text, styles.notes]}>
          {notes}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <ActionButton
          label="SNOOZE"
          onPress={() => navigation.pop()}
        />
        <ActionButton
          label="DONE"
          onPress={() => navigation.pop()}
        />
        <ActionButton
          label="IGNORE"
          onPress={() => navigation.pop()}
        />
      </View>
      <PressableBase
        onPress={() => navigation.pop()}
      >
        <Entypo name="chevron-down" size={35} color="black" />
      </PressableBase>
    </SafeView>
  );
};

const ActionButton: FC<{
  onPress : () => void,
  label: string
}> = ({ onPress, label }) => {
  return(
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.4}
        style={styles.actionButton}
      />
      <Text style={[styles.text, styles.buttonLabel]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#fff"
  },
  centerView: {
    alignItems: "center"
  },
  name: {
    fontSize: 22,
    fontWeight: "500"
  },
  notes: {
    fontSize: 18,
    opacity: 0.6
  },
  appointmentBg: {
    backgroundColor: appointmentGradient[0]
  },
  medicationBg: {
    backgroundColor: medicationGradient[0]
  },
  exerciseBg: {
    backgroundColor: exerciseGradient[0]
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  buttonLabel: {
    opacity: 0.7,
    fontSize: 14,
    fontWeight: "500"
  },
  actionButton: {
    width: 60,
    height: 60,
    marginBottom: 15,
    opacity: 0.45,
    borderRadius: 30,
    backgroundColor: "#fff"
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    paddingLeft: 70,
    paddingRight: 70
  }
});

export default NotificationScreen;