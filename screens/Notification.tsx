import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  KeyboardAvoidingView,
} from "react-native";
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
import { View, Text, ScrollView } from "react-native";
import SafeView from "../components/SafeView";
import { PressableBase } from "../components/PressableBase";
import { RootStackParamList, HomeTileTypes } from "../types";
import { useStores } from "../models/root-store-provider";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  SQLAlertReturnType,
  SQLAppointmentsReturnType,
  SQLRoutineReturnType,
} from "../database/db.types";
import CustomHaptics from "../utils/CustomHaptics";
import moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";

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
    params: { id, type, title, notes, clear },
  },
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const { homeScreenStore } = useStores();
  const { showActionSheetWithOptions } = useActionSheet();

  const [currentAlert, setCurrentAlert] = React.useState<SQLAlertReturnType>();

  React.useEffect(() => {
    //console.log(id);
    homeScreenStore.getAlertDetails(id).then((alert) => {
      if (!alert) return;
      //console.log(alert);
      setCurrentAlert(alert);
      if (clear) {
        Notifications.dismissNotificationAsync(alert.systemId);
      }
      setCurrentAlertTime(new Date(alert.time));
      setCurrentEventTime(new Date(alert.eventTime));
      setCurrentCompleted(alert.completed === 1);
      if (alert.appointmentId && !alert.routineId) {
        homeScreenStore
          .getAppointmentDetailsFromAlert(alert)
          .then((appointment) => {
            if (!appointment) return;
            //console.log(appointment);
            setCurrentTitle(appointment.doctor);
            setCurrentNotes(appointment.notes);
          });
      } else if (alert.routineId && !alert.appointmentId) {
        homeScreenStore.getRoutineDetailsFromAlert(alert).then((routine) => {
          if (!routine) return;
          //console.log(routine);
          setCurrentTitle(routine.title);
          setCurrentNotes(routine.notes);
        });
      }
    });
  }, [id]);

  const [currentTitle, setCurrentTitle] = React.useState(title);
  const [currentNotes, setCurrentNotes] = React.useState(notes);
  const [currentAlertTime, setCurrentAlertTime] = React.useState<Date>();
  const [currentEventTime, setCurrentEventTime] = React.useState<Date>();
  const [currentCompleted, setCurrentCompleted] = React.useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [editingDate, setEditingDate] = React.useState<Date>();
  const [isEditingAlert, setIsEditingAlert] = React.useState(false);

  const [editing, setEditing] = React.useState(false);
  const handleSave = () => {
    setCurrentTitle(currentTitle.trim());
    setCurrentNotes(currentNotes.trim());
    const updateDB = async () => {
      console.log(currentAlert?.id);
      homeScreenStore.updateAlert(
        currentAlert?.id!,
        currentTitle,
        currentNotes,
        currentEventTime!,
        currentAlertTime!
      );
    };
    if (currentAlert) updateDB();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    if (isEditingAlert && newDate <= new Date()) {
      Alert.alert("Invalid Time", "Please select a time in the past");
      return;
    }
    if (isEditingAlert) setCurrentAlertTime(newDate);
    else setCurrentEventTime(newDate);
    setEditingDate(undefined);
    hideDatePicker();
  };

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const startShake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.25,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -0.25,
          duration: 60,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.0,
          duration: 30,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

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
          onPress={() => {
            if (editing) {
              setEditing(false);
              handleSave();
              return;
            }
            if (currentCompleted) {
              showActionSheetWithOptions(
                {
                  options: ["Delete", "Cancel"],
                  cancelButtonIndex: 1,
                  destructiveButtonIndex: 0,
                },
                (selection) => {
                  if (selection === 0) {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to delete this tile?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => {
                            homeScreenStore.deleteAlert(id);
                            navigation.pop();
                          },
                        },
                      ]
                    );
                  }
                }
              );
            } else {
              showActionSheetWithOptions(
                {
                  options: ["Edit", "Delete", "Cancel"],
                  cancelButtonIndex: 2,
                  destructiveButtonIndex: 1,
                },
                (selection) => {
                  if (selection === 0) {
                    setEditing(true);
                    startShake();
                  } else if (selection === 1) {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to delete this tile?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => {
                            homeScreenStore.deleteAlert(id);
                            navigation.pop();
                          },
                        },
                      ]
                    );
                  }
                }
              );
            }
          }}
          extraProps={{
            style: { alignSelf: "center", padding: 10, opacity: 0.8 },
          }}
        >
          {editing ? (
            <Text style={styles.done}>Save</Text>
          ) : (
            <Feather name="more-horizontal" size={24} color="#fff" />
          )}
        </PressableBase>
      </View>
      <View style={styles.centerView}>
        {editing ? (
          <>
            <KeyboardAvoidingView
              style={{
                height: editing ? 600 : 225,
                width: Dimensions.get("window").width,
                paddingBottom: 20,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX: animatedValue,
                      },
                      {
                        translateY: animatedValue,
                      },
                      {
                        rotate: animatedValue.interpolate({
                          inputRange: [-1, 1],
                          outputRange: ["-0.1rad", "0.1rad"],
                        }),
                      },
                    ],
                    backgroundColor: "transparent",
                    marginBottom: 20,
                  }}
                >
                  <Icon
                    name={iconType}
                    props={{
                      fill: "#fff",
                      width: 80,
                      height: 80,
                    }}
                  />
                </Animated.View>
                {isDatePickerVisible ? (
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {isEditingAlert
                      ? "Editing Alert Time"
                      : "Editing Event Time"}
                  </Text>
                ) : null}
                <Text
                  style={{
                    marginTop: 5,
                    marginBottom: 5,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Title
                </Text>
                <TextInput
                  style={[
                    styles.textinput,
                    {
                      width: Dimensions.get("window").width - 80,
                    },
                  ]}
                  placeholder="Title"
                  placeholderTextColor="lightgrey"
                  value={currentTitle}
                  multiline={false}
                  onChangeText={(text) => setCurrentTitle(text)}
                />
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Notes
                </Text>
                <TextInput
                  style={[
                    styles.textinput,
                    {
                      width: Dimensions.get("window").width - 80,
                    },
                  ]}
                  placeholder="Notes"
                  placeholderTextColor="lightgrey"
                  value={currentNotes}
                  multiline={true}
                  onChangeText={(text) => setCurrentNotes(text)}
                />
                <Text
                  style={{
                    marginTop: 15,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Event Time
                </Text>
                <PressableBase
                  extraProps={{
                    style: {
                      marginTop: 15,
                      borderRadius: 16,
                      width: Dimensions.get("window").width - 80,
                      height: 70,
                      backgroundColor: "rgb(0,0,0,0.9)",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth:
                        isDatePickerVisible && !isEditingAlert ? 4 : 2,
                      borderColor: "lightgrey",
                      padding: 20,
                      alignContent: "center",
                    },
                  }}
                  onPress={() => {
                    setEditingDate(currentEventTime);
                    setIsEditingAlert(false);
                    showDatePicker();
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {moment(currentEventTime).format("LLL")}
                  </Text>
                </PressableBase>

                <Text
                  style={{
                    marginTop: 15,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Alert Time
                </Text>
                <PressableBase
                  extraProps={{
                    style: {
                      marginTop: 15,
                      borderRadius: 16,
                      width: Dimensions.get("window").width - 80,
                      height: 70,
                      backgroundColor: "rgb(0,0,0,0.9)",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth:
                        isDatePickerVisible && isEditingAlert ? 4 : 2,
                      borderColor: "lightgrey",
                      padding: 20,
                      alignContent: "center",
                    },
                  }}
                  onPress={() => {
                    if (!currentAlertTime || currentAlertTime.getTime() <= 1) {
                      setEditingDate(new Date());
                    } else {
                      setEditingDate(currentAlertTime);
                    }
                    setIsEditingAlert(true);
                    showDatePicker();
                  }}
                >
                  {!currentAlertTime || currentAlertTime.getTime() <= 1 ? (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      No Alert Set
                    </Text>
                  ) : null}
                  {!currentAlertTime ||
                  currentAlertTime.getTime() <= 1 ? null : (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {moment(currentAlertTime).format("LLL")}
                    </Text>
                  )}
                </PressableBase>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        ) : (
          <>
            <View
              style={{
                height: 225,
                width: Dimensions.get("window").width,
                paddingBottom: 20,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <Icon
                  name={iconType}
                  props={{
                    fill: "#fff",
                    width: 80,
                    height: 80,
                  }}
                />
                <Text style={[styles.name]}>{currentTitle}</Text>
                <Text style={[styles.notes]}>{currentNotes}</Text>
              </ScrollView>
            </View>
            <Text style={styles.time}>
              {moment(currentEventTime).format("lll")}
            </Text>
            <Text style={[styles.time, { opacity: 0.7 }]}>
              {!currentAlertTime || currentAlertTime!.getTime() <= 1
                ? "No Alert set"
                : moment(currentAlertTime).format("[Alert at ]lll")}
            </Text>
          </>
        )}
      </View>
      <View style={styles.bottomGroup}>
        {editing ? null : currentCompleted ? (
          <View
            style={{
              padding: 50,
              paddingBottom: 75,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.75,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Completed
            </Text>
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            {currentAlert?.time === 0 ? null : (
              <ActionButton
                label="SNOOZE"
                iconName="Time"
                fillColor={colorTheme}
                onPress={() => {
                  CustomHaptics("extralight");
                  // delete and create new alert
                  showActionSheetWithOptions(
                    {
                      title: `Snooze for:`,
                      options: [
                        "5 minutes",
                        "10 minutes",
                        "20 minutes",
                        "Cancel",
                      ],
                      cancelButtonIndex: 3,
                    },
                    (selection) => {
                      if (selection !== 3) {
                        const snoozeInt = selection + 1;
                        homeScreenStore.snoozeAlert(
                          id,
                          snoozeInt === 3 ? 20 : snoozeInt * 5
                        );
                        navigation.pop();
                      }
                    }
                  );
                }}
              />
            )}

            <ActionButton
              label="DONE"
              iconName="Checkmark"
              fillColor={colorTheme}
              onPress={() => {
                CustomHaptics("extralight");
                homeScreenStore.setAlertCompleted(id, true);
                navigation.pop();
              }}
            />
            <ActionButton
              label="IGNORE"
              iconName="Ignore"
              fillColor={colorTheme}
              onPress={() => {
                CustomHaptics("extralight");
                navigation.pop();
              }}
            />
          </View>
        )}
        <PressableBase
          onPress={() => navigation.pop()}
          extraProps={{ style: { alignSelf: "center", paddingBottom: 20 } }}
        >
          <Entypo name="chevron-down" size={35} color="#fff" />
        </PressableBase>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={editingDate}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Select Time"
      />
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
    marginBottom: 5,
    textAlign: "center",
  },
  time: {
    fontSize: 16,
    opacity: 0.9,
    color: "#fff",
    marginBottom: 5,
  },
  notes: {
    fontSize: 18,
    opacity: 0.6,
    color: "#fff",
    textAlign: "center",
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
  done: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    padding: 5,
  },
  textinput: {
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    paddingTop: 20,
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    maxHeight: 200,
  },
});

export default NotificationScreen;
