import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";

import { SafeAreaView, Edge} from "react-native-safe-area-context";

import useColorScheme from "../hooks/useColorScheme";
interface ViewChildrenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disableBottom?: boolean
}

const defaultEdges: Edge[] = ["bottom", 'left', 'right', 'top'];

const SafeView: React.FC<ViewChildrenProps> = ({ children, style, disableBottom }) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: colorScheme === "light" ? "#F9F9F9" : "#000",
    },
  });

  return (
    <SafeAreaView
      style={[styles.AndroidSafeArea, style]}
      edges={disableBottom ? ['left', 'right', 'top'] : defaultEdges}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
