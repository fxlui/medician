import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
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
  title: string;
  type: HomeTileTypes;
}

interface tileItemProps {
  index: number;
  dataIndex: number;
  item: tileItemData;
}

const DATA : tileItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: HomeTileTypes.Appointment
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    type: HomeTileTypes.Appointment
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e26d72",
    title: "Third Item",
    type: HomeTileTypes.Appointment
  },
  {
    id: "58694a0f-3da1-471f-bd96-145ee26d72",
    title: "Fourth Item",
    type: HomeTileTypes.Appointment
  },
];


type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList ,"HomeScreen">,
  StackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ navigation } : ScreenProps) => {
  
  const renderTile = ({ item, index } : tileItemProps) => {
    return (
      <HomeTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        type={HomeTileTypes.Medication}
        onPress={() => {
          navigation.push("Notification", {
            itemId: item.id,
            type: item.type
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
          <Text style={styles.title}>Medication</Text>
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
            itemWidth={165}
            inactiveSlideOpacity={0.9}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text style={styles.title}>Exercise</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={0.9}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text style={styles.title}>Appointment</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={0.9}
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

export default HomeScreen;
