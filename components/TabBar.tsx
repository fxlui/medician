import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import {
  Pressable,
  Animated,
} from 'react-native';


export const TabBarButton = (props: BottomTabBarButtonProps) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.8,
      friction: 20,
      tension: 50,
      useNativeDriver: true,
    }).start();
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
    <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
      <Animated.View style={animatedStyle}>
        {props.children}
      </Animated.View>
    </Pressable>
  );
}