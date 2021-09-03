import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import { AddFlowParamList, HomeTileTypes } from "../types";
import SafeView from "../components/SafeView";
import { TopTile, BottomTile } from "../components/AreaTile";
import AddFlowNavBar from "../components/AddFlowNavBar";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { ScrollView } from "react-native";
import HomeTile from "../components/HomeTile";
import { BottomTabParamList, RootStackParamList } from "../types";
import TopBar from "../components/TopBar";
import HomeScreen from "./HomeScreen";
import SymptomTile from "../components/SymptomTile";

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "HomeScreen">,
  StackScreenProps<RootStackParamList>
>;
interface tileItemData {
  id: string;
  name: string;
  notes: string;
  time: string;
  type: HomeTileTypes;
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

const AREA_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e26d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145ee26d72",
    title: "Fourth Item",
  },
];

interface baseData {
  index: number;
  dataIndex: number;
  item: {
      id: string;
      title: string;
  }
}

const SymptomOverview: React.FC<ScreenProps> = ({ navigation }) => {
  const [symptomSelected, setSymptomSelected] = useState(0);

  const topRef = React.createRef<Carousel<{ id: string; title: string }>>();

  const renderHomeTile = ({ item, index }: tileItemProps) => {
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

  const renderAreaTile = ({ item, index }: baseData) => {
    return (
      <TopTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={1}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const renderSymptomTile = ({ item, index }: baseData) => {
    return (
      <SymptomTile
        title={item.title}
        style={{
          marginRight: 15
        }}
      />
    );
  };

  return (
    <SafeView disableBottom style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <TopBar 
            left={() => navigation.navigate('HomeScreen')}
            title={"Symptom Overview"}
          />
          <View style={styles.header}>
            <Carousel
              data={DATA}
              renderItem={renderSymptomTile}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              containerCustomStyle={{
                overflow: "visible",
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                alignItems: "flex-start",
                overflow: "visible",
              }}
              itemWidth={150}
              inactiveSlideOpacity={0.8}
              onScrollIndexChanged={(index) => {
                setSymptomSelected(index);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onSnapToItem={(index) => {}}
              ref={topRef}
            />
          </View>
          <View style={styles.overflowView}>

            <Text style={styles.name}>Area</Text>
            <Carousel
              style={{ overflow: "visible" }}
              data={AREA_DATA}
              renderItem={renderAreaTile}
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

          <Text style={styles.name}>Routines</Text>
          <Carousel
            style={{ overflow: "visible" }}
            data={DATA}
            renderItem={renderHomeTile}
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
          <Text style={styles.name}>Appointments</Text>
          <Carousel
            data={DATA}
            renderItem={renderHomeTile}
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
          <Text style={styles.name}>Timeline</Text>

        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  overflowView: {
    overflow: "visible",
    paddingLeft: 25,
    paddingBottom: 125,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    alignSelf: "center"
  },
  header: {
    backgroundColor: "white",
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    // shadowRadius: 9,
    elevation: 5,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  }
});

export default SymptomOverview;
