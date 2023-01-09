import React, { useState } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import { TopTile } from "../../components/AreaTile";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { useStores } from "../../models/root-store-provider";
import { getEditDescription } from "../../utils/ScreenUtils";
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
    const { height, width } = useWindowDimensions();
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
            marginLeft: 5,
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
          <Text style={{ paddingLeft: 30, opacity: 0.7, paddingTop: 20 }}>
            Editing record for{" "}
            {getEditDescription(
              editFlowStore.currentSymptomType,
              editFlowStore.currentEditingRecord?.subArea
            )}
          </Text>
        ) : null}
        <Text style={styles.greeting}></Text>
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
            sliderWidth={width}
            containerCustomStyle={{
              paddingVertical: 150,
              overflow: "visible",
            }}
            itemWidth={160}
            inactiveSlideOpacity={Platform.OS === "android" ? 1 : 0.8}
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
