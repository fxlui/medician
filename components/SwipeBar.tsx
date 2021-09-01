import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

interface SwipeBarProps {
  onPress: () => void;
}

export default class AppleStyleSwipeableRow extends Component<SwipeBarProps> {
  // private renderLeftActions = (
  //   _progress: Animated.AnimatedInterpolation,
  //   dragX: Animated.AnimatedInterpolation
  // ) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //     extrapolate: "clamp",
  //   });
  //   return (
  //     <RectButton style={styles.leftAction} onPress={this.close}>
  //       <Animated.Text
  //         style={[
  //           styles.actionText,
  //           {
  //             transform: [{ translateX: trans }],
  //           },
  //         ]}
  //       >
  //         Archive
  //       </Animated.Text>
  //     </RectButton>
  //   );
  // };

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[
            styles.rightAction,
            { backgroundColor: color, paddingRight: 15 },
          ]}
          onPress={pressHandler}
        >
          <MaterialIcons name="delete" size={24} color="#dd2c00" />
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => (
    <View
      style={{
        width: 80,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {this.renderRightAction("More", "transparent", 0, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.props.onPress();
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        containerStyle={{
          marginTop: 30,
          overflow: "visible",
        }}
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 16,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    backgroundColor: "transparent",
    borderRadius: 16,
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
  },
});
