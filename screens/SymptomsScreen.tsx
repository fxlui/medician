import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import SymptomTile from "../components/SymptomTile";
import SymptomsOne from "../assets/SymptomsOne.json";
import SymptomsTwo from "../assets/SymptomsTwo.json";
import AddFlowNavBar from "../components/AddFlowNavBar";
import { useStores } from "../models/root-store-provider";
import { AddFlowParamList } from "../types";

type ScreenProps = StackScreenProps<AddFlowParamList, "SymptomsScreen">;

type screenType = [keyof AddFlowParamList, number];

export default function SymptomsScreen({ navigation, route }: ScreenProps) {
  const { addFlowStore } = useStores();
  const symptomArray = route.params.type === "feel" ? SymptomsOne : SymptomsTwo;

  const [selectedId, setSelectedId] = useState(
    route.params.type === "feel" ? 1 : 14
  );
  const [selectedName, setSelectedName] = useState(
    route.params.type === "feel" ? "pain" : "breathe"
  );

  function useScreenDirect(): screenType {
    switch (selectedId) {
      case 1:
      case 2:
      case 23:
        return ["AreaSelectScreen", 5];
      case 3:
      case 4:
        return ["TemperatureSelectionScreen", 7];
      case 22:
      case 8:
        return ["ToiletScreen", 7];
      case 5:
      case 13:
      case 20:
        return ["DizzyScreen", 5];
      case 7:
      case 19:
        return ["SleepHoursScreen", 5];
      default:
        return ["CustomScreen", 5];
    }
  }

  return (
    <SafeView disableBottom>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ overflow: "visible", paddingBottom: 100 }}>
            <Text style={styles.greeting}>
              I {route.params.type === "cant" ? "can't" : "feel"}...
            </Text>
            <View style={styles.list}>
              {symptomArray.map((symptom) => {
                return (
                  <SymptomTile
                    selected={symptom.id === selectedId}
                    key={symptom.id}
                    iconName={symptom.type}
                    title={symptom.name}
                    extraStyles={{ marginRight: 30, marginBottom: 30 }}
                    onPress={() => {
                      setSelectedId(symptom.id);
                      setSelectedName(symptom.type);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <AddFlowNavBar
        left={() => {
          navigation.pop();
        }}
        right={() => {
          const [screenName, progressLength] = useScreenDirect();
          addFlowStore.resetProgress();
          addFlowStore.resetAddFlow();
          addFlowStore.currentNewRecord.setRecordType(selectedName);
          addFlowStore.setProgressBarLength(progressLength);
          navigation.navigate(screenName);
        }}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 95,
    marginBottom: 40,
    paddingLeft: 30,
  },
  list: {
    overflow: "visible",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 40,
  },
});
