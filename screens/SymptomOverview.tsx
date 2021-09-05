import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { AddFlowParamList, HomeTileTypes } from "../types";
import { BottomTabParamList, RootStackParamList } from "../types";

import HomeTile from "../components/HomeTile";
import { TopTile } from "../components/AreaTile";
import OverviewSymptomTile from "../components/OverviewSymptomTile";

import * as Haptics from "expo-haptics";
import Carousel from "react-native-snap-carousel";
import Timeline from "react-native-timeline-flatlist";
import useColorScheme from "../hooks/useColorScheme";

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "HomeScreen">,
  StackScreenProps<RootStackParamList>
>;
interface BaseData {
  index: number;
  dataIndex: number;
  item: {
    id: string;
    title: string;
  };
}
interface SymptomBaseData {
  index: number;
  dataIndex: number;
  item: {
    title: string;
  };
}
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

const AREA_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Head",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Abdomen",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e26d72",
    title: "Feet",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145ee26d72",
    title: "Fourth Item",
  },
];

const symptoms = [
  {
    title: "Pain",
  },
  {
    title: "Brain",
  },
];

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

const SymptomOverview: React.FC<ScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [symptomSelected, setSymptomSelected] = useState(0);

  const topRef = React.createRef<Carousel<{ title: string }>>();

  const renderSymptomTile = ({ item, index }: SymptomBaseData) => {
    return (
      <OverviewSymptomTile
        title={item.title}
        iconName={item.title}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
        selected={symptomSelected === index}
      />
    );
  };

  const renderAreaTile = ({ item, index }: BaseData) => {
    return (
      <TopTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={false}
        updater={() => {}}
        emoji={"e"}
      />
    );
  };

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

  const renderTimelineTile = (item) => {
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
  };

  const renderSymptomOverview = () => (
    <>
      <View
        style={[
          styles.header,
          { backgroundColor: colorScheme === "light" ? "white" : "#121212" },
        ]}
      >
        <Carousel
          data={symptoms}
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
            // TODO move this state to MobX
            setSymptomSelected(index);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          ref={topRef}
        />
      </View>

      <View style={styles.overflowView}>
        <Text style={styles.name}>Area</Text>
        <Carousel
          style={{ overflow: "visible" }}
          data={AREA_DATA}
          renderItem={renderAreaTile}
          inactiveSlideScale={1}
          vertical={false}
          sliderWidth={Dimensions.get("window").width}
          activeSlideAlignment={"start"}
          containerCustomStyle={{
            overflow: "visible",
          }}
          itemWidth={165}
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
          inactiveSlideScale={1}
          vertical={false}
          sliderWidth={Dimensions.get("window").width}
          activeSlideAlignment={"start"}
          containerCustomStyle={{
            overflow: "visible",
          }}
          itemWidth={165}
          inactiveSlideOpacity={1}
          onScrollIndexChanged={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        />
        <Text style={styles.name}>Appointments</Text>
        <Carousel
          data={DATA}
          renderItem={renderHomeTile}
          inactiveSlideScale={1}
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
      <Text
        style={[
          styles.name,
          {
            paddingLeft: 25,
          },
        ]}
      >
        Timeline
      </Text>
    </>
  );

  return (
    <SafeView disableTop disableBottom style={styles.container}>
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
          overflow: "hidden",
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
        }}
        renderDetail={renderTimelineTile}
        onEventPress={() => {}}
        // @ts-ignore
        options={{
          ListHeaderComponent: renderSymptomOverview,
        }}
        rowContainerStyle={{
          marginLeft: 25,
        }}
      />
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
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    alignSelf: "center",
  },
  header: {
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    // shadowRadius: 9,
    elevation: 5,
  },
  list: {
    overflow: "visible",
    marginBottom: 120,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
});

export default SymptomOverview;
