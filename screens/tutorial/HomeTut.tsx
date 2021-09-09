import React, { useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList } from "../../types";
import SafeView from "../../components/SafeView";
import TutorialNavBar from "../../components/TutorialNavBar";
import { Home } from "../../assets/images/Home";

import { StackScreenProps } from "@react-navigation/stack";

type ScreenProps = StackScreenProps<TutorialParamList, "ActionTut">;

const HomeTut: React.FC<ScreenProps> = ({ navigation }) => {

  return (
    <SafeView style={styles.container} disableTop>
        <Text style={styles.greeting}>You will be able to see 👀 all 
your notifications here</Text>
          <View style={styles.img}>
            <Image 
              style={{
                width: 295,
                height: 578,
                borderRadius: 15
              }}
              source={Home}
            />
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginLeft: 5,
    marginRight: 15,
    marginBottom: 10,
    textAlign: "center"
  },
  img : {
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});

export default HomeTut;
