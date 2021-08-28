import React from "react";
import { StyleSheet, Button, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import {
  medicationGradient,
  exerciseGradient,
  appointmentGradient
} from "../constants/Colors";
import SafeView from "../components/SafeView";
import { View, Text } from "react-native";
import { RootStackParamList, HomeTileTypes } from "../types";

type ScreenProps = StackScreenProps<RootStackParamList, "Notification">;

const NotificationScreen = ({ navigation,
  route : { params : { itemId, type } }
} : ScreenProps) => {

  return (
    <SafeView style={[styles.container,
      type === HomeTileTypes.Appointment
      ? styles.exerciseBg
      : type === HomeTileTypes.Medication
      ? styles.medicationBg
      : styles.exerciseBg
    ]}>
      <StatusBar barStyle="light-content" />
      <View />
      <View>
        <Text style={styles.text}>
          Notification
        </Text>
        <Text>
          {itemId}
          {type}
        </Text>
      </View>
      <View>
        <Button
          title="back"
          onPress={() => navigation.pop()}
        />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#fff"
  },
  appointmentBg: {
    backgroundColor: appointmentGradient[0]
  },
  medicationBg: {
    backgroundColor: medicationGradient[0]
  },
  exerciseBg: {
    backgroundColor: exerciseGradient[0]
  }
});

export default NotificationScreen;