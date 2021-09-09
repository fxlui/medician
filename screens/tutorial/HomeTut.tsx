import React, { useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { TopTile, BottomTile } from "../../components/AreaTile";
import TutorialNavBar from "../../components/TutorialNavBar";
import { Home } from "../../assets/images/Home";

import { StackScreenProps } from "@react-navigation/stack";

type ScreenProps = StackScreenProps<TutorialParamList, "ActionTut">;

const WelcomeTut: React.FC<ScreenProps> = ({ navigation }) => {

  return (
    <SafeView style={styles.container} disableTop>
      <View>
        <Text style={styles.greeting}>You will be able to see 👀 all 
your notifications here</Text>
        <View style={styles.child}>
          <View style={{justifyContent: "center"}}>
            <Image 
              style={{
                width: 295,
                height: 578,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 9,
                alignSelf: "center",
                justifyContent: "center"
              }}
              source={Home}
            />
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
