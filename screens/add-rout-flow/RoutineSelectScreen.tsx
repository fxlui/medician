import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";

import Icon from "../../components/Icon";
import SafeView from "../../components/SafeView";
import { RootStackParamList, AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import TileBase, { TileSize } from "../../components/TileBase";
import { PressableBase } from "../../components/PressableBase";
import useColorScheme from "../../hooks/useColorScheme";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList>,
  StackScreenProps<AddFlowParamList, "RoutineSelectScreen">
>;

export default function RoutineSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const handleSelectMedication = () => {
    navigation.navigate("RoutineDetailsScreen", { type: "medication" });
  };

  const handleSelectExercise = () => {
    navigation.navigate("RoutineDetailsScreen", { type: "exercise" });
  };

  return (
    <SafeView disableTop>
      <View style={styles.container}>
        <Text style={styles.greeting}>Choose the type of routine...</Text>
        <View style={styles.tiles}>
          <TileBase
            size={TileSize.ActionAdd}
            gradient={[tileColor, tileColor]}
            onClick={handleSelectMedication}
            style={{ marginBottom: 30 }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <Icon
                name="Medication"
                props={{ style: { marginLeft: 2, marginTop: 2 } }}
              />
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Medication
              </Text>
            </View>
          </TileBase>

          <TileBase
            size={TileSize.ActionAdd}
            gradient={[tileColor, tileColor]}
            onClick={handleSelectExercise}
          >
            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <Icon
                name="Exercise"
                props={{ style: { marginLeft: 2, marginTop: 2 } }}
              />
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Exercise</Text>
            </View>
          </TileBase>
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
    flex: 1,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    marginLeft: 5,
  },
  tiles: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
