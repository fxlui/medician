import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
  Platform,
} from "react-native";
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
import uniqueBodyAreas from "../assets/uniqueSubAreas.json";
import { getDateText, getMedicationDoseText } from "../utils/NaturalTexts";
import CustomHaptics from "../utils/CustomHaptics";

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

interface AreaTileProps {
  index: number;
  dataIndex: number;
  item: {
    area: string;
    subArea: string;
  };
}

const symptomArr = uniqueSymptoms;

const SymptomOverview: React.FC<ScreenProps> = observer(({ navigation }) => {
  const colorScheme = useColorScheme();
  const { height, width } = useWindowDimensions();
  const [symptomSelected, setSymptomSelected] = useState(0);

  const topRef = React.useRef<Carousel<{ title: string; type: string }>>(null);
  const topBackground = colorScheme === "light" ? "white" : "#121212";
  const [displaySymptoms, setDisplaySymptoms] = useState<SymptomItem[]>([]);
  const { overviewStore } = useStores();
  const currentSubAreas = overviewStore.getCurrentSubAreas();
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
      : "?";

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await overviewStore.fetchAllCollectionsAsync();
      const fetchedCollections = symptomArr.filter((item) =>
        overviewStore.getCollectionTypesSnapshot().includes(item.type)
      );
      setDisplaySymptoms(fetchedCollections);
      if (fetchedCollections.length === 0) return;
      if (topRef.current) {
        overviewStore.setSelectedCollection(
          fetchedCollections[topRef.current.currentIndex].type
        )
      }
      await overviewStore.fetchCollectionDataAsync();
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

  const renderAreaTile = ({ item, index }: AreaTileProps) => {
    return (
      <TopTile
        emoji={areaTileEmoji(item.area)}
        title={item.subArea === "other" ? "Other" : item.subArea}
        index={index}
        selected={false}
        updater={() => {
          const currentCollection =
            overviewStore.getCurrentSelectedCollection();
          if (currentCollection) {
            navigation.navigate("Timeline", {
              collectionId: currentCollection.id,
              type: currentCollection.type,
              area: item.subArea,
            });
          } else {
            Alert.alert("Current collection not found.");
          }
        }}
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
            id: item.alertId,
            title: item.title,
            notes: item.notes,
            type: routineType(item.type),
            clear: false,
          });
        }}
        overDue={item.time < Date.now()}
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
            id: item.alertId,
            title: item.doctor,
            notes: item.notes,
            type: HomeTileTypes.Appointment,
            clear: false,
          });
        }}
        overDue={item.time < Date.now()}
      />
    );
  };

  return (
    <SafeView disableTop disableBottom style={styles.container}>
      <View
        style={[
          styles.header,
          { backgroundColor: topBackground },
          displaySymptoms.length === 0 && {
            paddingVertical: 0,
          },
        ]}
      >
        <Carousel
          data={displaySymptoms}
          renderItem={renderSymptomTile}
          vertical={false}
          sliderWidth={width}
          containerCustomStyle={{
            overflow: "visible",
          }}
          itemWidth={165}
          inactiveSlideOpacity={Platform.OS === "android" ? 1 : 0.8}
          onScrollIndexChanged={async (index) => {
            CustomHaptics("light");
            setSymptomSelected(index);
            overviewStore.setSelectedCollection(displaySymptoms[index].type);
            await overviewStore.fetchCollectionDataAsync();
          }}
          ref={topRef}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overflowView}>
          <View style={{ paddingLeft: 25 }}>
            <Text style={styles.name}>Timeline</Text>

            {uniqueBodyAreas.filter((item) =>
              currentSubAreas.includes(item.subArea)
            ).length === 0 ? (
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: -10,
                  opacity: 0.7,
                }}
              >
                Nothing here yet
              </Text>
            ) : null}
            <Carousel
              style={{ overflow: "visible" }}
              data={uniqueBodyAreas.filter((item) =>
                currentSubAreas.includes(item.subArea)
              )}
              renderItem={renderAreaTile}
              inactiveSlideScale={1}
              vertical={false}
              sliderWidth={width}
              activeSlideAlignment={"start"}
              containerCustomStyle={{
                overflow: "visible",
              }}
              itemWidth={170}
              inactiveSlideOpacity={1}
              onScrollIndexChanged={() => {}}
            />

            <Text style={styles.name}>Routines</Text>
            {overviewStore.getCurrentRoutinesSnapshot().length === 0 ? (
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: -10,
                  opacity: 0.7,
                }}
              >
                Nothing here yet
              </Text>
            ) : null}
            <Carousel
              data={overviewStore.getCurrentRoutinesSnapshot()}
              renderItem={renderRoutineTile}
              inactiveSlideScale={1}
              vertical={false}
              sliderWidth={width}
              activeSlideAlignment={"start"}
              containerCustomStyle={{
                overflow: "visible",
              }}
              itemWidth={170}
              inactiveSlideOpacity={1}
              onScrollIndexChanged={() => {}}
            />

            <Text style={styles.name}>Appointments</Text>
            {overviewStore.getCurrentAppointmentsSnapshot().length === 0 ? (
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: -10,
                  opacity: 0.7,
                }}
              >
                Nothing here yet
              </Text>
            ) : null}
            <Carousel
              data={overviewStore.getCurrentAppointmentsSnapshot()}
              renderItem={renderAppointmentTile}
              inactiveSlideScale={1}
              vertical={false}
              sliderWidth={width}
              activeSlideAlignment={"start"}
              containerCustomStyle={{
                overflow: "visible",
              }}
              itemWidth={170}
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
    paddingVertical: 30,
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
