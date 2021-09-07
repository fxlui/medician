import React from "react";
import moment from "moment";
import {
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Dimensions,
} from "react-native";

import SafeView from "../../components/SafeView";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { Calendar, DateObject } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import SwipeBar from "../../components/SwipeBar";
import TileBase from "../../components/TileBase";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { useStores } from "../../models/root-store-provider";
import { AddFlowParamList, RootStackParamList } from "../../types";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "AppointmentTimeScreen">,
  StackScreenProps<RootStackParamList>
>;

interface DateSelection {
  dateobj: DateObject;
  date: Date;
}

const dateInSelection = (day: DateObject, list: DateSelection[]) => {
  let result = false;
  list.forEach((item) => {
    if (item.dateobj.dateString === day.dateString) {
      result = true;
    }
  });
  return result;
};

export default function AppointmentTimeScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const [selection, setSelection] = React.useState<DateSelection[]>([]);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [editingDate, setEditingDate] = React.useState<Date>();

  const { addFlowStore } = useStores();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setEditingDate(undefined);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    setSelection((prev) =>
      prev.map((d) => {
        if (d.date === editingDate) {
          d.date = newDate;
        }
        return d;
      })
    );
    setEditingDate(undefined);
    hideDatePicker();
  };

  const handleNavigation = () => {
    addFlowStore.goForward();
    addFlowStore
      .currentNewAppointment
      .setAppointmentTime(selection.map(item => item.date));
    navigation.navigate("AppointmentDetailsScreen");
  }

  return (
    <SafeView style={styles.container} disableTop>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 125,
        }}
      >
        <Text style={styles.greeting}>When is your appointment?</Text>
        <Text style={styles.greetingSub}>
          Select the dates you have booked.
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Calendar
            hideExtraDays={true}
            style={{
              marginLeft: 25,
              marginRight: 25,
              marginTop: 10,
              marginBottom: 10,
              width: Dimensions.get("window").width - 50,
            }}
            markedDates={selection.reduce(
              (obj: { [date: string]: any }, v: DateSelection) => {
                obj[v.dateobj?.dateString] = {
                  selected: true,
                  selectedColor: "#F6312A",
                };
                return obj;
              },
              {}
            )}
            onDayPress={(day) => {
              const now = moment();
              if (dateInSelection(day, selection)) {
                setSelection((prev) =>
                  prev.filter((d) => d.dateobj.dateString !== day.dateString)
                );
              } else {
                setSelection((prev) => [
                  ...prev,
                  {
                    dateobj: day,
                    date: moment(
                      `${day.dateString} ${now.format("HH:mm:ss.SSSSSSSSSSSS")}`
                    ).toDate(),
                  },
                ]);
              }
            }}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              todayTextColor: "#45B649",
              arrowColor: colorScheme === "light" ? "#333" : "#fff",
              monthTextColor: colorScheme === "light" ? "#333" : "#fff",
              dayTextColor: colorScheme === "light" ? "#333" : "#fff",
              textDisabledColor:
                colorScheme === "light" ? "#cbcbcb" : "#6f6f6f",
              textMonthFontWeight: "500",
              textDayFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
          />
          <View>
            {selection.sort((a, b) => (a.date > b.date ? 1 : -1)) &&
              selection.map((item) => (
                <SwipeBar
                  key={item.date.getTime()}
                  onPress={() => {
                    Alert.alert(
                      "Delete appointment?",
                      `Are you sure you want to remove the appointment at ${item.date.toLocaleString()}?`,
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            setSelection((prev) =>
                              prev.filter((d) => d.date !== item.date)
                            );
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <TileBase
                    gradient={
                      colorScheme === "light"
                        ? ["#fff", "#fff"]
                        : ["#252525", "#252525"]
                    }
                    style={{
                      width: Dimensions.get("window").width - 80,
                      height: 100,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderWidth: editingDate === item.date ? 2 : 0,
                      borderColor: "#45B649",
                    }}
                    onClick={() => {
                      setEditingDate(item.date);
                      showDatePicker();
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {moment(item.date).format("MMM DD")}
                    </Text>
                    <Text style={{ fontSize: 34 }}>
                      {moment(item.date).format("HH:mm")}
                    </Text>
                  </TileBase>
                </SwipeBar>
              ))}
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={editingDate}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Select Time"
      />
      <AddFlowNavBar
        preventRightDefault
        left={() => navigation.pop()}
        right={
          selection.length > 0
            ? handleNavigation
            : () =>
                Alert.alert(
                  "No selection yet",
                  "In order to add a new record, you will need to select the date and times of appointments."
                )
        }
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    paddingLeft: 30,
    marginTop: 15,
  },
  greetingSub: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 30,
    opacity: 0.5,
  },
});
