import React, { useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList, RootStackParamList } from "../../types";
import SafeView from "../../components/SafeView";
import TutorialNavBar from "../../components/TutorialNavBar";
import TileBase from "../../components/TileBase";
import useColorScheme from "../../hooks/useColorScheme";

import { StackScreenProps } from "@react-navigation/stack";
import CustomHaptics from "../../utils/CustomHaptics";
import { CompositeScreenProps } from "@react-navigation/core";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<TutorialParamList, "HomeTut">,
  StackScreenProps<RootStackParamList, "Root">
>;

const WelcomeTut: React.FC<ScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";


  return (
    <SafeView disableBottom>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.header}>
              <Text style={styles.greeting}>
                👋 Hello.{"\n"}
                Welcome to Medician.{"\n"}
              </Text>
              <Text style={styles.greeting}>
                Let's get you familiar{"\n"}
                with the app.{"\n"}
              </Text>
            </View>

            <View style={{
              alignItems: "center"
            }}>

            <TileBase
              gradient={[tileColor, tileColor]}
              style={{
                marginTop: 40,
                width: 150,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigation.navigate("Root");
                CustomHaptics("light");
              }}
              >
              <Text style={{ fontSize: 16, fontWeight: "500"}}>
                Skip Tutorial
              </Text>
            </TileBase>
          </View>
        
         </View>
        </ScrollView>
      </View>
      <TutorialNavBar
        left={() => {
          navigation.pop();
        }}
        right={() => {
          navigation.navigate("HomeTut");
        }}
        hideLeft={true}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    marginLeft: 30,
    marginTop: 250,    
    marginRight: 15,
    flexDirection: "column",
    justifyContent: "center"
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
  },
  list: {
    overflow: "visible",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 40,
  },
});
export default WelcomeTut;
