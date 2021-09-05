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
  const [selectedId, setSelectedId] = useState(route.params.type === "feel" ? 1 : 7);
  const symptomArray = route.params.type === "feel" ? SymptomsOne : SymptomsTwo;

  function useScreenDirect() : screenType {
    switch (selectedId) {
      case 1:
      case 2:
      case 16:
        return ["AreaSelectScreen", 5];
      case 3:
      case 4:
        addFlowStore.setProgressBarLength(6);
        return ["TemperatureSelectionScreen", 6];
      case 15:
        addFlowStore.setProgressBarLength(7);
        return ["ToiletScreen", 7];
      case 5:
      case 13:
        addFlowStore.setProgressBarLength(5);
        return ["DizzyScreen", 5];
      case 12:
        addFlowStore.setProgressBarLength(5);
        return ["SleepHoursScreen", 5];
      default:
        addFlowStore.setProgressBarLength(5);
        return ["CustomScreen", 5];
    }
  }

  return (
    <SafeView disableBottom>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ overflow: "visible", paddingBottom: 100 }}>
            <Text style={styles.greeting}>
              I {route.params.type}...
            </Text>
            <View style={styles.list}>
              {symptomArray.map((symptom) => {
                return(
                  <SymptomTile
                    selected={symptom.id === selectedId}
                    key={symptom.id}
                    iconName={symptom.name}
                    title={symptom.description}
                    extraStyles={{ marginRight: 30, marginBottom: 30 }}
                    onPress={() => {setSelectedId(symptom.id)}}
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
          addFlowStore.setRecordType(selectedId);
          addFlowStore.resetProgress();
          addFlowStore.setProgressBarLength(progressLength);
          navigation.navigate(screenName);
        }}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    paddingLeft: 40
  },
});
