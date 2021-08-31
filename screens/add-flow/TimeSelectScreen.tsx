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
import { CompositeScreenProps } from "@react-navigation/core";

import SafeView from "../../components/SafeView";
import {
  AddFlowParamList,
  ProgressFlowParamList,
  RootStackParamList,
} from "../../types";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import ProgressBar from "./ProgressBar";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { Calendar, DateObject } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TileBase from "../../components/TileBase";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<ProgressFlowParamList, "TimeSelectScreen">,
  CompositeScreenProps<
    StackScreenProps<AddFlowParamList>,
    StackScreenProps<RootStackParamList>
  >
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

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const now = new Date();
  const colorScheme = useColorScheme();
  const [selection, setSelection] = React.useState<DateSelection[]>([
    {
      dateobj: {
        dateString: now.toISOString().split("T")[0],
        day: now.getDay(),
        month: now.getMonth(),
        year: now.getFullYear(),
        timestamp: now.getTime(),
      },
      date: new Date(now),
    },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [editingDate, setEditingDate] = React.useState<Date>();
  const [editingDateStr, setEditingDateStr] = React.useState<string>();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    setSelection((prev) =>
      prev.map((d) => {
        if (d.dateobj.dateString === editingDateStr) {
          d.date = newDate;
        }
        return d;
      })
    );
    hideDatePicker();
  };

  return (
    <SafeView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 125,
        }}
      >
        <Calendar
          maxDate={new Date()}
          hideExtraDays={true}
          style={{
            marginLeft: 25,
            marginRight: 25,
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
          onDayPress={(day) =>
            dateInSelection(day, selection)
              ? setSelection((prev) =>
                  prev.filter(
                    (item) => item.dateobj.dateString !== day.dateString
                  )
                )
              : setSelection((prev) => [
                  ...prev,
                  {
                    dateobj: day,
                    date: new Date(
                      day.dateString + `${moment().format("THH:mm:ss")}`
                    ),
                  },
                ])
          }
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            todayTextColor: "#45B649",
            arrowColor: colorScheme === "light" ? "#333" : "#fff",
            monthTextColor: colorScheme === "light" ? "#333" : "#fff",
            dayTextColor: colorScheme === "light" ? "#333" : "#fff",
            textDisabledColor: colorScheme === "light" ? "#cbcbcb" : "#6f6f6f",
            textMonthFontWeight: "500",
            textDayFontWeight: "500",
            textDayFontSize: 16,
            textMonthFontSize: 18,
          }}
        />
        <View>
          {selection.sort((a, b) => (a.date < b.date ? 1 : -1)) &&
            selection.map((item) => (
              <TileBase
                key={item.dateobj.dateString}
                gradient={
                  colorScheme === "light"
                    ? ["#fff", "#fff"]
                    : ["#252525", "#252525"]
                }
                style={{
                  width: Dimensions.get("window").width - 80,
                  height: 100,
                  marginTop: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  setEditingDate(item.date);
                  setEditingDateStr(item.dateobj.dateString);
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
            ))}
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={editingDate}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={
          selection.length > 0
            ? () => navigation.navigate("AreaSelectScreen")
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
  child: {
    marginTop: 50,
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  childtwo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  numberView: {
    width: 210,
  },
  sliderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  numbers: {
    opacity: 0.5,
    fontWeight: "600",
    fontSize: 16,
  },
  emoji: {
    fontSize: 135,
  },
  desc: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  greeting: {
    flex: 1,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
});
