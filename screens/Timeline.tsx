import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
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

import * as Haptics from "expo-haptics";
import Carousel from "react-native-snap-carousel";
import Timeline from "react-native-timeline-flatlist";
import { observer } from "mobx-react-lite";
import { useStores } from "../models/root-store-provider";
import useColorScheme from "../hooks/useColorScheme";


const timelineData1 = [
  {
    time: "1 SEP\n09:00",
    emoji: "🙃",
    title: "Unbearable",
    description: "Head",
  },
  { time: "1 SEP\n10:45", emoji: "🙃", title: "Mild", description: "Chest" },
  { time: "1 SEP\n12:00", emoji: "🙃", title: "Numb", description: "Hand" },
  { time: "1 SEP\n14:00", emoji: "🙃", title: "Tingling", description: "Arm" },
  { time: "1 SEP\n16:30", emoji: "🙃", title: "Hi", description: "Back" },
];

const TimelineScreen = () => {

  const renderTimelineTile = (item: {
    emoji: string, title: string, description: string
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
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
            fontSize: 14,
            fontWeight: "600",
            textAlign: "right",
          }}
        >
          {item.title}
        </Text>
        <Text style={[styles.textDescription]}>{item.description}</Text>
      </View>
    );
  }
  return (
    <Timeline
      style={styles.list}
      data={timelineData1}
      separator={false}
      circleSize={15}
      circleColor="#E9E9E9"
      lineColor="#E9E9E9"
      timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
      timeStyle={{
        textAlign: "center",
        color: "grey",
        padding: 5,
        borderRadius: 13,
        overflow: "visible"
      }}
      descriptionStyle={{ color: "gray" }}
      detailContainerStyle={{
        flexDirection: "row",
        marginBottom: 20,
        width: 215,
        height: 60,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 5,
        overflow: "visible",
      }}
      renderDetail={renderTimelineTile}
      onEventPress={() => {}}
      rowContainerStyle={{
        marginLeft: 25,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible"
  },
  overflowView: {
    overflow: "visible",
    paddingBottom: 40
  },
  header: {
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    zIndex: 10
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  },
  tileMargin: {
    marginRight: 15
  },
  list: {
    overflow: "visible",
    paddingBottom: 100,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
});