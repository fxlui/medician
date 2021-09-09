import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Text, View } from "../components/Themed";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, AddFlowParamList } from "../types";
import { useActionSheet } from "@expo/react-native-action-sheet";

import Timeline from "react-native-timeline-flatlist";
import { observer } from "mobx-react-lite";
import useColorScheme from "../hooks/useColorScheme";
import TileBase, { TileSize } from "../components/TileBase";
import moment from "moment";
import { useStores } from "../models/root-store-provider";
import { SavedRecordSnapshot } from "../models/record";
import { themeTextColor, themeTileColor } from "../constants/Colors";

type ScreenProps = StackScreenProps<RootStackParamList, "Timeline">;

interface timelineItemType {
  id: number;
  time: Date;
  emoji: string;
  severity: string;
}

const getDiscomfortEmoji = (severity: number) => {
  if (severity < 4) {
    return "😐";
  } else if (severity < 7) {
    return "😕";
  } else if (severity < 10) {
    return "😖";
  } else {
    return "😡";
  }
};

const getDiscomfortText = (severity: number) => {
  if (severity < 4) {
    return "Minor discomfort";
  } else if (severity < 7) {
    return "Moderate discomfort";
  } else if (severity < 10) {
    return "Severe discomfort";
  } else {
    return "Unbearable";
  }
}

const getTimeString = (timestamp: number) => {
  return `${moment(timestamp).format("MMM D")}\n${moment().format("HH:mm")}`;
}

const TimelineScreen = observer(({ navigation, route }: ScreenProps) => {
  
    const { editFlowStore, progressStore } = useStores();
    const [timelineRecords, setTimelineRecords] = useState<SavedRecordSnapshot[]>([]);

    function useEditDirect(symptomType: string) {
      progressStore.resetProgress();
      switch (symptomType) {
        case "pain":
        case "itchy":
          progressStore.setProgressBarLength(3);
          navigation.navigate("AddFlow", {
            screen: "SeverityScreen",
            params: { method: "edit" }
          });   // also set progress bar length
          break;
        case "hot":
        case "cold":
          progressStore.setProgressBarLength(5);
          navigation.navigate("AddFlow", {
            screen: "TemperatureSelectionScreen",
            params: { method: "edit" }
          });
          break;
        case "toilet":
          progressStore.setProgressBarLength(6);
          navigation.navigate("AddFlow", {
            screen: "ToiletScreen",
            params: { method: "edit" }
          });
          break;
        case "dizzy":
        case "walk":
          progressStore.setProgressBarLength(4);
          navigation.navigate("AddFlow", {
            screen: "DizzyScreen",
            params: { method: "edit" }
          });
          break;
        case "sleep":
          progressStore.setProgressBarLength(4);
          navigation.navigate("AddFlow", {
            screen: "SleepHoursScreen",
            params: { method: "edit" }
          });
          break;
        default:
          progressStore.setProgressBarLength(4);
          navigation.navigate("AddFlow", {
            screen: "CustomScreen",
            params: { method: "edit" }
          });
          break;
      }
    }
  
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus",
        async () => {
          navigation.setOptions({
            headerTitle: route.params.area,
          });
          await editFlowStore.fetchTimelineRecordsAsync(
            route.params.collectionId, route.params.area
          );
          const records = editFlowStore.getTimelineRecordsSnapshot();
          setTimelineRecords(records);
        }
      );
      return unsubscribe;
    }, []);
  
    const colorScheme = useColorScheme();
    const lineColor = colorScheme === "light" ? "#E9E9E9" : "#333";
    const textColor =
      colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
    const tileColor =
      colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  
    const { showActionSheetWithOptions } = useActionSheet();
  
    const renderTimelineTile = (item: timelineItemType) => {
      return (
        <TileBase
          size={TileSize.Long}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            alignSelf: "stretch",
            marginLeft: 5,
          }}
          gradient={[tileColor, tileColor]}
          onClick={() => {
            showActionSheetWithOptions(
              {
                title: `${route.params.type} on ${
                  route.params.area
                } at ${moment().format("MMM D HH:mm")}`,
                options: ["Details", "Edit", "Delete", "Cancel"],
                cancelButtonIndex: 3,
                destructiveButtonIndex: 2,
              },
              async (selection) => {
                if (selection === 0) {
                  await editFlowStore.setCurrentEditingRecordFetchAsync(item.id, route.params.type);
                  navigation.navigate("TimelineDetails", {
                    id: item.id
                  });
                } else if (selection === 1) {
                  await editFlowStore.setCurrentEditingRecordFetchAsync(item.id, route.params.type);
                  useEditDirect(editFlowStore.currentSymptomType);
                } else if (selection === 2) {
                  Alert.alert(
                    "Delete",
                    `Are you sure you want to delete the following entry?\n\n${
                      route.params.type
                    } on ${route.params.area} at ${moment().format(
                      "MMM D HH:mm"
                    )}`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          // delete
                          // remove from state
                        },
                      },
                    ]
                  );
                }
              }
            );
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              alignSelf: "stretch",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginRight: 15,
                marginLeft: 15,
              }}
            >
              {item.emoji}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                textAlign: "right",
                color: textColor,
              }}
            >
              {item.severity}
            </Text>
          </View>
        </TileBase>
      );
    };
  
    const Header = () => (
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: -60,
          backgroundColor: "transparent",
          opacity: 0.7,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16 }}>
          All {route.params.type} occurrences at {route.params.area}
        </Text>
      </View>
    );
  
    return (
      <Timeline
        style={styles.list}
        data={timelineRecords.map(
          item => ({
            id: item.id,
            time: getTimeString(item.time),
            emoji: getDiscomfortEmoji(item.severity),
            severity: getDiscomfortText(item.severity)
          })
        )}
        separator={false}
        circleSize={15}
        circleColor={lineColor}
        lineColor={lineColor}
        renderFullLine={true}
        timeContainerStyle={{ minWidth: 52 }}
        timeStyle={{
          textAlign: "center",
          color: "grey",
          padding: 5,
          borderRadius: 13,
          overflow: "visible",
          marginTop: 15,
        }}
        listViewContainerStyle={{
          paddingTop: 20,
        }}
        detailContainerStyle={{
          marginBottom: 0,
          marginRight: 20,
          padding: 0,
        }}
        rowContainerStyle={{
          marginLeft: 20,
        }}
        circleStyle={{
          marginTop: 30,
        }}
        renderDetail={renderTimelineTile}
        // @ts-ignore
        options={{
          ListHeaderComponent: Header,
        }}
      />
    );
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  list: {
    overflow: "visible",
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
});

export default TimelineScreen;
