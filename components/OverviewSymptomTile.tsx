import * as React from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Text, View } from "./Themed";

import useColorScheme from "../hooks/useColorScheme";

import TileBase, { TileSize } from "./TileBase";
import Icon from "./Icon";

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
        <Icon
          name={iconName}
          props={{
            width: 42,
            height: 42,
            fill: selected ? "#fff" : textColor,
          }}
        />
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
          width: 150,
          height: 150,
          zIndex: -50,
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
  },
});
