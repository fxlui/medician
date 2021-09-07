import React, { useState } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeTileTypes } from "../types";
import { BottomTabParamList, RootStackParamList } from "../types";

import HomeTile from "../components/HomeTile";
import { TopTile } from "../components/AreaTile";
import OverviewSymptomTile from "../components/OverviewSymptomTile";
import { useActionSheet } from "@expo/react-native-action-sheet";

import * as Haptics from "expo-haptics";
import Carousel from "react-native-snap-carousel";
import Timeline from "react-native-timeline-flatlist";
import { observer } from "mobx-react-lite";
import { useStores } from "../models/root-store-provider";
import useColorScheme from "../hooks/useColorScheme";
import TileBase, { TileSize } from "../components/TileBase";
import moment from "moment";

type ScreenProps = StackScreenProps<RootStackParamList, "Timeline">;

const timelineData1 = [
  {
    time: `${moment().format("MMM D")}\n${moment().format("HH:mm")}`,
    emoji: "🙃",
    title: "Unbearable",
    description: "Head",
  },
  { time: "1 SEP\n10:45", emoji: "🙃", title: "Mild", description: "Chest" },
  { time: "1 SEP\n12:00", emoji: "🙃", title: "Numb", description: "Hand" },
  { time: "1 SEP\n14:00", emoji: "🙃", title: "Tingling", description: "Arm" },
  { time: "1 SEP\n16:30", emoji: "🙃", title: "Hi", description: "Back" },
];

const TimelineScreen = ({ navigation, route }: ScreenProps) => {
  /*
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.area,
    });
  }, []);*/

  const colorScheme = useColorScheme();
  const lineColor = colorScheme === "light" ? "#E9E9E9" : "#333";
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const { showActionSheetWithOptions } = useActionSheet();

  const renderTimelineTile = (item: {
    emoji: string;
    title: string;
    description: string;
  }) => {
    return (
      <TileBase
        size={TileSize.Long}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
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
            (selection) => {
              if (selection === 0) {
                navigation.navigate("TimelineDetails", {
                  id: 0,
                });
              } else if (selection === 1) {
                // edit
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
            {item.title}
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
      data={timelineData1}
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
};

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
