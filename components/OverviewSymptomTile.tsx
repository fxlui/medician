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
import Icon from "./Icon";
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
  index?: number;
  iconName: string;
}

const OverviewSymptomTile: React.FC<topTileDetails> = ({
  title,
  style,
  size,
  selected,
  index,
  updater,
  iconName,
}) => {
  const colorScheme = useColorScheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
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
        {Platform.OS === "android" ? (
          <Icon
            name={iconName}
            props={{
              width: 42,
              height: 42,
              fill: selected ? "#fff" : textColor,
            }}
          />
        ) : (
          <Icon
            name={iconName}
            props={{
              width: 42,
              height: 42,
              animatedValue: animatedTextColor,
            }}
          />
        )}

        <Animated.Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: animatedTextColor,
          }}
        >
          {title}
        </Animated.Text>
      </View>
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
    </TileBase>
  );
};

export default OverviewSymptomTile;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    zIndex: 50,
  },
});
