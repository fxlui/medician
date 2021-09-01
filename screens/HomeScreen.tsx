import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import SafeView from "../components/SafeView";
import { Text, View } from "../components/Themed";
import HomeTile from "../components/HomeTile";
import { HomeTileTypes } from "../types";
import { BottomTabParamList, RootStackParamList } from "../types";

interface tileItemData {
  id: string;
  name: string;
  notes: string;
  time: string;
  type: HomeTileTypes;
}

interface tileItemProps {
  index: number;
  dataIndex: number;
  item: tileItemData;
}

const DATA: tileItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    notes: "aaa",
    time: "",
    type: HomeTileTypes.Exercise,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
    notes: "aaa",
    time: "",
    type: HomeTileTypes.Medication,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e26d72",
    name: "Third Item",
    notes: "aaa",
    time: "",
    type: HomeTileTypes.Appointment,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145ee26d72",
    name: "Fourth Item",
    notes: "aaa",
    time: "",
    type: HomeTileTypes.Medication,
  },
];

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "HomeScreen">,
  StackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ navigation }: ScreenProps) => {
  const renderTile = ({ item, index }: tileItemProps) => {
    return (
      <HomeTile
        title={item.name}
        style={{
          marginRight: 15,
        }}
        index={index}
        type={item.type}
        onPress={() => {
          navigation.push("Notification", {
            id: item.id,
            name: item.name,
            notes: item.notes,
            type: item.type,
          });
        }}
      />
    );
  };

  return (
    <SafeView disableBottom style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overflowView}>
          <Text style={styles.greeting}>Good evening 🌥,{"\n"}Ririmes</Text>
          <Text style={styles.name}>Medication</Text>
          <Carousel
            style={{ overflow: "visible" }}
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={1}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text style={styles.name}>Exercise</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={1}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text style={styles.name}>Appointment</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={1}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overflowView: {
    overflow: "visible",
    paddingLeft: 25,
    paddingBottom: 125,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    marginLeft: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  }
});

export default HomeScreen;
