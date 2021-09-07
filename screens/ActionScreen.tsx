import React from "react";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";

import Icon from "../components/Icon";
import AddTile from "../components/AddTile";
import SafeView from "../components/SafeView";
import { RootStackParamList, AddFlowParamList } from "../types";
import EntryTile from "../components/EntryTile";
import { Text, View } from "../components/Themed";
import { TileSize } from "../components/TileBase";
import { useStores } from "../models/root-store-provider";
import { PressableBase } from "../components/PressableBase";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, "ActionScreen">,
  StackScreenProps<AddFlowParamList>
>;

const greetingTextFromTime = () => {
  const now = new Date();
  if (now.getHours() > 21 || now.getHours() < 5) {
    return "Good evening 💤,";
  } else if (now.getHours() < 12) {
    return "Good morning 🌅,";
  } else if (now.getHours() < 18) {
    return "Good afternoon ☀️,";
  } else {
    return "Good evening 🌙,";
  }
};

export default function ActionScreen({ navigation }: ScreenProps) {
  const { addFlowStore } = useStores();

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {greetingTextFromTime()}
          {"\n"}How are you feeling?
        </Text>
        <View style={styles.tiles}>
          <EntryTile
            title={"I feel..."}
            emoji="😔"
            style={{ marginBottom: 30 }}
            size={TileSize.XL}
            list={"symptoms"}
            onClick={() =>
              navigation.navigate("AddFlow", {
                screen: "SymptomsScreen",
                params: { type: "feel" },
              })
            }
          />
          <EntryTile
            title={"I can't..."}
            emoji="😣"
            style={{ marginBottom: 30 }}
            size={TileSize.XL}
            list={"inabilities"}
            onClick={() =>
              navigation.navigate("AddFlow", {
                screen: "SymptomsScreen",
                params: { type: "cant" },
              })
            }
          />
          <View style={styles.addTiles}>
            <AddTile
              title={"Add"}
              subtitle={"Appointment"}
              style={{ marginRight: 30 }}
              onPress={() => {
                addFlowStore.resetProgress();
                addFlowStore.resetAppointment();
                addFlowStore.setProgressBarLength(2);
                navigation.navigate("AddFlow", {
                  screen: "AppointmentTimeScreen",
                });
              }}
            />
            <AddTile
              title={"Add"}
              subtitle={"Routine"}
              onPress={() => {
                addFlowStore.resetProgress();
                addFlowStore.resetRoutine();
                addFlowStore.setProgressBarLength(3);
                navigation.navigate("AddFlow", {
                  screen: "RoutineSelectScreen",
                });
              }}
            />
          </View>
        </View>
        <PressableBase
          extraProps={{
            style: styles.cancelButton,
            accessibilityLabel: "Cancel Add Action",
          }}
          onPress={() => navigation.pop()}
        >
          <Icon
            name="Cancel"
            props={{
              fill: "#F8583B",
              width: 30,
              height: 30,
            }}
          />
        </PressableBase>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    marginLeft: 5,
  },
  tiles: {
    marginTop: 50,
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  addTiles: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
