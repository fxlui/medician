import React from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Alert,
  useWindowDimensions,
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
import uniqueSymptomsForExercise from "../../assets/uniqueSymptomsForExercise.json";

import OverviewSymptomTile from "../../components/OverviewSymptomTile";
import Carousel from "react-native-snap-carousel";
import { Picker } from "@react-native-picker/picker";
import { useStores } from "../../models/root-store-provider";
import CustomHaptics from "../../utils/CustomHaptics";
import { themeTextColor, themeTileColor } from "../../constants/Colors";

import RegisterNotification from "../../utils/RegisterNotification";
import * as Notifications from "expo-notifications";
import { allowsNotificationsAsync } from "../../utils/CheckPermission";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "ExerciseScreen">,
  StackScreenProps<RootStackParamList>
>;
interface topBaseData {
  index: number;
  dataIndex: number;
  item: {
    title: string;
    type: string;
  };
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function RoutineDetailsScreen({
  navigation,
  route,
}: ScreenProps) {
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  const animatedOpacityQ1 = React.useRef(new Animated.Value(1)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ4 = React.useRef(new Animated.Value(0.5)).current;

  const symptomArr = uniqueSymptomsForExercise;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const [alertMinutesBefore, setAlertMinutesBefore] =
    React.useState<number>(-1);

  const [exerciseName, setExerciseName] = React.useState("");
  const [extraNotes, setExtraNotes] = React.useState("");

  const [selectedTop, setSelectedTop] = React.useState(0);
  const [selectedSymptom, setSelectedSymptom] = React.useState("");
  const [selectedSymptomType, setSelectedSymptomType] = React.useState("pain");

  const inputRef = React.useRef<TextInput>(null);
  const topRef = React.createRef<Carousel<{ title: string; type: string }>>();

  const { addFlowStore, progressStore } = useStores();

  const getQuestion = (question: number) => {
    switch (question) {
      case 0:
        return "What is the exercise?";
      case 1:
        return "Extra Notes";
      case 2:
        return "What is this for?";
      case 3:
        return "When do you want us to remind you?";
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
        setCurrentText(extraNotes);
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
        setInputFocused(false);
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
        setInputFocused(false);
        setCurrentQuestion(3);
        break;
      default:
        break;
    }
  };

  const handleNavigation = () => {
    if (currentQuestion >= 3) {
      if (exerciseName === "") {
        Alert.alert(
          "Missing Information",
          `Please fill out the following:\n\n${
            exerciseName === "" ? "Name of exercise\n" : ""
          }`
        );
        return;
      }
      if (alertMinutesBefore !== -1) {
        RegisterNotification();
        const getStatus = async () => {
          const status = await allowsNotificationsAsync();
          if (!status) {
            Alert.alert(
              "Missing Permissions",
              "To receive notifications, please enable notifications in your settings."
            );
          }
        };
        getStatus();
      }
      progressStore.goForward();
      addFlowStore.currentNewRoutine.setRoutineDetails(
        exerciseName.trim(),
        selectedSymptomType,
        alertMinutesBefore === null ? -1 : alertMinutesBefore,
        extraNotes.trim()
      );
      navigation.navigate("RoutineTimeScreen");
    } else {
      nextQuestion();
    }
  };

  const renderTopTile = ({ item, index }: topBaseData) => {
    return (
      <OverviewSymptomTile
        title={item.title}
        index={index}
        style={{
          marginLeft: 5,
        }}
        iconName={item.type}
        selected={selectedTop === index}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const getAlertTimeText = (minutes: Number) => {
    switch (minutes) {
      case -1:
        return `No notifications`;
      case 0:
        return `At the time of exercise`;
      case 5:
        return "5 minutes before";
      case 15:
        return "15 minutes before";
      case 60:
        return "1 hour before";
      case 60 * 24:
        return "1 day before";
      case 60 * 24 * 3:
        return "3 days before";
      default:
        return "";
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
        <Text
          style={[
            styles.greeting,
            {
              maxWidth: width - 120,
            },
          ]}
        >
          Please tell me more about your exercise.
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
            {inputFocused && currentQuestion === 0 ? (
              <Text style={[styles.answer, { opacity: 0.9, fontSize: 16 }]}>
                e.g. Walk, Running, Swimming...
              </Text>
            ) : null}
            {!inputFocused && exerciseName !== "" ? (
              <Text style={styles.answer}>{exerciseName}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {inputFocused && currentQuestion === 1 ? (
              <View>
                <Text style={[styles.answer, { opacity: 0.9, fontSize: 16 }]}>
                  e.g. 1 km, 10 km, 30 minutes...
                </Text>
                <Text style={[styles.answer, { opacity: 0.9, fontSize: 16 }]}>
                  You'll get to choose the frequency in the next screen.
                </Text>
              </View>
            ) : null}
            {!inputFocused && extraNotes !== "" ? (
              <Text style={styles.answer}>{extraNotes}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>{getQuestion(2)}</Text>
            {!inputFocused && selectedSymptom !== "" ? (
              <Text style={styles.answer}>{selectedSymptom}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ4 }]}>
            <Text style={styles.question}>{getQuestion(3)}</Text>
            {!inputFocused && alertMinutesBefore !== null ? (
              <Text style={styles.answer}>
                {getAlertTimeText(alertMinutesBefore)}
              </Text>
            ) : null}
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
              backgroundColor:
                currentQuestion === 2 ? "transparent" : tileColor,
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
            {currentQuestion === 1 || currentQuestion === 0 ? (
              <>
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
                    if (currentQuestion === 1) {
                      setExtraNotes(text);
                    } else if (currentQuestion === 0) {
                      setExerciseName(text);
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
              </>
            ) : null}
            {currentQuestion === 2 ? (
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: -20,
                }}
              >
                <Carousel
                  data={symptomArr}
                  renderItem={renderTopTile}
                  vertical={false}
                  sliderWidth={width}
                  containerCustomStyle={{
                    overflow: "visible",
                  }}
                  contentContainerCustomStyle={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    overflow: "visible",
                  }}
                  itemWidth={160}
                  inactiveSlideOpacity={0.8}
                  onLayout={() => {
                    topRef.current?.snapToItem(selectedTop, false, false);
                    setSelectedSymptom(symptomArr[selectedTop].title);
                    setSelectedSymptomType(symptomArr[selectedTop].type);
                  }}
                  onScrollIndexChanged={(index) => {
                    setSelectedTop(index);
                    setSelectedSymptom(symptomArr[index].title);
                    setSelectedSymptomType(symptomArr[index].type);
                    CustomHaptics("light");
                  }}
                  ref={topRef}
                />
              </View>
            ) : null}
            {currentQuestion === 3 ? (
              <Picker
                selectedValue={alertMinutesBefore}
                onValueChange={(itemValue, itemIndex) =>
                  setAlertMinutesBefore(itemValue)
                }
                style={{
                  height: 150,
                  width: "100%",
                  marginBottom: 60,
                }}
                itemStyle={{
                  color: textColor,
                }}
              >
                <Picker.Item label="No notifications" value={-1} />
                <Picker.Item label={`At time of exercise`} value={0} />
                <Picker.Item label="5 minutes before" value={5} />
                <Picker.Item label="15 minutes before" value={15} />
                <Picker.Item label="1 hour before" value={60} />
                <Picker.Item label="1 day before" value={60 * 24} />
                <Picker.Item label="3 days before" value={60 * 24 * 3} />
              </Picker>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </View>
      <AddFlowNavBar
        preventLeftDefault
        preventRightDefault
        left={() => {
          if (
            (currentQuestion === 0 && currentText !== "") ||
            currentQuestion > 0
          ) {
            const qNow = currentQuestion - 1;
            setCurrentQuestion(currentQuestion - 1);
            switch (qNow) {
              case -1:
                progressStore.goBack();
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
                setCurrentText(exerciseName);
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
                break;
              default:
                break;
            }
          } else {
            progressStore.goBack();
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
