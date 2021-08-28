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
import Tile from "../components/HomeTile";
import { HomeTileTypes } from "../types";
import Carousel from "react-native-snap-carousel";
import TileBase, { TileSize } from "../components/TileBase";

import SymptomsData from "../assets/Symptoms.json";

export default function ActionScreen() {
  return (
    <SafeView>
      <View style={styles.child}>
        <ScrollView
          style={{
            overflow: "visible",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greeting}>
            Good evening 🌥,{"\n"}What would you like to do?
          </Text>

          <Tile type={HomeTileTypes.Appointment} title={"I feel"} size={TileSize.Large}></Tile>
          <Text>
            {SymptomsData.slice(0, 4).map((symptom) => {
              return (
                <Text key={symptom.id}>
                  {symptom.description}
                  {"\n"}
                </Text>
              );
            })}
            ...
          </Text>
        </ScrollView>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  child: {
    flex: 1,
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
