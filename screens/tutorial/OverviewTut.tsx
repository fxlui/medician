import React, { useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { TopTile, BottomTile } from "../../components/AreaTile";
import TutorialNavBar from "../../components/TutorialNavBar";
import { Overview } from "../../assets/images/Overview";

import { StackScreenProps } from "@react-navigation/stack";

type ScreenProps = StackScreenProps<TutorialParamList>;

const HomeTut: React.FC<ScreenProps> = ({ navigation }) => {

  return (
    <SafeView style={styles.container} disableTop>
        <Text style={styles.greeting}>You can view all the details
about your symptoms here </Text>
          <View style={styles.img}>
            <Image 
              style={{
                width: 295,
                height: 578,
                borderRadius: 15
              }}
              source={Overview}
            />
          </View>
      <TutorialNavBar
        left={() => navigation.pop()}
        right={() => {
          navigation.navigate("EndingTut");
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
