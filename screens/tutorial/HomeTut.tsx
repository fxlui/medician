import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { TopTile, BottomTile } from "../../components/AreaTile";
import TutorialNavBar from "../../components/TutorialNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import CustomHaptics from "../../utils/CustomHaptics";

type ScreenProps = StackScreenProps<TutorialParamList, "ActionTut">;

const WelcomeTut: React.FC<ScreenProps> = ({ navigation }) => {

  return (
    <SafeView style={styles.container} disableTop>
      <View>
        <Text style={styles.greeting}>Where is the area affected?</Text>
        <View style={styles.child}>
          <View style={{}}>
            <Text>Home</Text>
          </View>
        </View>
      </View>
      <TutorialNavBar
        left={() => navigation.pop()}
        right={() => {
          
          navigation.navigate("ActionTut");
        }}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  child: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    flex: 1,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});

export default WelcomeTut;
