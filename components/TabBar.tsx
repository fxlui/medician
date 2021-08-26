import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import * as Haptics from "expo-haptics";


export const TabBarButton = (props: BottomTabBarButtonProps) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.88,
      friction: 20,
      tension: 50,
      useNativeDriver: true,
    }).start(({ finished }) => {
      //
    });
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 10,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return(
    // <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      />
    // </Animated.View>
  );
}