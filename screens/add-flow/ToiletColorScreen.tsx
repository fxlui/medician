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

type ScreenProps = StackScreenProps<AddFlowParamList, "ToiletColorScreen">;

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

const ToiletColorScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [selected, setSelected] = useState(0);

  const tileRef = React.createRef<Carousel<{ id: string; title: string }>>();

  const renderTile = ({ item, index }: baseData) => {
    return (
      <BottomTile
        title={item.title}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={selected === index}
        updater={() => {
          tileRef.current?.snapToItem(index);
        }}
      />
    );
  };

  return (
    <SafeView style={styles.container} disableTop>
      <Text style={styles.greeting}>What colour is it?</Text>
      <View>
        <Carousel
          data={DATA}
          renderItem={renderTile}
          vertical={false}
          sliderWidth={Dimensions.get("window").width}
          containerCustomStyle={{
            marginTop: Dimensions.get("window").height * 0.25,
            overflow: "visible",
          }}
          contentContainerCustomStyle={{
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "visible",
          }}
          itemWidth={150}
          inactiveSlideOpacity={0.8}
          onScrollIndexChanged={(index) => {
            setSelected(index);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          ref={tileRef}
        />
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
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    paddingLeft: 30,
  },
});

export default ToiletColorScreen;
