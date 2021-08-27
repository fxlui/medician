import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import useColorScheme from "../hooks/useColorScheme";
interface ViewChildrenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SafeView: React.FC<ViewChildrenProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: colorScheme === "light" ? "#F9F9F9" : "#000",
    },
  });

  return (
    <SafeAreaView style={[styles.AndroidSafeArea, style]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
