import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import SymptomTile from "../components/SymptomTile";
import Symptoms from "../assets/Symptoms.json";
import AddFlowNavBar from "../components/AddFlowNavBar";
import { AddFlowParamList } from "../types";

type ScreenProps = StackScreenProps<AddFlowParamList, "SymptomsScreen">;

export default function ActionScreen({ navigation }: ScreenProps) {

  return (
    <SafeView disableBottom>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ overflow: "visible", paddingBottom: 100 }}>
            <Text style={styles.greeting}>
              I feel...
            </Text>
            <View style={styles.list}>
              {Symptoms.map((symptom) => {
                return(
                  <SymptomTile
                    key={symptom.id}
                    iconName={symptom.name}
                    title={symptom.description}
                    extraStyles={{ marginRight: 30, marginBottom: 30 }}
                    onPress={() => navigation.pop()}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <AddFlowNavBar left={() => navigation.pop()} right={() => {}} />
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
    justifyContent: "center",
    flexWrap: "wrap",
    paddingLeft: 30
  },
});
