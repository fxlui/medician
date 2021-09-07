import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import { useStores } from "../../models/root-store-provider";

import { StackScreenProps } from "@react-navigation/stack";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletScreen">;

const ToiletScreen = ({ navigation }: ScreenProps) => {
  const [pee, setPee] = useState<boolean | null>(null);
  const [poo, setPoo] = useState<boolean | null>(null);

  const { addFlowStore } = useStores();

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>Please select all that applies.</Text>
        <View style={styles.child}>
          <SelectionTile
            title="Urination"
            selected={pee}
            onPress={() => setPee((prev) => !prev)}
            extraStyles={{
              marginBottom: 40,
            }}
          />
          <SelectionTile
            title="Defecation"
            selected={poo}
            onPress={() => setPoo((prev) => !prev)}
          />
        </View>
      </View>
      <AddFlowNavBar
        preventRightDefault
        left={() => navigation.pop()}
        right={() => {
          if (pee === null && poo === null) {
            Alert.alert("No Selection", "You need to select an option first!");
          } else {
            addFlowStore.currentNewRecord.setRecordToiletType(
              pee ? 0 : poo ? 1 : -1
            );
            addFlowStore.goForward();
            navigation.navigate("ToiletPainScreen");
          }
        }}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  child: {
    marginTop: 50,
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  childtwo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  numberView: {
    width: 210,
  },
  sliderView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  numbers: {
    opacity: 0.5,
    fontWeight: "600",
    fontSize: 16,
  },
  emoji: {
    fontSize: 135,
  },
  desc: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  greeting: {
    flex: 1,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
});

export default ToiletScreen;
