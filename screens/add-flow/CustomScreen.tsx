import React from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Alert,
  useWindowDimensions,
  Platform,
} from "react-native";

import SafeView from "../../components/SafeView";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { PressableBase } from "../../components/PressableBase";
import { useStores } from "../../models/root-store-provider";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { getEditDescription } from "../../utils/ScreenUtils";
import { themeTextColor, themeTileColor } from "../../constants/Colors";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "CustomScreen">,
  StackScreenProps<RootStackParamList>
>;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CustomScreen = observer(({ navigation, route }: ScreenProps) => {
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const { addFlowStore, editFlowStore, progressStore } = useStores();

  const [inputFocused, setInputFocused] = React.useState(false);

  const defaultText =
    route.params.method === "add"
      ? ""
      : !editFlowStore.currentEditingRecord
      ? ""
      : editFlowStore.currentEditingRecord.description;
  const [currentText, setCurrentText] = React.useState(defaultText);

  const inputRef = React.useRef<TextInput>(null);

  const handleNavigation = () => {
    if (currentText === "") {
      Alert.alert("Please enter your symptoms.");
      return;
    }
    if (route.params.method === "add") {
      addFlowStore.currentNewRecord.setRecordDescription(currentText);
    } else {
      editFlowStore.currentEditingRecord?.updateRecordDescription(currentText);
    }
    progressStore.goForward();
    navigation.navigate("SeverityScreen", route.params);
  };

  return (
    <SafeView style={styles.container} disableTop>
      <View
        style={{
          paddingLeft: 30,
          flex: 1,
        }}
      >
        {route.params.method === "edit" ? (
          <Text style={{ opacity: 0.7 }}>
            Editing record for{" "}
            {getEditDescription(
              editFlowStore.currentSymptomType,
              editFlowStore.currentEditingRecord?.subArea
            )}
          </Text>
        ) : null}
        <Text
          style={[
            styles.greeting,
            {
              maxWidth: width - 100,
            },
          ]}
        >
          Please describe what you observe.
        </Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
          }}
        >
          <View style={styles.qna}>
            <Text style={styles.answer}>{currentText}</Text>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingRight: 30,
          }}
        >
          <View
            style={{
              backgroundColor: tileColor,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 9,
              elevation: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: inputFocused
                ? Platform.OS === "android"
                  ? -50
                  : 160
                : 95,
            }}
          >
            <AnimatedTextInput
              ref={inputRef}
              placeholder={"Type in your response here..."}
              placeholderTextColor="lightgrey"
              style={{
                padding: 20,
                flex: 8,
                fontSize: 16,
                marginTop: Platform.OS === "android" ? 0 : 20,
                maxHeight: 125,
                color: textColor,
              }}
              multiline={true}
              value={currentText}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChangeText={(text) => setCurrentText(text)}
            />
            <PressableBase
              extraProps={{
                style: {
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              onPress={handleNavigation}
            >
              <Ionicons name="ios-send" size={20} color={textColor} />
            </PressableBase>
          </View>
        </KeyboardAvoidingView>
      </View>
      <AddFlowNavBar
        preventRightDefault
        left={() => navigation.pop()}
        right={handleNavigation}
      ></AddFlowNavBar>
    </SafeView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 20,
  },
  question: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10,
  },
  answer: {
    fontSize: 18,
    marginBottom: 10,
  },
  qna: {
    marginBottom: 10,
  },
});

export default CustomScreen;
