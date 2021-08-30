import React from "react";
import { StyleSheet, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";

import SafeView from "../../components/SafeView";
import { AddFlowParamList, ProgressFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<ProgressFlowParamList, "TimeSelectScreen">,
  StackScreenProps<AddFlowParamList>
>;

export default function TimeSelectScreen({ navigation } : ScreenProps) {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>TimeSelect Screen</Text>
        <Button
          title="Go to next screen"
          onPress={() => navigation.navigate("ActionScreen")}
        />
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