import React, { useState, useEffect } from "react";
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

export default function SymptomsScreen({ navigation, route }: ScreenProps) {

  const { addFlowStore } = useStores();
  const [selectedId, setSelectedId] = useState("1");
  const symptomArray = route.params.type === "feel" ? SymptomsOne : SymptomsTwo;

  useEffect(() => {
    addFlowStore.resetProgress();
  }, []);

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
        first
        left={() => {
          navigation.pop();
        }}
        right={() => {
          addFlowStore.setProgressBarLength(8);
          navigation.navigate("AreaSelectScreen");
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
