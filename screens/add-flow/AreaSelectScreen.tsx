import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import { AddFlowParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { TopTile, BottomTile } from "../../components/AreaTile";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";

type ScreenProps = StackScreenProps<AddFlowParamList, "SeverityScreen">;

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

interface baseData {
  index: number;
  dataIndex: number;
  item: {
    id: string;
    title: string;
  };
}

const AreaSelect: React.FC<ScreenProps> = ({ navigation }) => {
  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottom, setSelectedBottom] = useState(0);

  const topRef = React.createRef<Carousel<{ id: string; title: string }>>();
  const bottomRef = React.createRef<Carousel<{ id: string; title: string }>>();

  const renderTopTile = ({ item, index }: baseData) => {
    return (
      <TopTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={selectedTop === index}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const renderBottomTile = ({ item, index }: baseData) => {
    return (
      <BottomTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={selectedBottom === index}
        updater={() => {
          bottomRef.current?.snapToItem(index);
        }}
      />
    );
  };

  return (
    <SafeView style={styles.container} disableTop>
      <View>
        <Text style={styles.greeting}>Where is the area affected?</Text>
        <View style={styles.child}>
          <View style={{}}>
            <Carousel
              data={DATA}
              renderItem={renderTopTile}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              containerCustomStyle={{
                overflow: "visible",
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                alignItems: "flex-end",
                overflow: "visible",
              }}
              itemWidth={150}
              inactiveSlideOpacity={0.8}
              onScrollIndexChanged={(index) => {
                setSelectedTop(index);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onSnapToItem={(index) => {}}
              ref={topRef}
            />
            <Carousel
              data={DATA}
              renderItem={renderBottomTile}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              containerCustomStyle={{
                overflow: "visible",
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                alignItems: "flex-start",
                overflow: "visible",
                marginTop: 50,
                marginBottom: 60,
              }}
              itemWidth={150}
              inactiveSlideOpacity={0.8}
              onScrollIndexChanged={(index) => {
                setSelectedBottom(index);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              ref={bottomRef}
            />
          </View>
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => navigation.navigate("SeverityScreen")}
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

export default AreaSelect;
