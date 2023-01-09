import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import { useStores } from "../../models/root-store-provider";
import { observer } from "mobx-react-lite";
import { StackScreenProps } from "@react-navigation/stack";
import { getEditDescription } from "../../utils/ScreenUtils";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletScreen">;

const ToiletScreen = observer(({ navigation, route }: ScreenProps) => {
  const { addFlowStore, progressStore, editFlowStore } = useStores();
  const defaultPee =
    route.params.method === "add"
      ? null
      : !editFlowStore.currentEditingRecord
      ? null
      : editFlowStore.currentEditingRecord.toiletType === 0
      ? true
      : editFlowStore.currentEditingRecord.toiletType === 2
      ? true
      : false;
  const defaultPoo =
    route.params.method === "add"
      ? null
      : !editFlowStore.currentEditingRecord
      ? null
      : editFlowStore.currentEditingRecord.toiletType === 1
      ? true
      : editFlowStore.currentEditingRecord.toiletType === 2
      ? true
      : false;
  const [pee, setPee] = useState<boolean | null>(defaultPee);
  const [poo, setPoo] = useState<boolean | null>(defaultPoo);

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        {route.params.method === "edit" ? (
          <Text style={{ paddingLeft: 30, opacity: 0.7, paddingTop: 20 }}>
            Editing record for{" "}
            {getEditDescription(
              editFlowStore.currentSymptomType,
              editFlowStore.currentEditingRecord?.subArea
            )}
          </Text>
        ) : null}
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
          if (
            (pee === null && poo === null) ||
            (pee === false && poo === null) ||
            (poo === false && pee === null) ||
            (poo === false && pee === false)
          ) {
            Alert.alert("No Selection", "You need to select an option first!");
          } else {
            if (route.params.method === "add") {
              addFlowStore.currentNewRecord.setRecordToiletType(
                pee && poo ? 2 : pee ? 0 : poo ? 1 : -1
              );
              progressStore.goForward();
            } else {
              editFlowStore.currentEditingRecord?.updateRecordToiletType(
                pee && poo ? 2 : pee ? 0 : poo ? 1 : -1
              );
              progressStore.goForward();
            }
            navigation.navigate("ToiletPainScreen", route.params);
          }
        }}
      />
    </SafeView>
  );
});

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
