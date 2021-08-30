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
import EntryTile from "../components/EntryTile";
import AddTile from "../components/AddTile";
import { AddFlowParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";

type ScreenProps = StackScreenProps<AddFlowParamList, "ActionScreen">

export default function ActionScreen({navigation}: ScreenProps) {

  const handleSymptom = () => {
    navigation.navigate('SymptomsScreen');
  }

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
            Good evening 🌥,{"\n"}How are you today?
          </Text>

          <View style={styles.tiles}>
            <EntryTile 
              title={"I feel..."}
              style={{marginBottom: 30}}
              size={TileSize.Large}
              list={"symptoms"}
              onClick={handleSymptom}
              />
            <EntryTile 
              title={"I can't..."}
              style={{marginBottom: 30}}
              size={TileSize.Large}
              list={"inabilities"}
              onClick={handleSymptom}
              />

            <View style={styles.addTiles}>
              <AddTile
                title={"Add"}
                subtitle={"Appointment"}
              />
              <AddTile
                title={"Add"}
                subtitle={"Treatment"}
              />
            </View>
          </View>

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
  tiles: {
    marginTop: 40,
    flexDirection: "column",
  },
  addTiles: {
    flexDirection: 'row'
  }
});
