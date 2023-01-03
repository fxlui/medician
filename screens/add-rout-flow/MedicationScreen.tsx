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
import { useColorScheme } from "react-native";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { PressableBase } from "../../components/PressableBase";

import { Ionicons } from "@expo/vector-icons";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { AddFlowParamList, RootStackParamList } from "../../types";
import uniqueSymptoms from "../../assets/uniqueSymptoms.json";

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
  StackScreenProps<AddFlowParamList, "MedicationScreen">,
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
  const animatedOpacityQ5 = React.useRef(new Animated.Value(0.5)).current;

  const symptomArr = uniqueSymptoms;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [alertMinutesBefore, setAlertMinutesBefore] =
    React.useState<number>(-1);

  const [medTitle, setMedTitle] = React.useState(""); //medication title

  const [doseAmount, setDoseAmount] = React.useState(1);
  const [doseUnit, setDoseUnit] = React.useState("");
  const [dose, setDose] = React.useState("");

  React.useEffect(() => {
    if (!doseUnit) setDoseUnit("tablet");
    setDose(`${doseAmount} × ${doseUnit}`);
  }, [doseAmount, doseUnit]);

  const [selectedTop, setSelectedTop] = React.useState(0);
  const [selectedSymptom, setSelectedSymptom] = React.useState("");
  const [selectedSymptomType, setSelectedSymptomType] = React.useState("");
  const [extraNotes, setExtraNotes] = React.useState("");

  const inputRef = React.useRef<TextInput>(null);
  const topRef = React.createRef<Carousel<{ title: string; type: string }>>();

  const { addFlowStore, progressStore } = useStores();

  const getQuestion = (question: Number) => {
    switch (question) {
      case 0:
        return "What's the name of the medication?";
      case 1:
        return "What's the dose?";
      case 2:
        return "What is this for?";
      case 3:
        return "When do you want us to remind you?";
      case 4:
        return "Extra notes";
      default:
        return "";
    }
  };

  const nextQuestion = () => {
    inputRef.current?.clear();
    inputRef.current?.blur();
    setInputFocused(false);
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
        break;
      case 3:
        Animated.timing(animatedOpacityQ4, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(animatedOpacityQ5, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentQuestion(4);
        setCurrentText(extraNotes);
        break;
      case 4:
        setCurrentQuestion(5);
        break;
      default:
        break;
    }
  };

  const handleNavigation = () => {
    // used to be 4
    if (currentQuestion >= 3) {
      if (medTitle === "" || dose === "" || selectedSymptom === "") {
        Alert.alert(
          "Missing Information",
          `Please fill out the following:\n\n${
            medTitle === "" ? "Name of medication\n" : ""
          }${dose === "" ? "Dose of medication\n" : ""}${
            selectedSymptom === "" ? "Symptom\n" : ""
          }`
        );
        return;
      }
      if (alertMinutesBefore !== -1) {
        RegisterNotification();
        // const getStatus = async () => {
        //   const status = await allowsNotificationsAsync();
        //   if (!status) {
        //     Alert.alert(
        //       "Missing Permissions",
        //       "To receive notifications, please enable notifications in your settings."
        //     );
        //   }
        // };
        // getStatus();
      }
      progressStore.goForward();
      addFlowStore.currentNewRoutine.setRoutineDetails(
        medTitle.trim(),
        selectedSymptomType,
        alertMinutesBefore === null ? -1 : alertMinutesBefore,
        dose.trim()
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
          if (selectedTop === index) {
            handleNavigation();
          } else {
            topRef.current?.snapToItem(index);
          }
        }}
      />
    );
  };

  const getAlertTimeText = (minutes: Number) => {
    switch (minutes) {
      case -1:
        return `No notifications`;
      case 0:
        return `At the time of medication`;
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
          Please tell me more about your medication.
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
            {!inputFocused && medTitle !== "" ? (
              <Text style={styles.answer}>{medTitle}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {inputFocused && currentQuestion === 1 ? (
              <Text style={[styles.answer, { opacity: 0.9, fontSize: 16 }]}>
                You'll get to choose the frequency in the next screen.
              </Text>
            ) : null}
            {!inputFocused && dose !== "" ? (
              <Text style={styles.answer}>{dose}</Text>
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

          {/*<Animated.View style={[styles.qna, { opacity: animatedOpacityQ5 }]}>
            <Text style={styles.question}>{getQuestion(4)}</Text>
            {!inputFocused && extraNotes !== "" ? (
              <Text style={styles.answer}>{extraNotes}</Text>
            ) : null}
            </Animated.View>*/}
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
              elevation: currentQuestion === 2 ? 0 : 1,
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
            {currentQuestion === 1 ? (
              <View
                style={{
                  height: Platform.OS === "android" ? 80 : 210,
                  width: "100%",
                  borderRadius: 16,
                  flexDirection: "row",
                  backgroundColor: "transparent",
                }}
              >
                <Picker
                  selectedValue={doseAmount}
                  onValueChange={(itemValue, itemIndex) =>
                    setDoseAmount(itemValue)
                  }
                  itemStyle={{
                    color: textColor,
                  }}
                  style={{
                    flex: 1,
                    color: textColor,
                  }}
                  dropdownIconColor={textColor}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
                    <Picker.Item
                      key={item}
                      label={item.toString()}
                      value={item}
                    />
                  ))}
                </Picker>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text>×</Text>
                </View>
                <Picker
                  selectedValue={doseUnit}
                  onValueChange={(itemValue, itemIndex) =>
                    setDoseUnit(itemValue)
                  }
                  itemStyle={{
                    color: textColor,
                  }}
                  style={{
                    flex: 1,
                    color: textColor,
                  }}
                  dropdownIconColor={textColor}
                >
                  <Picker.Item label="Tablet" value="tablet" />
                  <Picker.Item label="Packet" value="packet" />
                  <Picker.Item label="Drop" value="drop" />
                  <Picker.Item label="10 mL" value="10 mL" />
                  <Picker.Item label="25 mL" value="25 mL" />
                  <Picker.Item label="50 mL" value="50 mL" />
                </Picker>
              </View>
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
                  itemWidth={160}
                  inactiveSlideOpacity={Platform.OS === "android" ? 1 : 0.8}
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
                  height: Platform.OS === "android" ? 25 : 150,
                  width: "100%",
                  marginBottom: Platform.OS === "android" ? 0 : 60,
                  padding: Platform.OS === "android" ? 30 : 0,
                  color: textColor,
                }}
                itemStyle={{
                  color: textColor,
                }}
                dropdownIconColor={textColor}
              >
                <Picker.Item label="No notifications" value={-1} />
                <Picker.Item label={`At time of medication`} value={0} />
                <Picker.Item label="5 minutes before" value={5} />
                <Picker.Item label="15 minutes before" value={15} />
                <Picker.Item label="1 hour before" value={60} />
                <Picker.Item label="1 day before" value={60 * 24} />
                <Picker.Item label="3 days before" value={60 * 24 * 3} />
              </Picker>
            ) : null}
            {currentQuestion === 4 || currentQuestion === 0 ? (
              <>
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
                    if (currentQuestion === 4) {
                      setExtraNotes(text);
                    } else if (currentQuestion === 0) {
                      setMedTitle(text);
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
                setCurrentText(medTitle);
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
              case 3:
                Animated.timing(animatedOpacityQ4, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }).start();
                Animated.timing(animatedOpacityQ5, {
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
