import React from "react";
import moment from "moment";
import {
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import SafeView from "../../components/SafeView";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { useStores } from "../../models/root-store-provider";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { Calendar, DateObject } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import SwipeBar from "../../components/SwipeBar";
import TileBase from "../../components/TileBase";

type ScreenProps = StackScreenProps<AddFlowParamList, "TimeSelectScreen">;

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

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const [selection, setSelection] = React.useState<DateSelection[]>([]);
  const { addFlowStore, progressStore } = useStores();

  React.useEffect(() => {
    const now = new Date();
    const nowOffset = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    );
    if (selection.length === 0) {
      setSelection([
        {
          dateobj: {
            dateString: nowOffset.toISOString().split("T")[0],
            day: nowOffset.getDay(),
            month: nowOffset.getMonth(),
            year: nowOffset.getFullYear(),
            timestamp: now.getTime(),
          },
          date: now,
        },
      ]);
    }
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [editingDate, setEditingDate] = React.useState<Date>();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setEditingDate(undefined);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    if (newDate > new Date()) {
      Alert.alert("Invalid Time", "Please select a time in the past");
      return;
    }
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

  return (
    <SafeView style={styles.container} disableTop>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 125,
        }}
      >
        <Text style={styles.greeting}>When did it occur?</Text>
        <Text style={styles.greetingSub}>
          You can select multiple dates and times by tapping on the dates.
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Calendar
            maxDate={new Date()}
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
              const newDate = moment(
                `${day.dateString} ${now.format("HH:mm")}:00`
              ).toDate();
              let update = true;
              selection.forEach((item) => {
                if (item.date.getTime() === newDate.getTime()) {
                  update = false;
                  Alert.alert(
                    "Existing time",
                    "You have already selected this time. Please select another time or change the existing time."
                  );
                }
              });
              if (update)
                setSelection((prev) => {
                  return [
                    ...prev,
                    {
                      dateobj: day,
                      date: newDate,
                    },
                  ];
                });
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
                      "Delete occurance?",
                      `Are you sure you want to remove the occurance at ${item.date.toLocaleString()}?`,
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
            ? () => {
                progressStore.goForward();
                addFlowStore.currentNewRecord.setRecordTime(
                  selection.map((item) => item.date)
                );
                navigation.navigate("DetailsScreen", { method: "add" });
              }
            : () =>
                Alert.alert(
                  "No selection yet",
                  "In order to add a new record, you will need to select the date and times of occurances."
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
    maxWidth: "85%",
  },
});
