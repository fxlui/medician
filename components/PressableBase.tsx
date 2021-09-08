import React, { FC } from "react";
import { Pressable, Animated, PressableProps } from "react-native";
import CustomHaptics from "../utils/CustomHaptics";

export const PressableBase: FC<{
  onPress?: () => void;
  extraProps?: PressableProps;
  tabBar?: boolean;
}> = ({ children, extraProps, onPress, tabBar = false }) => {
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
    if (tabBar) CustomHaptics("light");
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
    CustomHaptics("light");
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
