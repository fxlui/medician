import React, { useState } from "react";
import { StyleSheet, Alert, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, AddFlowParamList } from "../types";

import { observer } from "mobx-react-lite";
import { useStores } from "../models/root-store-provider";
import useColorScheme from "../hooks/useColorScheme";
import moment from "moment";
import uniqueSymptoms from "../assets/uniqueSymptoms.json";
import { PressableBase } from "../components/PressableBase";
import { Feather } from "@expo/vector-icons";
import {
  themeBorderColor,
  themeTextColor,
  themeTileColor,
} from "../constants/Colors";

type ScreenProps = StackScreenProps<RootStackParamList, "TimelineDetails">;

type addFlowScreenType = [keyof AddFlowParamList, number];

const symptomArr = uniqueSymptoms;

const TimelineDetailsScreen = observer(({ navigation, route }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const borderColor =
    colorScheme === "light" ? themeBorderColor.light : themeBorderColor.dark;

  const {
    editFlowStore: { currentSymptomType, currentEditingRecord },
  } = useStores();

  function useEditDirect(symptomType: string): addFlowScreenType {
    //console.log(symptomType)
    switch (symptomType) {
      case "pain":
      case "itchy":
        navigation.navigate("AddFlow", {
          screen: "SeverityScreen",
          params: { method: "edit" },
        }); // also set progress bar length
        return ["SeverityScreen", 2];
      case "hot":
      case "cold":
        navigation.navigate("AddFlow", {
          screen: "TemperatureSelectionScreen",
          params: { method: "edit" },
        });
        return ["TemperatureSelectionScreen", 3];
      case "toilet":
        navigation.navigate("AddFlow", {
          screen: "ToiletScreen",
          params: { method: "edit" },
        });
        return ["ToiletScreen", 3];
      case "dizzy":
      case "walk":
        navigation.navigate("AddFlow", {
          screen: "DizzyScreen",
          params: { method: "edit" },
        });
        return ["DizzyScreen", 2];
      case "sleep":
        navigation.navigate("AddFlow", {
          screen: "SleepHoursScreen",
          params: { method: "edit" },
        });
        return ["SleepHoursScreen", 3];
      default:
        navigation.navigate("AddFlow", {
          screen: "CustomScreen",
          params: { method: "edit" },
        });
        return ["CustomScreen", 3];
    }
  }

  const sectionStyle = StyleSheet.create({
    section: {
      marginTop: 10,
      marginBottom: 10,
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
    },
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableBase
          extraProps={{ style: { padding: 5 } }}
          onPress={() => {
            // navigate to edit
            useEditDirect(currentSymptomType);
            //console.log(route.params.id);
          }}
        >
          <Feather
            name="edit"
            size={20}
            color={textColor}
            style={{ paddingRight: 10 }}
          />
        </PressableBase>
      ),
    });
  }, [navigation]);

  return (
    <SafeView disableTop style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 25, paddingTop: 15 }}>
        <View style={sectionStyle.section}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              marginBottom: 20,
            }}
          >
            {symptomArr.find((item) => item.type === currentSymptomType)?.title}
            {currentEditingRecord?.subArea !== "other" &&
              `in${currentEditingRecord?.subArea}`}
            {"\n"}9 Sep 12:12
          </Text>
        </View>

        {currentEditingRecord?.temperature !== 0 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Temperature</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.temperature}
            </Text>
          </View>
        )}

        {currentEditingRecord?.toiletType !== -1 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Type of Toilet Difficulty</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.toiletType === 0
                ? "Urination"
                : "Defecation"}
            </Text>
          </View>
        )}

        {currentEditingRecord?.colour != -1 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>
              Color of [urine/fecal matter]
            </Text>
            <Text style={styles.sectionText}>Blue</Text>
          </View>
        )}

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>
            Is the room or the head spinning?
          </Text>
          <Text style={styles.sectionText}>Room</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>How long did you sleep?</Text>
          <Text style={styles.sectionText}>8.5 hrs</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>Severity</Text>
          <Text style={styles.sectionText}>😀 Mild discomfort</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>What makes it better?</Text>
          <Text style={styles.sectionText}>some text here..</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>What makes it worse?</Text>
          <Text style={styles.sectionText}>some text here..</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>
            What do you think its related to?
          </Text>
          <Text style={styles.sectionText}>some text here..</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>Have you tried anything?</Text>
          <Text style={styles.sectionText}>some text here..</Text>
        </View>

        <View style={sectionStyle.section}>
          <Text style={styles.sectionTitle}>Extra notes</Text>
          <Text style={styles.sectionText}>some text here..</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  list: {
    overflow: "visible",
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TimelineDetailsScreen;
