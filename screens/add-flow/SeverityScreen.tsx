import React, { useState } from "react";
import { StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { useStores } from "../../models/root-store-provider";
import Slider from "@react-native-community/slider";

type ScreenProps = StackScreenProps<AddFlowParamList, "SeverityScreen">;

const getDiscomfortEmoji = (severity: number) => {
  if (severity < 4) {
    return "😐";
  } else if (severity < 7) {
    return "😕";
  } else if (severity < 10) {
    return "😖";
  } else {
    return "😡";
  }
};

const getDiscomfortText = (severity: number) => {
  if (severity < 4) {
    return "Minor discomfort";
  } else if (severity < 7) {
    return "Moderate discomfort";
  } else if (severity < 10) {
    return "Severe discomfort";
  } else {
    return "Unbearable";
  }
};

const Severity = ({ navigation, route }: ScreenProps) => {
  const defaultSeverity = route.params.method === "add" ? 1 : 1; // TODO get from store
  const [severity, setSeverity] = useState(defaultSeverity);
  const colorScheme = useColorScheme();
  const { addFlowStore } = useStores();

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        {route.params.method === "edit" ? (
          <Text style={{ paddingLeft: 30, opacity: 0.7 }}>
            Editing record for MOBX_PAIN at MOBX_AREA
          </Text>
        ) : null}
        <Text style={styles.greeting}>How severe is it?</Text>
        <View style={styles.child}>
          <Text style={styles.emoji}>{getDiscomfortEmoji(severity)}</Text>
          <Text style={styles.desc}>{getDiscomfortText(severity)}</Text>
        </View>
        <View style={styles.childtwo}>
          <View style={styles.numberView}>
            <Text
              style={[
                styles.numbers,
                {
                  fontSize: 20,
                  opacity: 0.8,
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
                if (value > 4) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                } else if (value > 7) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                } else {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
            />
            <Text style={styles.numbers}>10</Text>
          </View>
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          if (route.params.method === "add") {
            addFlowStore.currentNewRecord.setRecordSeverity(severity);
            navigation.navigate("TimeSelectScreen");
          } else {
            // TODO handle edit
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

export default Severity;
