import React, { FC } from "react";
import { Pressable, Animated } from "react-native";
import * as Haptics from "expo-haptics";

export const PressableBase: FC<{
  onPress?: () => void;
  extraProps?: any;
}> = ({ children, extraProps, onPress }) => {
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

  const handleOnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleOnPress}
      {...extraProps}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};
