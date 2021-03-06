import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
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

import * as Notifications from "expo-notifications";

import FillerTile from "../components/FillerTile";
import { useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const { homeScreenStore, addFlowStore, progressStore } = useStores();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const routineType = (dbType: number) =>
    dbType === 0 ? HomeTileTypes.Medication : HomeTileTypes.Exercise;

  // Notification Stuff :D
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.id &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const notification = lastNotificationResponse.notification;
      const idNum = parseInt(`${notification.request.content.data.id}`);
      if (notification.request.content.data.id && !isNaN(idNum)) {
        navigation.navigate("Notification", {
          id: notification.request.content.data.id as number,
          title: notification.request.content.data.name as string,
          notes: notification.request.content.data.notes as string,
          type: notification.request.content.data.type as HomeTileTypes,
          clear: true,
        });
      }
    }
  }, [lastNotificationResponse]);

  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const idNum = parseInt(`${notification.request.content.data.id}`);
        if (notification.request.content.data.id && !isNaN(idNum)) {
          const checkStatus = async () => {
            const status = await AsyncStorage.getItem("@last_alert_id");
            console.log(status);
            if (status === `${notification.request.identifier}`) {
              // handled before
              return;
            } else {
              await AsyncStorage.setItem(
                "@last_alert_id",
                `${notification.request.identifier}`
              );
              navigation.navigate("Notification", {
                id: notification.request.content.data.id as number,
                title: notification.request.content.data.name as string,
                notes: notification.request.content.data.notes as string,
                type: notification.request.content.data.type as HomeTileTypes,
                clear: true,
              });
            }
          };
          checkStatus();
        }
      }
    );
    return () => subscription.remove();
  }, []);

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
          {homeScreenStore.getRecentMedications().length === 0 ? (
            homeScreenStore.getRecentExercises().length === 0 &&
            homeScreenStore.getRecentAppointments().length === 0 ? (
              <>
                <Text style={styles.name}>Medication</Text>
                <FillerTile
                  onPress={() => {
                    CustomHaptics("light");
                    navigation.navigate("AddFlow", {
                      screen: "MedicationScreen",
                    });
                    progressStore.setProgressBarLength(3);
                    progressStore.resetProgress();
                    addFlowStore.currentNewRoutine.setRoutineType(0);
                  }}
                />
              </>
            ) : null
          ) : (
            <>
              <Text style={styles.name}>Medication</Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: -12.5,
                  marginBottom: 15,
                  opacity: 0.7,
                }}
              >
                Next Two Weeks
              </Text>
              <Carousel
                style={{ overflow: "visible" }}
                data={homeScreenStore.getRecentMedications()}
                renderItem={renderRoutineTile}
                vertical={false}
                sliderWidth={width}
                activeSlideAlignment={"start"}
                containerCustomStyle={{
                  overflow: "visible",
                }}
                itemWidth={170}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.975}
                onScrollIndexChanged={() => {
                  CustomHaptics("light");
                }}
              />
            </>
          )}

          {homeScreenStore.getRecentExercises().length === 0 ? (
            homeScreenStore.getRecentMedications().length === 0 &&
            homeScreenStore.getRecentAppointments().length === 0 ? (
              <>
                <Text style={styles.name}>Exercise</Text>
                <FillerTile
                  onPress={() => {
                    CustomHaptics("light");
                    navigation.navigate("AddFlow", {
                      screen: "ExerciseScreen",
                    });
                    progressStore.setProgressBarLength(3);
                    progressStore.resetProgress();
                    addFlowStore.currentNewRoutine.setRoutineType(1);
                  }}
                />
              </>
            ) : null
          ) : (
            <>
              <Text style={styles.name}>Exercise</Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: -12.5,
                  marginBottom: 15,
                  opacity: 0.7,
                }}
              >
                Next Two Weeks
              </Text>
              <Carousel
                data={homeScreenStore.getRecentExercises()}
                renderItem={renderRoutineTile}
                vertical={false}
                sliderWidth={width}
                activeSlideAlignment={"start"}
                containerCustomStyle={{
                  overflow: "visible",
                }}
                itemWidth={170}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.975}
                onScrollIndexChanged={() => {
                  CustomHaptics("light");
                }}
              />
            </>
          )}
          {homeScreenStore.getRecentAppointments().length === 0 ? (
            homeScreenStore.getRecentExercises().length === 0 &&
            homeScreenStore.getRecentMedications().length === 0 ? (
              <>
                <Text style={styles.name}>Appointment</Text>
                <FillerTile
                  onPress={() => {
                    CustomHaptics("light");
                    progressStore.resetProgress();
                    addFlowStore.resetAppointment();
                    progressStore.setProgressBarLength(2);
                    navigation.navigate("AddFlow", {
                      screen: "AppointmentTimeScreen",
                    });
                  }}
                />
              </>
            ) : null
          ) : (
            <>
              <Text style={styles.name}>Appointment</Text>
              <Carousel
                data={homeScreenStore.getRecentAppointments()}
                renderItem={renderAppointmentTile}
                vertical={false}
                sliderWidth={width}
                activeSlideAlignment={"start"}
                containerCustomStyle={{
                  overflow: "visible",
                }}
                itemWidth={170}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.975}
                onScrollIndexChanged={() => {
                  CustomHaptics("light");
                }}
              />
            </>
          )}
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
    paddingBottom: 150,
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
