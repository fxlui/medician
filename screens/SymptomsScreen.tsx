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
  Button
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import Tile from "../components/HomeTile";
import Carousel from "react-native-snap-carousel";
import TileBase, { TileSize } from "../components/TileBase";
import EntryTile from "../components/EntryTile";
import AddTile from "../components/AddTile";
import SymptomTile from "../components/SymptomTile";
import Symptoms from "../assets/Symptoms.json";
import { HomeTileTypes } from "../types";
import { AddFlowParamList } from "../types";

type ScreenProps = StackScreenProps<AddFlowParamList, "SymptomsScreen">;

export default function ActionScreen({ navigation }: ScreenProps) {

  return (
    <SafeView>
      <View style={styles.child}>
        <ScrollView
          style={{
            overflow: "visible",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Button title="Go to Progress flow" onPress={() => navigation.navigate("AreaSelectScreen")} />
          <Text style={styles.greeting}>
            I feel...
          </Text>
          
          <View style={styles.list}>
            {Symptoms.map((symptom) => {
              return(
                <SymptomTile title={symptom.description} key={symptom.id}/>
              )
            })}
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
    flexDirection: "row",
    flexWrap: "wrap"
  },
  tiles: {
    marginTop: 40,
    flexDirection: "column",
  },
  addTiles: {
    flexDirection: 'row'
  }
});
