import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import Tile from "../components/Tile";
import Carousel from "react-native-snap-carousel";

const FEELINGS = [
  {
    description: "Pain"
  },
  {
    description: "Itchy"
  },
  {
    description: "Hot"
  },
  {
    description: "Cold"
  },
  {
    description: "Dizzy"
  },
  {
    description: "Sleeping is difficult"
  },
  {
    description: "Going to toilet is difficult"
  },
  {
    description: "Sick"
  },
  {
    description: "Breathing is difficult"
  },
  {
    description: "Hearing is difficult"
  },
  {
    description: "Seeing is difficult"
  },
  {
    description: "Speaking is difficult"
  },
  {
    description: "Walking is difficult"
  },
  {
    description: "ADD MY OWN"
  },

]

export default function TabTwoScreen() {
  return (
    <SafeView style={styles.container}>
      <View style={styles.child}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Good evening 🌥,{"\n"}Ririmes</Text>
      </ScrollView>
      </View>
    </SafeView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  child: {
    paddingLeft: 25,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    paddingLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    paddingLeft: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});
