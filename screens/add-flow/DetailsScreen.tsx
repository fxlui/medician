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

import { StackScreenProps } from "@react-navigation/stack";
import SafeView from "../../components/SafeView";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import { useColorScheme } from "react-native";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { PressableBase } from "../../components/PressableBase";
import { useStores } from "../../models/root-store-provider";
import { Ionicons } from "@expo/vector-icons";
import { getEditDescription } from "../../utils/ScreenUtils";
import { themeTextColor, themeTileColor } from "../../constants/Colors";

type ScreenProps = StackScreenProps<AddFlowParamList, "DetailsScreen">;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function TimeSelectScreen({ navigation, route }: ScreenProps) {
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const { addFlowStore, progressStore, editFlowStore } = useStores();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const animatedOpacityQ1 = React.useRef(new Animated.Value(1)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ4 = React.useRef(new Animated.Value(0.5)).current;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const emptyTexts = {
    better: "",
    worse: "",
    related: "",
    attempt: "",
  };
  const defaultTexts =
    route.params.method === "add"
      ? emptyTexts
      : editFlowStore.currentEditingRecord
      ? editFlowStore.currentEditingRecord.getDetails()
      : emptyTexts;

  const [currentAnswers, setCurrentAnswers] = React.useState(defaultTexts);
  const [currentText, setCurrentText] = React.useState(defaultTexts.better);

  const inputRef = React.useRef<TextInput>(null);

  const getQuestion = (question: Number) => {
    switch (question) {
      case 0:
        return "What makes it better?";
      case 1:
        return "What makes it worse?";
      case 2:
        return "What do you think its related to?";
      case 3:
        return "Have you tried anything?";
      default:
        return "";
    }
  };

  const nextQuestion = () => {
    inputRef.current?.clear();
    //inputRef.current?.blur();
    //setInputFocused(false);
    switch (currentQuestion) {
      case 0:
        Animated.timing(animatedOpacityQ1, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(animatedOpacityQ2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentQuestion(1);
        setCurrentText(currentAnswers.worse);
        break;
      case 1:
        Animated.timing(animatedOpacityQ2, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(animatedOpacityQ3, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentQuestion(2);
        setCurrentText(currentAnswers.related);
        break;
      case 2:
        Animated.timing(animatedOpacityQ3, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(animatedOpacityQ4, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentQuestion(3);
        setCurrentText(currentAnswers.attempt);
        break;
      default:
        break;
    }
  };

  const handleNavigation = () => {
    if (currentQuestion >= 3) {
      if (inputFocused) {
        inputRef.current?.blur();
        setInputFocused(false);
        return;
      }
      if (route.params.method === "add") {
        addFlowStore.currentNewRecord.setRecordDetails(
          currentAnswers.better.trim(),
          currentAnswers.worse.trim(),
          currentAnswers.related.trim(),
          currentAnswers.attempt.trim()
        );
      } else {
        editFlowStore.currentEditingRecord?.updateDetails(
          currentAnswers.better.trim(),
          currentAnswers.worse.trim(),
          currentAnswers.related.trim(),
          currentAnswers.attempt.trim()
        );
      }
      progressStore.goForward();
      navigation.navigate("MediaScreen", route.params);
    } else {
      nextQuestion();
    }
  };

  const HandleBackNavigation = () => {
    if (
      currentAnswers.better !== "" ||
      currentAnswers.worse !== "" ||
      currentAnswers.related !== "" ||
      currentAnswers.attempt !== ""
    ) {
      Alert.alert(
        "Are you sure?",
        "You have unsaved changes. Are you sure you want to go back?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              progressStore.goBack();
              navigation.pop();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      progressStore.goBack();
      navigation.pop();
    }
  };

  return (
    <SafeView style={styles.container} disableTop>
      <View
        style={{
          paddingTop: 30,
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
          }}
        >
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ1 }]}>
            <Text style={styles.question}>{getQuestion(0)}</Text>
            {!inputFocused && currentAnswers.better !== "" && (
              <Text style={styles.answer}>{currentAnswers.better}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {!inputFocused && currentAnswers.worse !== "" && (
              <Text style={styles.answer}>{currentAnswers.worse}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>{getQuestion(2)}</Text>
            {!inputFocused && currentAnswers.related !== "" && (
              <Text style={styles.answer}>{currentAnswers.related}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ4 }]}>
            <Text style={styles.question}>{getQuestion(3)}</Text>
            {!inputFocused && currentAnswers.attempt !== "" && (
              <Text style={styles.answer}>{currentAnswers.attempt}</Text>
            )}
          </Animated.View>
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
              onChangeText={(text) => {
                setCurrentText(text);
                switch (currentQuestion) {
                  case 0:
                    setCurrentAnswers({
                      ...currentAnswers,
                      better: text,
                    });
                    break;
                  case 1:
                    setCurrentAnswers({
                      ...currentAnswers,
                      worse: text,
                    });
                    break;
                  case 2:
                    setCurrentAnswers({
                      ...currentAnswers,
                      related: text,
                    });
                    break;
                  case 3:
                    setCurrentAnswers({
                      ...currentAnswers,
                      attempt: text,
                    });
                    break;
                  default:
                    break;
                }
              }}
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
        preventLeftDefault
        preventRightDefault
        left={() => {
          if (
            (currentQuestion === 0 && currentAnswers.better !== "") ||
            currentQuestion > 0
          ) {
            const qNow = currentQuestion - 1;
            setCurrentQuestion(currentQuestion - 1);
            switch (qNow) {
              case -1:
                HandleBackNavigation();
                break;
              case 0:
                Animated.timing(animatedOpacityQ1, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                Animated.timing(animatedOpacityQ2, {
                  toValue: 0.5,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                setCurrentText(currentAnswers.better);
                break;
              case 1:
                Animated.timing(animatedOpacityQ2, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                Animated.timing(animatedOpacityQ3, {
                  toValue: 0.5,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                setCurrentText(currentAnswers.worse);
                break;
              case 2:
                Animated.timing(animatedOpacityQ3, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                Animated.timing(animatedOpacityQ4, {
                  toValue: 0.5,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                setCurrentText(currentAnswers.related);
                break;
              case 3:
                setCurrentText(currentAnswers.attempt);
                break;
              default:
                break;
            }
          } else {
            HandleBackNavigation();
          }
        }}
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
    marginBottom: 20,
  },
  question: {
    fontWeight: Platform.OS === "android" ? "700" : "500",
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
