import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletScreen">;

const ToiletScreen = ({ navigation }: ScreenProps) => {
  const [pee, setPee] = useState<boolean | null>(null);
  const [poo, setPoo] = useState<boolean | null>(null);

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>Please select all that applies.</Text>
        <View style={styles.child}>
          <SelectionTile
            title="Pee"
            selected={pee}
            onPress={() => setPee((prev) => !prev)}
            extraStyles={{
              marginBottom: 40,
            }}
          />
          <SelectionTile
            title="Poo"
            selected={poo}
            onPress={() => setPoo((prev) => !prev)}
          />
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          if (pee === null && poo === null) {
            Alert.alert("No Selection", "You need to select an option first!");
          } else {
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