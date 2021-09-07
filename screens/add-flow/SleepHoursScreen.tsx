import React, { useState } from "react";
import { StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import TileBase from "../../components/TileBase";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { useStores } from "../../models/root-store-provider";
import { AddFlowParamList, RootStackParamList } from "../../types";

import { Entypo } from "@expo/vector-icons";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "SleepHoursScreen">,
  StackScreenProps<RootStackParamList>
>;

const SleepHoursScreen = ({ navigation, route }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const defaultHours = route.params.method === "add" ? 8.5 : 8; // TODO get from store
  const [hours, setHours] = useState(defaultHours);
  const { addFlowStore } = useStores();

  return (
    <SafeView style={styles.container} disableTop>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
          }}
        >
          <Text style={styles.greeting}>How long did you sleep?</Text>
          <Text style={styles.greetingSub}>
            Put in an estimate if you're not sure.
          </Text>
        </View>
        <View style={styles.child}>
          <Text
            style={{
              fontSize: 60,
              padding: 20,
            }}
          >
            {Math.round(hours * 10) / 10} hr{hours === 1 ? "" : "s"}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          bottom: 100,
          width: "100%",
          borderRadius: 10,
          padding: 20,
          backgroundColor: "transparent",
        }}
      >
        <TileBase
          onClick={() => setHours((prev) => (prev >= 0.5 ? prev - 0.5 : prev))}
          style={{ marginRight: 40, height: 100, width: 100 }}
          gradient={[tileColor, tileColor]}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="minus" size={35} color={textColor} />
          </View>
        </TileBase>
        <TileBase
          onClick={() => setHours((prev) => prev + 0.5)}
          style={{ height: 100, width: 100 }}
          gradient={[tileColor, tileColor]}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="plus" size={35} color={textColor} />
          </View>
        </TileBase>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          if (route.params.method === "add") {
            addFlowStore.currentNewRecord.setRecordSleep(hours);
          } else {
            // TODO handle edit
          }
          navigation.navigate("SeverityScreen", route.params);
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
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
  greetingSub: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 30,
    opacity: 0.5,
    maxWidth: "80%",
  },
});

export default SleepHoursScreen;
