import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import { observer } from "mobx-react-lite";
import { useStores } from "../../models/root-store-provider";
import { StackScreenProps } from "@react-navigation/stack";
import { getEditDescription } from "../../utils/ScreenUtils";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletPainScreen">;

const ToiletPainScreen = observer(({ navigation, route }: ScreenProps) => {
  const { addFlowStore, progressStore, editFlowStore } = useStores();
  console.log(editFlowStore.currentEditingRecord?.toiletPain);
  const defaultSelection =
    route.params.method === "add"
      ? null
      : !editFlowStore.currentEditingRecord
      ? null
      : editFlowStore.currentEditingRecord.toiletPain === 0
      ? false
      : true;
  const [pain, setPain] = useState<boolean | null>(defaultSelection);

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
            title="Yes"
            selected={pain}
            onPress={() => setPain(true)}
            extraStyles={{
              marginBottom: 40,
            }}
          />
          <SelectionTile
            title="No"
            selected={pain === null ? null : !pain}
            onPress={() => setPain(false)}
          />
        </View>
      </View>
      <AddFlowNavBar
        preventRightDefault
        left={() => navigation.pop()}
        right={() => {
          if (pain === null) {
            Alert.alert("No Selection", "You need to select an option first.");
          } else {
            if (route.params.method === "add") {
              addFlowStore.currentNewRecord.setRecordToiletPain(pain ? 1 : 0);
            } else {
              console.log(pain ? 1 : 0);
              editFlowStore.currentEditingRecord?.updateRecordToiletPain(
                pain ? 1 : 0
              );
            }
            progressStore.goForward();
            if (addFlowStore.currentNewRecord.toiletType === 0) {
              navigation.navigate("SeverityScreen", route.params);
            } else {
              navigation.navigate("ToiletColorScreen", route.params);
            }
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

export default ToiletPainScreen;
