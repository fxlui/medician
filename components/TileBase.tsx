import * as React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";

import { LinearGradient } from "expo-linear-gradient";
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export enum TileSize {
  Default = "default",
  Large = "large",
  XL = "XL",
  ActionAdd = "ActionAdd",
  Long = "long",
}

interface BaseChildren {
  children: React.ReactNode;
  size?: TileSize;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
  gradient?: Animated.WithAnimatedArray<string>;
  textBox?: boolean;
}

const TileBase: React.FC<BaseChildren> = ({
  children,
  size = TileSize.Default,
  onClick = () => {},
  style = {},
  gradient = ["white", "white"],
  textBox = false,
}) => {
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

  const handleOnClick = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClick();
  };

  return (
    <Pressable
      onPress={handleOnClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        handleOnClick();
      }}
    >
      <Animated.View style={styles.shadow}>
        <AnimatedLinearGradient
          colors={gradient}
          style={[
            styles.container,
            size == TileSize.Default && styles.default,
            size == TileSize.Large && styles.large,
            size == TileSize.Long && styles.long,
            size == TileSize.XL && styles.extraLong,
            size == TileSize.ActionAdd && styles.actionAdd,
            animatedStyle,
            style,
            textBox ? { padding: 0 } : {},
          ]}
        >
          {children}
        </AnimatedLinearGradient>
      </Animated.View>
    </Pressable>
  );
};
//#24AC29
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 18,
    overflow: "hidden",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 5,
  },
  default: {
    width: 150,
    height: 150,
  },
  large: {
    width: 302,
    height: 145,
  },
  long: {
    width: 242,
    height: 58,
  },
  extraLong: {
    width: 330,
    height: 140,
  },
  actionAdd: {
    width: 150,
    height: 150,
  },
});

export default TileBase;
