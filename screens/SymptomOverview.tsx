import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeTileTypes } from "../types";
import { BottomTabParamList, RootStackParamList } from "../types";
import uniqueSymptoms from "../assets/uniqueSymptoms.json";

import HomeTile from "../components/HomeTile";
import { TopTile } from "../components/AreaTile";
import OverviewSymptomTile from "../components/OverviewSymptomTile";

import Carousel from "react-native-snap-carousel";
import { useStores } from "../models/root-store-provider";
import { observer } from "mobx-react-lite";
import { SimpleRecordSnapshot } from "../models/overview-store";
import { SavedAppointmentSnapshot } from "../models/appointment";
import { SavedRoutineSnapshot } from "../models/routine";
import useColorScheme from "../hooks/useColorScheme";
import { getDateText, getMedicationDoseText } from "../utils/NaturalTexts";

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "HomeScreen">,
  StackScreenProps<RootStackParamList>
>;

interface SymptomItem {
  title: string;
  type: string;
}

interface symptomTileProps {
  index: number;
  dataIndex: number;
  item: SymptomItem;
}

interface appointmentTileProps {
  index: number;
  dataIndex: number;
  item: SavedAppointmentSnapshot;
}

interface routineTileProps {
  index: number;
  dataIndex: number;
  item: SavedRoutineSnapshot;
}

interface BaseData {
  index: number;
  dataIndex: number;
  item: SimpleRecordSnapshot;
}

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

const symptomArr = uniqueSymptoms;

const SymptomOverview: React.FC<ScreenProps> = observer(({ navigation }) => {
  const colorScheme = useColorScheme();
  const [symptomSelected, setSymptomSelected] = useState(0);

  const topRef = React.createRef<Carousel<{ title: string; type: string }>>();
  const topBackground = colorScheme === "light" ? "white" : "#121212";
  const [displaySymptoms, setDisplaySymptoms] = useState<SymptomItem[]>([]);
  const { overviewStore } = useStores();
  const routineType = (dbType: number) =>
    dbType === 0 ? HomeTileTypes.Medication : HomeTileTypes.Exercise;
  const areaTileEmoji = (area: string) =>
    area === "Head"
      ? "🤯"
      : area === "Body"
      ? "👕"
      : area === "Arms"
      ? "💪"
      : area === "Legs"
      ? "🦵"
      : "";

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await overviewStore.fetchAllCollectionsAsync();
      const fetchedCollections = symptomArr.filter((item) =>
        overviewStore.getCollectionTypesSnapshot().includes(item.type)
      );
      setDisplaySymptoms(fetchedCollections);
      if (fetchedCollections.length === 0) return;
      await overviewStore.fetchCollectionDataAsync(
        fetchedCollections[symptomSelected].type
      );
    });
    return unsubscribe;
  }, []);

  const renderSymptomTile = ({ item, index }: symptomTileProps) => {
    return (
      <OverviewSymptomTile
        title={item.title}
        iconName={item.type}
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
        emoji={areaTileEmoji(item.area)}
        title={item.subArea}
        index={index}
        selected={false}
        updater={() => {}}
      />
    );
  };

  const renderRoutineTile = ({ item, index }: routineTileProps) => {
    return (
      <HomeTile
        title={item.title}
        secondTitle={
          routineType(item.type) === HomeTileTypes.Medication
            ? getMedicationDoseText(item.notes)
            : item.notes
        }
        subTitle={getDateText(new Date(item.time))}
        style={{
          marginRight: 15,
        }}
        index={index}
        type={routineType(item.type)}
        onPress={() => {
          navigation.push("Notification", {
            id: item.id.toString(),
            name: item.title,
            notes: item.notes,
            type: routineType(item.type),
          });
        }}
      />
    );
  };

  const renderAppointmentTile = ({ item, index }: appointmentTileProps) => {
    return (
      <HomeTile
        title={item.doctor}
        subTitle={getDateText(new Date(item.time))}
        style={{
          marginRight: 15,
        }}
        index={index}
        type={HomeTileTypes.Appointment}
        onPress={() => {
          navigation.push("Notification", {
            id: item.id.toString(),
            name: item.doctor,
            notes: item.doctor,
            type: HomeTileTypes.Appointment,
          });
        }}
      />
    );
  };

  return (
    <SafeView disableTop disableBottom style={styles.container}>
      <View style={[styles.header, { backgroundColor: topBackground }]}>
        <Carousel
          data={displaySymptoms}
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
          onScrollIndexChanged={async (index) => {
            setSymptomSelected(index);
            await overviewStore.fetchCollectionDataAsync(
              displaySymptoms[index].type
            );
          }}
          ref={topRef}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overflowView}>
          <View style={{ paddingLeft: 25 }}>
            <Text style={styles.name}>Timeline</Text>
            <Carousel
              style={{ overflow: "visible" }}
              data={overviewStore.getCurrentRecordsSnapshot()}
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
              onScrollIndexChanged={() => {}}
            />
            <Text style={styles.name}>Routines</Text>
            <Carousel
              data={overviewStore.getCurrentRoutinesSnapshot()}
              renderItem={renderRoutineTile}
              inactiveSlideScale={1}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              activeSlideAlignment={"start"}
              containerCustomStyle={{
                overflow: "visible",
              }}
              itemWidth={165}
              inactiveSlideOpacity={1}
              onScrollIndexChanged={() => {}}
            />
            <Text style={styles.name}>Appointments</Text>
            <Carousel
              data={overviewStore.getCurrentAppointmentsSnapshot()}
              renderItem={renderAppointmentTile}
              inactiveSlideScale={1}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              activeSlideAlignment={"start"}
              containerCustomStyle={{
                overflow: "visible",
              }}
              itemWidth={165}
              inactiveSlideOpacity={1}
              onScrollIndexChanged={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overflowView: {
    overflow: "visible",
    paddingBottom: 155,
  },
  header: {
    paddingBottom: 30,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    zIndex: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  },
  tileMargin: {
    marginRight: 15,
  },
});

export default SymptomOverview;
function routineType(type: number) {
  throw new Error("Function not implemented.");
}
