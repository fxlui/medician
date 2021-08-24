import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import Tile from "../components/Tile";

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
];

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const navigation = useNavigation();

  const renderTile = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    // const handleTilePress = ( ) => {
    //   navigation.navigate('Notification', {item});
    //   console.log(item.id)
    // };

    return (
      <Tile
        title={item.title}
        // backgroundColor={{ backgroundColor }}
        // textColor={{ color }}
        style={{
          marginRight: 20,
        }}
      />
    );
  };

  return (
    <SafeView style={styles.container}>
      <ScrollView style={styles.child}>
        <Text style={styles.greeting}>Good evening 🌥,{"\n"}Ririmes</Text>

        <Text style={styles.title}>Medication</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.title}>Exercise</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.title}>Appointment</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  child: {
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

export default App;
