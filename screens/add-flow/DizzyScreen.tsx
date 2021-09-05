import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import SelectionTile from "../../components/SelectionTile";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "DizzyScreen">,
  StackScreenProps<RootStackParamList>
>;

const DizzyScreen = ({ navigation }: ScreenProps) => {
  const [value, setValue] = useState<boolean | null>(null);

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>
          Is your head spinning or the room spinning?
        </Text>
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
        left={() => navigation.pop()}
        right={() => {
          if (value === null) {
            Alert.alert("No Selection", "You need to select an option first.");
          } else {
            navigation.navigate("Root");
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
    maxWidth: "80%",
  },
});

export default DizzyScreen;