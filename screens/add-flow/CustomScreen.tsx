import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Alert,
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

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "CustomScreen">,
  StackScreenProps<RootStackParamList>
>;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function CustomScreen({ navigation, route }: ScreenProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const [inputFocused, setInputFocused] = React.useState(false);

  const defaultText = route.params.method === "add" ? "" : "MOBX HERE"; //TODO: get from store
  const [currentText, setCurrentText] = React.useState(defaultText);

  const inputRef = React.useRef<TextInput>(null);
  const { addFlowStore } = useStores();

  const handleNavigation = () => {
    if (currentText === "") {
      Alert.alert("Please enter your symptoms.");
      return;
    }
    if (route.params.method === "add") {
      addFlowStore.currentNewRecord.setRecordDescription(currentText);
    } else {
      // TODO handle edit
    }
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
            Editing record for MOBX_PAIN at MOBX_AREA
          </Text>
        ) : null}
        <Text style={styles.greeting}>Please describe what you observe.</Text>
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
              elevation: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: inputFocused ? 160 : 85,
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
                marginTop: 20,
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
        left={() => navigation.pop()}
        right={handleNavigation}
      ></AddFlowNavBar>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 15,
    maxWidth: Dimensions.get("window").width - 100,
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
