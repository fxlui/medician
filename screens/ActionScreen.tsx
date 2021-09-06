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
import { PressableBase } from "../components/PressableBase";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, "ActionScreen">,
  StackScreenProps<AddFlowParamList>
>;

export default function ActionScreen({ navigation }: ScreenProps) {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          Good evening 🌥,{"\n"}How are you today?
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
                navigation.navigate("AddFlow", {
                  screen: "AppointmentTimeScreen",
                });
              }}
            />
            <AddTile
              title={"Add"}
              subtitle={"Routine"}
              onPress={() => {
                navigation.navigate("AddFlow", {
                  screen: "RoutineSelectScreen",
                });
              }}
            />
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
    flexDirection: "column",
    alignItems: "center",
  },
  addTiles: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    position: "absolute",
    marginTop: "160%",
  },
});
