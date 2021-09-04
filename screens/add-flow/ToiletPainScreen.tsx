import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import SelectionTile from "../../components/SelectionTile";

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletPainScreen">;

const ToiletPainScreen = ({ navigation }: ScreenProps) => {
  const [pain, setPain] = useState<boolean | null>(null);

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>Does it hurt?</Text>
        <View style={styles.child}>
          <SelectionTile
            title="Yes"
            selected={pain}
            onPress={() => setPain(true)}
            extraStyles={{
              marginBottom: 40,
            }}
          />
          <SelectionTile
            title="No"
            selected={pain === null ? null : !pain}
            onPress={() => setPain(false)}
          />
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          if (pain === null) {
            Alert.alert("No Selection", "You need to select an option first!");
          } else {
            navigation.navigate("ToiletColorScreen");
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

export default ToiletPainScreen;
