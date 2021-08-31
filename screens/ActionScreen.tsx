import React from "react";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { TileSize } from "../components/TileBase";
import EntryTile from "../components/EntryTile";
import AddTile from "../components/AddTile";
import { PressableBase } from "../components/PressableBase";
import CancelSvg from "../components/CancelSvg";
import { RootStackParamList } from "../types";

type ScreenProps = StackScreenProps<RootStackParamList, "ActionScreen">

export default function ActionScreen({ navigation }: ScreenProps) {

  const handleSymptom = () => {
    navigation.navigate("AddFlow");
  }

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
            style={{marginBottom: 30}}
            size={TileSize.XL}
            list={"symptoms"}
            onClick={handleSymptom}
          />
          <EntryTile 
            title={"I can't..."}
            emoji="😣"
            style={{marginBottom: 30}}
            size={TileSize.XL}
            list={"inabilities"}

            onClick={handleSymptom}
          />
          <View style={styles.addTiles}>
            <AddTile
              title={"Add"}
              subtitle={"Appointment"}
            />
            <AddTile
              title={"Add"}
              subtitle={"Treatment"}
            />
          </View>
          <PressableBase
            extraProps={{ style: styles.cancelButton }}
            onPress={() => navigation.pop()}
          >
            <CancelSvg fill="#F8583B" width={35} height={35} />
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
    paddingRight: 25
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    marginLeft: 5
  },
  tiles: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center"
  },
  addTiles: {
    alignSelf: "stretch",
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between"
  },
  cancelButton: {
    position: "absolute",
    bottom: -120
  }
});
