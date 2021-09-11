import * as React from "react";
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Text, View } from "./Themed";

import useColorScheme from "../hooks/useColorScheme";

import TileBase, { TileSize } from "./TileBase";
import { themeTextColor, themeTileColor } from "../constants/Colors";

interface TileDetails {
  title: string;
  style?: StyleProp<ViewStyle>;
  size?: TileSize;
  index?: number;
  selected: boolean;
  updater: () => void;
}
interface topTileDetails extends TileDetails {
  emoji: string;
  colorTile?: boolean;
}

export const TopTile: React.FC<topTileDetails> = ({
  title,
  style,
  size,
  selected,
  index,
  updater,
  emoji,
  colorTile = false,
}) => {
  const colorScheme = useColorScheme();
  const animatedValue = React.useRef(new Animated.Value(0.0)).current;

  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  const highlightTileColor = "#FF7272";
  const highlightTextColor = "#fff";

  const animatedTileColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [tileColor, highlightTileColor],
  });
  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [textColor, highlightTextColor],
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
          <Text style={{ fontSize: 40 }}>{emoji}</Text>
          <View style={styles.textContent}>
            <Animated.Text
              style={{
                color: colorTile ? textColor : animatedTextColor,
                fontSize: 16,
              }}
            >
              {title}
            </Animated.Text>
          </View>
        </View>
      </View>
      {colorTile ? (
        <Animated.View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            position: "absolute",
            width: 155,
            height: 155,
            borderWidth: 2,
            borderRadius: 16,
            borderColor: animatedTileColor,
            zIndex: 20,
          }}
        />
      ) : (
        <Animated.View
          style={{
            backgroundColor: animatedTileColor,
            flex: 1,
            position: "absolute",
            width: 155,
            height: 155,
            zIndex: 20,
          }}
        />
      )}
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

  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const highlightTileColor = "#FF7272";
  const animatedTileColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [tileColor, highlightTileColor],
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
          width: 155,
          height: 155,
          borderWidth: 2,
          borderRadius: 16,
          borderColor: animatedTileColor,
          zIndex: 20,
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
    zIndex: 50,
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
