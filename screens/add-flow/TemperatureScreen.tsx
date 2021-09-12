import React, { useState } from "react";
import { StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import TileBase from "../../components/TileBase";
import { PressableBase } from "../../components/PressableBase";
import { Entypo } from "@expo/vector-icons";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { useStores } from "../../models/root-store-provider";
import { getEditDescription } from "../../utils/ScreenUtils";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { themeTextColor, themeTileColor } from "../../constants/Colors";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "TemperatureScreen">,
  StackScreenProps<RootStackParamList>
>;

const TemperatureScreen = ({ navigation, route }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const { addFlowStore, editFlowStore } = useStores();

  const defaultTemperature =
    route.params.method === "add"
      ? 37.0
      : !editFlowStore.currentEditingRecord
      ? 36.5
      : editFlowStore.currentEditingRecord.temperature === 0
      ? 37.0
      : editFlowStore.currentEditingRecord.temperature;

  // !! important, data from store could be null so need to have fallback default value
  const [temperature, setTemperature] = useState(defaultTemperature);
  const [unit, setUnit] = useState("C");

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
          }}
        >
          {route.params.method === "edit" ? (
            <Text style={{ paddingLeft: 30, opacity: 0.7 }}>
              Editing record for{" "}
              {getEditDescription(
                editFlowStore.currentSymptomType,
                editFlowStore.currentEditingRecord?.subArea
              )}
            </Text>
          ) : null}
          <Text style={styles.greeting}>What was your temperature?</Text>
          <Text style={styles.greetingSub}>
            Tap on the number to change the unit.
          </Text>
        </View>
        <View style={styles.child}>
          <PressableBase
            onPress={() => {
              if (unit === "C") {
                setTemperature((prev) => (prev * 9) / 5 + 32);
              } else {
                setTemperature((prev) => ((prev - 32) * 5) / 9);
              }
              setUnit(unit === "C" ? "F" : "C");
            }}
          >
            <Text
              style={{
                fontSize: 60,
                padding: 20,
              }}
            >
              {Math.round(temperature * 10) / 10}°{unit}
            </Text>
          </PressableBase>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          bottom: 100,
          width: "100%",
          borderRadius: 10,
          padding: 20,
          backgroundColor: "transparent",
        }}
      >
        <TileBase
          onClick={() => setTemperature((prev) => prev - 0.1)}
          style={{ marginRight: 40, height: 100, width: 100 }}
          gradient={[tileColor, tileColor]}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="minus" size={35} color={textColor} />
          </View>
        </TileBase>
        <TileBase
          onClick={() => setTemperature((prev) => prev + 0.1)}
          style={{ height: 100, width: 100 }}
          gradient={[tileColor, tileColor]}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="plus" size={35} color={textColor} />
          </View>
        </TileBase>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          if (route.params.method === "add") {
            if (unit === "F") {
              addFlowStore.currentNewRecord.setRecordTemperature(
                ((temperature - 32) * 5) / 9
              );
            } else {
              addFlowStore.currentNewRecord.setRecordTemperature(temperature);
            }
            navigation.navigate("AreaSelectScreen");
          } else {
            if (unit === "F") {
              editFlowStore.currentEditingRecord?.updateRecordTemperature(
                ((temperature - 32) * 5) / 9
              );
            } else {
              editFlowStore.currentEditingRecord?.updateRecordTemperature(
                temperature
              );
            }
            navigation.navigate("SeverityScreen", route.params);
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
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
  greetingSub: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 30,
    opacity: 0.5,
  },
});

export default TemperatureScreen;
