import React from "react";
import moment from "moment";
import {
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  KeyboardEvent,
  Animated,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";

import SafeView from "../../components/SafeView";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import ProgressBar from "./ProgressBar";
import AddFlowNavBar from "../../components/AddFlowNavBar";
import { PressableBase } from "../../components/PressableBase";

import TileBase from "../../components/TileBase";
import { Ionicons } from "@expo/vector-icons";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "DetailsScreen">,
  StackScreenProps<RootStackParamList>
>;

const useKeyboard = () => {
  // https://stackoverflow.com/questions/46587006/how-to-get-a-height-of-a-keyboard-in-react-native
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);

  return keyboardHeight;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const keyboardHeight = useKeyboard();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const animatedValue = React.useRef(new Animated.Value(20)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0)).current;
  const animatedOpacityQ4 = React.useRef(new Animated.Value(0)).current;

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [currentAnswers, setCurrentAnswers] = React.useState({
    better: "",
    worse: "",
    related: "",
    attempt: "",
  });

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: keyboardHeight === 0 ? 20 : keyboardHeight - 50,
      friction: 20,
      tension: 50,
      useNativeDriver: false,
    }).start();
  }, [keyboardHeight]);

  const inputRef = React.useRef<TextInput>(null);

  return (
    <SafeView style={styles.container} disableTop>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            paddingLeft: 30,
          }}
        >
          <Text style={styles.greeting}>Please describe what you observe.</Text>
          <Animated.View style={[styles.qna]}>
            <Text style={styles.question}>What makes it better?</Text>
            <Text style={styles.answer}>{currentAnswers.better}</Text>
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>What makes it worse?</Text>
            <Text style={styles.answer}>{currentAnswers.worse}</Text>
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>
              What do you think its related to?
            </Text>
            <Text style={styles.answer}>{currentAnswers.related}</Text>
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ4 }]}>
            <Text style={styles.question}>Have you tried anything?</Text>
            <Text style={styles.answer}>{currentAnswers.attempt}</Text>
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => navigation.navigate("AreaSelectScreen")}
      >
        <Animated.View
          style={{
            backgroundColor: tileColor,
            width: Dimensions.get("window").width - 50,
            height: 100,
            borderRadius: 16,
            marginBottom: animatedValue,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <AnimatedTextInput
            ref={inputRef}
            placeholder="Enter Name here"
            style={{
              padding: 20,
              flex: 8,
            }}
            onChangeText={(text) => {
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
            onPress={() => {
              switch (currentQuestion) {
                case 0:
                  Animated.timing(animatedOpacityQ2, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                  }).start();
                  setCurrentQuestion(1);
                  break;
                case 1:
                  Animated.timing(animatedOpacityQ3, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                  }).start();
                  setCurrentQuestion(2);
                  break;
                case 2:
                  Animated.timing(animatedOpacityQ4, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                  }).start();
                  setCurrentQuestion(3);
                  break;
                case 3:
                  break;
                default:
                  break;
              }
              Keyboard.dismiss();
              inputRef.current?.clear();
            }}
          >
            <Ionicons name="ios-send" size={20} color="black" />
          </PressableBase>
        </Animated.View>
      </AddFlowNavBar>
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
    opacity: 0.85,
  },
  qna: {
    marginBottom: 20,
  },
});
