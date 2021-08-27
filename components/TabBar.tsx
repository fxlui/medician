import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import {
  Pressable,
  Animated,
  StyleSheet
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

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    bottom: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingBottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
