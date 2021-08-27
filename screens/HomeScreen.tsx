import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  Platform,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import * as Haptics from "expo-haptics";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import Tile from "../components/Tile";
import useColorScheme from "../hooks/useColorScheme";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e26d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145ee26d72",
    title: "Fourth Item",
  },
];

const HomeScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  const navigation = useNavigation();

  interface baseData {
    index: number;
    dataIndex: number;
    item: {
      id: string;
      title: string;
    };
  }
  const renderTile = ({ item, index }: baseData) => {
    return (
      <Tile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
      />
    );
  };
  const colorScheme = useColorScheme();

  return (
    <SafeView>
      <View
        style={{
          position: "absolute",
          top: 0,
          height: getStatusBarHeight(),
          width: Dimensions.get("window").width,
          backgroundColor: colorScheme === "light" ? "#F9F9F9" : "#000",
          opacity: 1,
          zIndex: 100,
        }}
      />
      <View style={styles.child}>
        <ScrollView
          style={{ overflow: "visible" }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greeting}>Good evening 🌥,{"\n"}Ririmes</Text>

          <Text style={styles.title}>Medication</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={0.9}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />

          <Text style={styles.title}>Exercise</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={0.9}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />

          <Text style={styles.title}>Appointment</Text>
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            activeSlideAlignment={"start"}
            containerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={165}
            inactiveSlideOpacity={0.9}
            onScrollIndexChanged={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text style={styles.title}>Test</Text>
          <Text style={styles.title}>Test</Text>
          <Text style={styles.title}>Test</Text>
        </ScrollView>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    flex: 1,
    paddingLeft: 25,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    paddingLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 20,
    paddingLeft: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});

export default HomeScreen;