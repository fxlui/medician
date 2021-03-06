import React, { useState } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import { AddFlowParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { TopTile, BottomTile } from "../../components/AreaTile";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import Carousel from "react-native-snap-carousel";
import { StackScreenProps } from "@react-navigation/stack";
import BodyAreas from "../../assets/BodyAreas.json";
import { useStores } from "../../models/root-store-provider";
import CustomHaptics from "../../utils/CustomHaptics";

type ScreenProps = StackScreenProps<AddFlowParamList, "SeverityScreen">;

interface topBaseData {
  index: number;
  dataIndex: number;
  item: {
    id: number;
    emoji: string;
    text: string;
  };
}

interface bottomBaseData {
  index: number;
  dataIndex: number;
  item: {
    id: number;
    text: string;
  };
}

const AreaSelect: React.FC<ScreenProps> = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottom, setSelectedBottom] = useState(0);
  const { addFlowStore } = useStores();

  const topRef =
    React.createRef<Carousel<{ id: number; emoji: string; text: string }>>();
  const bottomRef = React.createRef<Carousel<{ id: number; text: string }>>();

  const bodyAreaArr = BodyAreas;

  const renderTopTile = ({ item, index }: topBaseData) => {
    return (
      <TopTile
        title={item.text}
        style={{
          marginLeft: 5,
        }}
        index={index}
        emoji={item.emoji}
        selected={selectedTop === index}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const renderBottomTile = ({ item, index }: bottomBaseData) => {
    return (
      <BottomTile
        title={item.text}
        style={{
          marginLeft: 5,
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
        <View>
          <Text style={styles.greeting}>Where is the area affected?</Text>
        </View>
        <View style={styles.child}>
          <Carousel
            data={bodyAreaArr.map((item) => ({
              id: item.id,
              emoji: item.emoji,
              text: item.text,
            }))}
            renderItem={renderTopTile}
            vertical={false}
            sliderWidth={width}
            containerCustomStyle={{
              overflow: "visible",
              flexGrow: 0,
            }}
            contentContainerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={Platform.OS === "android" ? 1 : 0.8}
            onScrollIndexChanged={(index) => {
              setSelectedTop(index);
              setSelectedBottom(0);
              bottomRef.current?.snapToItem(0);
              CustomHaptics("light");
            }}
            ref={topRef}
          />
          <Carousel
            data={bodyAreaArr[selectedTop].parts.map((item, index) => ({
              id: index,
              text: item,
            }))}
            renderItem={renderBottomTile}
            vertical={false}
            sliderWidth={width}
            containerCustomStyle={{
              overflow: "visible",
              flexGrow: 0,
              marginTop: 50,
            }}
            contentContainerCustomStyle={{
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={Platform.OS === "android" ? 1 : 0.8}
            onScrollIndexChanged={(index) => {
              setSelectedBottom(index);
              CustomHaptics("light");
            }}
            ref={bottomRef}
          />
        </View>
      </View>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => {
          addFlowStore.currentNewRecord.setRecordAreas(
            bodyAreaArr[selectedTop].text,
            bodyAreaArr[selectedTop].parts[selectedBottom]
          );
          navigation.navigate("SeverityScreen", { method: "add" });
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
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  greeting: {
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
