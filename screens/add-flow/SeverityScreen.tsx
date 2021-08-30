import React from "react";
import { StyleSheet, Button, TextInput, Share } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import SafeView from "../../components/SafeView";
import { ProgressFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";

type ScreenProps = StackScreenProps<ProgressFlowParamList, "SeverityScreen">

export default function SeverityScreen({ navigation, route } : ScreenProps) {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <TextInput style={styles.textInput} />
        <Button
          title="Go to next screen"
          onPress={() => navigation.navigate("TimeSelectScreen")}
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
  },
  textInput: {
    width: 300,
    borderWidth: 2,
    borderColor: "#000"
  }
});
