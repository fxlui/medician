import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';

export const CustomizedTabBar = () => {
  return(
    <View>
      <Text>
        hello
      </Text>
    </View>
  );
}

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    bottom: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
});