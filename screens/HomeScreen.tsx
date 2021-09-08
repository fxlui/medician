import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import CustomHaptics from "../utils/CustomHaptics";
import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import SafeView from "../components/SafeView";
import { Text, View } from "../components/Themed";
import HomeTile from "../components/HomeTile";
import { HomeTileTypes } from "../types";
import { BottomTabParamList, RootStackParamList } from "../types";

import { Feather } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import { observer } from "mobx-react-lite";
import { SavedAppointmentSnapshot } from "../models/appointment";
import { SavedRoutineSnapshot } from "../models/routine";
import { useStores } from "../models/root-store-provider";
import { PressableBase } from "../components/PressableBase";

import {
  greetingTextFromTime,
  getDateText,
  getMedicationDoseText,
} from "../utils/NaturalTexts";
import { themeTextColor } from "../constants/Colors";

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

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "HomeScreen">,
  StackScreenProps<RootStackParamList>
>;

const HomeScreen = observer(({ navigation }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const { homeScreenStore } = useStores();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const routineType = (dbType: number) =>
    dbType === 0 ? HomeTileTypes.Medication : HomeTileTypes.Exercise;

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
        subTitle={item.time.toString()}
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await homeScreenStore.fetchRoutinesAsync();
      await homeScreenStore.fetchAppointmentsAsync();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeView disableBottom style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overflowView}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Hey there.{"\n"}
              {greetingTextFromTime()}
            </Text>
            <PressableBase
              onPress={() => navigation.navigate("Settings")}
              extraProps={{ style: { padding: 15 } }}
            >
              <Feather name="more-horizontal" size={24} color={textColor} />
            </PressableBase>
          </View>
          <Text style={styles.name}>Medication</Text>
          <Carousel
            style={{ overflow: "visible" }}
            data={homeScreenStore.getRecentMedications()}
            renderItem={renderRoutineTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.975}
            onScrollIndexChanged={() => {
              CustomHaptics("light");
            }}
          />
          <Text style={styles.name}>Exercise</Text>
          <Carousel
            data={homeScreenStore.getRecentExercises()}
            renderItem={renderRoutineTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.975}
            onScrollIndexChanged={() => {
              CustomHaptics("light");
            }}
          />
          <Text style={styles.name}>Appointment</Text>
          <Carousel
            data={homeScreenStore.getRecentAppointments()}
            renderItem={renderAppointmentTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.975}
            onScrollIndexChanged={() => {
              CustomHaptics("light");
            }}
          />
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
    paddingLeft: 25,
    paddingBottom: 125,
  },
  header: {
    marginTop: 65,
    marginLeft: 5,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    marginLeft: 5,
  },
});

export default HomeScreen;
