import { useNavigation } from "@react-navigation/native";
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
import { Text, View } from "../../components/Themed";
import SafeView from "../../components/SafeView";
import AreaTile from "../../components/AreaTile";
import Carousel from "react-native-snap-carousel";
import * as Haptics from "expo-haptics";

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

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);

  const renderTile = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    // const handleTilePress = ( ) => {
    //   navigation.navigate('Notification', {item});
    //   console.log(item.id)
    // };

    return (
      <AreaTile
        title={item.title}
        // backgroundColor={{ backgroundColor }}
        // textColor={{ color }}
        style={{
          marginRight: 15,
        }}
        index={index}
        selected={selected === index}
      />
    );
  };

  return (
    <SafeView style={styles.container}>
      <View
        style={{
          overflow: "visible",
        }}
      >
        <Text style={styles.greeting}>Where is the area affected?</Text>
        <View style={styles.child}>
          <View style={{}}>
            <Carousel
              data={DATA}
              renderItem={renderTile}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              containerCustomStyle={{
                overflow: "visible",
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                alignItems: "flex-end",
                overflow: "visible",
                marginBottom: 60,
              }}
              itemWidth={150}
              inactiveSlideOpacity={0.8}
              onScrollIndexChanged={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onSnapToItem={(index) => {
                setSelected(index);
              }}
            />
            <Carousel
              data={DATA}
              renderItem={renderTile}
              vertical={false}
              sliderWidth={Dimensions.get("window").width}
              containerCustomStyle={{
                overflow: "visible",
              }}
              contentContainerCustomStyle={{
                justifyContent: "center",
                alignItems: "flex-start",
                overflow: "visible",
              }}
              itemWidth={150}
              inactiveSlideOpacity={0.8}
              onScrollIndexChanged={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
            <Text>hihihihi</Text>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    flex: 1,
  },
  child: {
    flex: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    flex: 1,
    borderWidth: 1,
    fontSize: 26,
    fontWeight: "600",
    marginTop: 65,
    paddingLeft: 30,
  },
  list: {
    margin: 0,
    padding: 0,
    overflow: "visible",
  },
});

export default App;
