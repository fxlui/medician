import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import ProgressBar from "./ProgressBar";

import * as Haptics from "expo-haptics";
import Slider from "@react-native-community/slider";

const Severity = () => {
  const [severity, setSeverity] = useState(0);
  const colorScheme = useColorScheme();

  return (
    <SafeView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ProgressBar percentage={0.5} />
        <Text style={styles.greeting}>How severe is it?</Text>
        <View style={styles.child}>
          <Text style={styles.emoji}>😄</Text>
          <Text style={styles.desc}>Discomfort</Text>
        </View>
        <View style={styles.childtwo}>
          <View style={styles.numberView}>
            <Text
              style={[
                styles.numbers,
                {
                  fontSize: 20,
                  opacity: 1,
                  marginBottom: 15,
                  marginLeft: severity * 21 - (severity === 10 ? 25 : 21),
                },
              ]}
            >
              {severity}
            </Text>
          </View>
          <View style={styles.sliderView}>
            <Text style={styles.numbers}>1</Text>
            <Slider
              style={{
                width: 220,
                height: 40,
                marginLeft: 15,
                marginRight: 15,
              }}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor={
                colorScheme === "light" ? "#e0e0e0" : "#323232"
              }
              maximumTrackTintColor={
                colorScheme === "light" ? "#e0e0e0" : "#323232"
              }
              thumbTintColor="#767676"
              step={1}
              onValueChange={(value) => {
                setSeverity(value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
            <Text style={styles.numbers}>10</Text>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: 120,
  },
  child: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  childtwo: {
    flex: 2,
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
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});

export default Severity;
