import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import SelectionTile from "../../components/SelectionTile";
import { observer } from "mobx-react-lite";
import { useStores } from "../../models/root-store-provider";
import { StackScreenProps } from "@react-navigation/stack";
import { getEditDescription } from "../../utils/ScreenUtils";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "DizzyScreen">,
  StackScreenProps<RootStackParamList>
>;

const DizzyScreen = observer(({ navigation, route }: ScreenProps) => {
  const { addFlowStore, progressStore, editFlowStore } = useStores();
  const defaultDizzyState =
    route.params.method === "add"
      ? null
      : !editFlowStore.currentEditingRecord
      ? null
      : editFlowStore.currentEditingRecord.dizzy === 0
      ? true
      : false;
  const [value, setValue] = useState<boolean | null>(defaultDizzyState);

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
            title="Head"
            selected={value}
            onPress={() => setValue(true)}
            extraStyles={{
              marginBottom: 40,
            }}
          />
          <SelectionTile
            title="Room"
            selected={value === null ? null : !value}
            onPress={() => setValue(false)}
          />
        </View>
      </View>
      <AddFlowNavBar
        preventRightDefault
        left={() => navigation.pop()}
        right={() => {
          if (value === null) {
            Alert.alert("No Selection", "You need to select an option first.");
          } else {
            if (route.params.method === "add") {
              addFlowStore.currentNewRecord.setRecordDizzy(value ? 0 : 1);
            } else {
              editFlowStore.currentEditingRecord?.updateRecordDizzy(
                value ? 0 : 1
              );
            }
            progressStore.goForward();
            navigation.navigate("SeverityScreen", route.params);
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
    maxWidth: "80%",
  },
});

export default DizzyScreen;
