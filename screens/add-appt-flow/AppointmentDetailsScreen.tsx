import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from "react-native";

import SafeView from "../../components/SafeView";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { PressableBase } from "../../components/PressableBase";

import { Ionicons } from "@expo/vector-icons";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { AddFlowParamList, RootStackParamList } from "../../types";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "AppointmentDetailsScreen">,
  StackScreenProps<RootStackParamList>
>;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AppointmentDetailsScreen({ navigation }: ScreenProps) {
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
    doctor: "",
    area: "",
  });
  const [alertSecondsBefore, setAlertSecondsBefore] =
    React.useState<Number | null>(null);

  const inputRef = React.useRef<TextInput>(null);

  const getQuestion = (question: Number) => {
    switch (question) {
      case 0:
        return "Who are you seeing?";
      case 1:
        return "What is this for?";
      case 2:
        return "When do you want us to remind you?";
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
        setCurrentText(currentAnswers.area);
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
        setCurrentText(alertSecondsBefore ? alertSecondsBefore.toString() : "");
        break;
      case 2:
        setCurrentQuestion(3);
        break;
      default:
        break;
    }
  };

  const handleNavigation = () => {
    if (currentQuestion >= 3) {
      navigation.navigate("MediaScreen");
    } else {
      nextQuestion();
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
        <Text style={styles.greeting}>
          Please tell me more about your appointment.
        </Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
          }}
        >
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ1 }]}>
            <Text style={styles.question}>{getQuestion(0)}</Text>
            {!inputFocused && currentAnswers.doctor !== "" && (
              <Text style={styles.answer}>{currentAnswers.doctor}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {!inputFocused && currentAnswers.area !== "" && (
              <Text style={styles.answer}>{currentAnswers.area}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>{getQuestion(2)}</Text>
            {!inputFocused && alertSecondsBefore && (
              <Text style={styles.answer}>{alertSecondsBefore}</Text>
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
                      doctor: text,
                    });
                    break;
                  case 1:
                    setCurrentAnswers({
                      ...currentAnswers,
                      area: text,
                    });
                    break;
                  case 2:
                    setAlertSecondsBefore(alertSecondsBefore); // TODO change
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
        left={() => {
          if (
            (currentQuestion === 0 && currentAnswers.doctor !== "") ||
            currentQuestion > 0
          ) {
            const qNow = currentQuestion - 1;
            setCurrentQuestion(currentQuestion - 1);
            switch (qNow) {
              case -1:
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
                setCurrentText(currentAnswers.doctor);
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
                setCurrentText(currentAnswers.area);
                break;
              case 2:
                Animated.timing(animatedOpacityQ3, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                break;
              default:
                break;
            }
          } else {
            navigation.pop();
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
    maxWidth: Dimensions.get("window").width - 120,
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
