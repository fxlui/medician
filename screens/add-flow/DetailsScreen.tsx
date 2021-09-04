import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import SafeView from "../../components/SafeView";
import { AddFlowParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { PressableBase } from "../../components/PressableBase";
import { useStores } from "../../models/root-store-provider";
import { Ionicons } from "@expo/vector-icons";

type ScreenProps = StackScreenProps<AddFlowParamList, "DetailsScreen">;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const animatedOpacityQ1 = React.useRef(new Animated.Value(1)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ4 = React.useRef(new Animated.Value(0.5)).current;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [currentAnswers, setCurrentAnswers] = React.useState({
    better: "",
    worse: "",
    related: "",
    attempt: "",
  });

  const inputRef = React.useRef<TextInput>(null);
  const { addFlowStore } = useStores();

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
      case 3:
        setCurrentQuestion(4);
        break;
      default:
        break;
    }
  };

  return (
    <SafeView style={styles.container} disableTop>
      <View
        style={{
          paddingLeft: 30,
          flex: 1,
        }}
      >
        <Text style={styles.greeting}>Please describe what you observe.</Text>
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
              onPress={() => nextQuestion()}
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
                addFlowStore.goBack();
                navigation.pop();
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
            console.log("called")
            addFlowStore.goBack();
            navigation.pop();
          }
        }}
        right={() => {
          if (currentQuestion >= 3) {
            addFlowStore.setRecordDetails(
              currentAnswers.better,
              currentAnswers.worse,
              currentAnswers.related,
              currentAnswers.attempt
            );
            addFlowStore.goForward();
            navigation.navigate("MediaScreen");
          } else {
            nextQuestion();
          }
        }}
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
