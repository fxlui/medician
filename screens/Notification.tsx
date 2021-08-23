import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ScrollView, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";


const Notification = ( navigation: ReturnType<typeof useNavigation>, item: any) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.child}>
          <Text 
            style={styles.greeting}
          >
            Notification
          </Text>
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 24,
    fontWeight: '600',
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  list: {
    margin: 0,
    padding: 0,
  },
});

export default Notification;