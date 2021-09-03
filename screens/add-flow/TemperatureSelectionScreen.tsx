import React, { useState } from "react";
import { StyleSheet } from "react-native";
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
  const colorScheme = useColorScheme();
  const [measured, setMeasured] = useState(false);

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
            selected={!measured}
            onPress={() => setMeasured(false)}
          />
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        // some logic here
        right={() => navigation.navigate("TimeSelectScreen")}
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
