import React, { FC } from "react";
import { Pressable, Animated, PressableProps } from "react-native";

export const PressableBase: FC<{
  onPress?: () => void;
  extraProps?: PressableProps;
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

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...extraProps}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};
