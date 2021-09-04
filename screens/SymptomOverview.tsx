import React, { useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { AddFlowParamList, HomeTileTypes } from "../types";
import SafeView from "../components/SafeView";
import { TopTile, BottomTile } from "../components/AreaTile";
import AddFlowNavBar from "../components/AddFlowNavBar";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Timeline from 'react-native-timeline-flatlist'

import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { ScrollView } from "react-native";
import HomeTile from "../components/HomeTile";
import { BottomTabParamList, RootStackParamList } from "../types";
import TopBar from "../components/TopBar";
import HomeScreen from "./HomeScreen";
import SymptomTile from "../components/SymptomTile";
import Icon from "../components/Icon";

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

interface tileItemProps {
  index: number;
  dataIndex: number;
  item: tileItemData;
}
interface baseData {
  index: number;
  dataIndex: number;
  item: {
      id: string;
      title: string;
  }
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
    title: "Pain"
  },
  {
    title: "Brain"
  }
];

const timelineData1 = [
  {time: '1 SEP\n09:00', emoji: '🙃',title: 'Unbearable', description: 'Head'},
  {time: '1 SEP\n10:45', emoji: '🙃',title: 'Mild', description: 'Chest'},
  {time: '1 SEP\n12:00', emoji: '🙃',title: 'Numb', description: 'Hand'},
  {time: '1 SEP\n14:00', emoji: '🙃',title: 'Tingling', description: 'Arm'},
  {time: '1 SEP\n16:30', emoji: '🙃',title: 'Hi', description: 'Back'}
]

const timelineData = [
      {
        time: '09:00', 
        title: 'Archery Training', 
        description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor:'#009688', 
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
      },
      {
        time: '10:45', 
        title: 'Play Badminton', 
        description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
      },
      {
        time: '12:00', 
        title: 'Lunch', 
      },
      {
        time: '14:00', 
        title: 'Watch Soccer', 
        description: 'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor:'#009688', 
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
      },
      {
        time: '16:30', 
        title: 'Go to Fitness center', 
        description: 'Look out for the Best Gym & Fitness Centers around me :)', 
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
      }
    ]

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
        selected={true}
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
        iconName={item.title}
        onPress={()=> {}}
        selected={false}
      />
    );
  };

  const renderTimelineTile = (item) => {
    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
      }}> 
          <Text 
            style={{
              fontSize: 20,
              marginRight: 15,
              marginLeft: 15
            }}
          >
            {item.emoji}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              textAlign: "right"
            }}
          >
            {item.title}
          </Text>
          <Text style={[styles.textDescription]}>{item.description}</Text>
      </View>
    )
  }
  return (
    <SafeView disableBottom style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
      >
          <TopBar 
            left={() => navigation.navigate('HomeScreen')}
            title={"Symptom Overview"}
          />
          <View style={styles.header}>
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

          <Text style={styles.name}>Timeline</Text>
          <Timeline 
            style={styles.list}
            data={timelineData1}
            separator={false}
            circleSize={15}
            circleColor='#E9E9E9'
            lineColor='#E9E9E9'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', color:'grey', padding:5, borderRadius:13, overflow: 'hidden'}}
            descriptionStyle={{color:'gray'}}
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
            onEventPress={
              () => {}
            }
            options={{
              style:{paddingTop:5}
            }}
          />
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
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});

export default SymptomOverview;
