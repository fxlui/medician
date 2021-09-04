import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<
  AddFlowParamList,
  "TemperatureSelectionScreen"
>;

const TemperatureSelectionScreen = ({ navigation }: ScreenProps) => {
  const [measured, setMeasured] = useState<boolean | null>(null);

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>
          Were you able to take your temperature?
        </Text>
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
        left={() => navigation.pop()}
        right={() => {
          if (measured === null) {
            Alert.alert("No Selection", "You need to select an option first!");
          } else if (measured === true) {
            navigation.navigate("TemperatureScreen");
          } else {
            navigation.navigate("SymptomsScreen"); // end
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

export default TemperatureSelectionScreen;
