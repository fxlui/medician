import React from "react";
import { StyleSheet, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import SafeView from "../../components/SafeView";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";

type ScreenProps = StackScreenProps<AddFlowParamList, "TimeSelectScreen">

export default function TimeSelectScreen({ navigation } : ScreenProps) {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>TimeSelect Screen</Text>
        <Button
          title="Go to previous screen"
          onPress={() => navigation.pop()}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
  }
});