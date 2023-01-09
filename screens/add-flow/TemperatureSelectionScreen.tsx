import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { useStores } from "../../models/root-store-provider";
import { observer } from "mobx-react-lite";
import { getEditDescription } from "../../utils/ScreenUtils";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "TemperatureSelectionScreen">,
  StackScreenProps<RootStackParamList>
>;

const TemperatureSelectionScreen = observer(
  ({ navigation, route }: ScreenProps) => {
    const { editFlowStore, progressStore } = useStores();
    const defaultSelection =
      route.params.method === "add"
        ? null
        : editFlowStore.currentEditingRecord === undefined
        ? null
        : editFlowStore.currentEditingRecord.temperature === 0
        ? false
        : true; // TODO get from store
    const [measured, setMeasured] = useState<boolean | null>(defaultSelection);

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
              selected={measured}
              onPress={() => setMeasured(true)}
              extraStyles={{
                marginBottom: 40,
              }}
            />
            <SelectionTile
              title="No"
              selected={measured === null ? null : !measured}
              onPress={() => setMeasured(false)}
            />
          </View>
        </View>
        <AddFlowNavBar
          preventRightDefault
          left={() => navigation.pop()}
          right={() => {
            if (measured === null) {
              Alert.alert(
                "No Selection",
                "You need to select an option first."
              );
            } else if (measured === true) {
              if (route.params.method === "add") {
                progressStore.goForward();
              } else {
                // TODO handle edit
              }
              progressStore.goForward();
              navigation.navigate("TemperatureScreen", route.params);
            } else {
              if (route.params.method === "edit") {
                editFlowStore.currentEditingRecord?.updateRecordTemperature(0);
              }
              progressStore.goForward();
              progressStore.goForward();
              navigation.navigate("SeverityScreen", route.params);
            }
          }}
        />
      </SafeView>
    );
  }
);

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

export default TemperatureSelectionScreen;
