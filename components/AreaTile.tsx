import * as React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";

import useColorScheme from "../hooks/useColorScheme";

import TileBase, { TileSize } from "./TileBase";
import Carousel from "react-native-snap-carousel";
interface TileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  selected: boolean;
  updater: () => void;
}

export const TopTile: React.FC<TileDetails> = ({
  title,
  style,
  size,
  selected,
  index,
  updater,
}) => {
  const colorScheme = useColorScheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const animatedTileColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [tileColor, "#FF7272"],
  });
  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [textColor, "#fff"],
  });

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  return (
    <TileBase
      style={style}
      size={size}
      gradient={[tileColor, tileColor]}
      onClick={updater}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={{ fontSize: 40 }}>🤯</Text>
          <View style={styles.textContent}>
            <Animated.Text style={{ color: animatedTextColor, fontSize: 16 }}>
              {title}
            </Animated.Text>
          </View>
        </View>
      </View>
      <Animated.View
        style={{
          backgroundColor: animatedTileColor,
          flex: 1,
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: -50,
        }}
      />
    </TileBase>
  );
};

export const BottomTile: React.FC<TileDetails> = ({
  title,
  style,
  size,
  selected,
  index,
  updater,
}) => {
  const colorScheme = useColorScheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const animatedTileColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [tileColor, "#FF7272"],
  });

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  return (
    <TileBase
      style={style}
      size={size}
      gradient={[tileColor, tileColor]}
      onClick={updater}
    >
      <View style={styles.content}>
        <View style={styles.leftBottom}>
          <View style={styles.textContent}>
            <Animated.Text style={{ color: textColor, fontSize: 16 }}>
              {title}
            </Animated.Text>
          </View>
        </View>
      </View>
      <Animated.View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: -50,
          borderWidth: 2,
          borderRadius: 16,
          borderColor: animatedTileColor,
        }}
      />
    </TileBase>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "transparent",
    flexDirection: "row",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textContent: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  left: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  leftBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  right: {
    backgroundColor: "transparent",
  },
});