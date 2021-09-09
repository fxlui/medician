import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import { TopTile } from "../../components/AreaTile";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { useStores } from "../../models/root-store-provider";

import Carousel from "react-native-snap-carousel";
import CustomHaptics from "../../utils/CustomHaptics";
import { observer } from "mobx-react-lite";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "ToiletColorScreen">,
  StackScreenProps<RootStackParamList>
>;
const DATA = [
  {
    emoji: "🟤",
    title: "Brown",
  },
  {
    emoji: "🟢",
    title: "Green",
  },
  {
    emoji: "🔴",
    title: "Red",
  },
  {
    emoji: "⚫",
    title: "Black",
  },
];

interface baseData {
  index: number;
  dataIndex: number;
  item: {
    emoji: string;
    title: string;
  };
}

const ToiletColorScreen: React.FC<ScreenProps> = observer(
  ({ navigation, route }) => {
    const { addFlowStore, editFlowStore } = useStores();
    const defaultSelection =
      route.params.method === "add"
        ? 0
        : !editFlowStore.currentEditingRecord
        ? 0
        : editFlowStore.currentEditingRecord.toiletType === -1
        ? 0
        : editFlowStore.currentEditingRecord.toiletType;
    const [selected, setSelected] = useState(defaultSelection);

    const tileRef =
      React.createRef<Carousel<{ emoji: string; title: string }>>();

    const renderTile = ({ item, index }: baseData) => {
      return (
        <TopTile
          emoji={item.emoji}
          title={item.title}
          style={{
            marginRight: 15,
          }}
          index={index}
          selected={selected === index}
          updater={() => {
            tileRef.current?.snapToItem(index);
          }}
          colorTile
        />
      );
    };

    return (
      <SafeView style={styles.container} disableTop>
        {route.params.method === "edit" ? (
          <Text style={{ paddingLeft: 30, opacity: 0.7 }}>
            Editing record for {editFlowStore.currentSymptomType} at{" "}
            {editFlowStore.currentEditingRecord?.subArea}
          </Text>
        ) : null}
        <Text style={styles.greeting}>What colour is it?</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 9,
          }}
        >
          <Carousel
            data={DATA}
            renderItem={renderTile}
            vertical={false}
            sliderWidth={Dimensions.get("window").width}
            containerCustomStyle={{
              paddingVertical: 150,
              overflow: "visible",
            }}
            contentContainerCustomStyle={{
              justifyContent: "center",
              alignItems: "flex-start",
              overflow: "visible",
            }}
            itemWidth={150}
            inactiveSlideOpacity={0.8}
            onLayout={() => {
              tileRef.current?.snapToItem(selected, false, false);
            }}
            onScrollIndexChanged={(index) => {
              setSelected(index);
              CustomHaptics("light");
            }}
            ref={tileRef}
          />
        </View>
        <AddFlowNavBar
          left={() => navigation.pop()}
          right={() => {
            if (route.params.method === "add") {
              addFlowStore.currentNewRecord.setRecordColor(selected);
            } else {
              editFlowStore.currentEditingRecord?.updateRecordColor(selected);
            }
            navigation.navigate("SeverityScreen", route.params);
          }}
        />
      </SafeView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  greeting: {
    flex: 2,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
});

export default ToiletColorScreen;
