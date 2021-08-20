import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
    {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Fourth Item",
  },
    {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Fifth Item",
  },
];

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//   </TouchableOpacity>
// );

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Tile
        title={item.title}
        onPress={() => console.log("pressed on" + item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Good evening  🌥,{"\n"}Ririmes</Text>
      <Text>Medication</Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;