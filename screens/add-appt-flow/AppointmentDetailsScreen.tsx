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
import Toast from "react-native-root-toast";
import TickToast from "../../components/TickToast";

import RegisterNotification from "../../utils/RegisterNotification";
import * as Notifications from "expo-notifications";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "AppointmentDetailsScreen">,
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

export default function AppointmentDetailsScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const { addFlowStore, user } = useStores();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const animatedOpacityQ1 = React.useRef(new Animated.Value(1)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ4 = React.useRef(new Animated.Value(0.5)).current;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const [currentDoctor, setCurrentDoctor] = React.useState("");
  const [alertMinutesBefore, setAlertMinutesBefore] =
    React.useState<number>(-1);

  const [selectedTop, setSelectedTop] = React.useState(0);
  const [selectedSymptom, setSelectedSymptom] = React.useState("");
  const [selectedSymptomType, setSelectedSymptomType] = React.useState("pain");

  const [extraNotes, setExtraNotes] = React.useState("");

  const inputRef = React.useRef<TextInput>(null);
  const topRef = React.createRef<Carousel<{ title: string; type: string }>>();

  const getQuestion = (question: Number) => {
    switch (question) {
      case 0:
        return "Who are you seeing?";
      case 1:
        return "What is this for?";
      case 2:
        return "When do you want us to remind you?";
      case 3:
        return "Extra Notes";
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
        setCurrentText(extraNotes);
        setCurrentQuestion(3);
        break;
      default:
        break;
    }
  };

  const handleNavigation = async () => {
    if (currentQuestion >= 3) {
      if (currentDoctor === "") {
        Alert.alert(
          "Missing Information",
          `Please fill out the following:\n\n${
            currentDoctor === "" ? "Name of the doctor\n" : ""
          }`
        );
        return;
      }
      if (alertMinutesBefore !== -1) {
        RegisterNotification();
        const getStatus = async () => {
          const settings = await Notifications.getPermissionsAsync();
          if (
            !(
              settings.granted ||
              settings.ios?.status ===
                Notifications.IosAuthorizationStatus.PROVISIONAL
            )
          ) {
            Alert.alert(
              "Missing Permissions",
              "To receive notifications, please enable notifications in your settings."
            );
          }
        };
        getStatus();
      }
      Toast.show(<TickToast message={`Appointment Added`} />, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 50,
        containerStyle: {
          backgroundColor: "transparent",
        },
        opacity: 0.9,
      });
      addFlowStore.currentNewAppointment.setAppointmentDetails(
        currentDoctor.trim(),
        selectedSymptomType,
        alertMinutesBefore,
        extraNotes.trim()
      );
      await addFlowStore.dbInsertAppointment(user.id);
      navigation.navigate("Root", { screen: "HomeScreen"});
    } else {
      nextQuestion();
    }
  };

  const symptomArr = uniqueSymptoms;

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

  const getAlertTimeText = (minutes: number) => {
    switch (minutes) {
      case -1:
        return "No notifications";
      case 0:
        return "At the time of your appointments";
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

  const handleGoBack = () => {
    if (currentDoctor !== "" || extraNotes !== "") {
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
              navigation.pop();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.pop();
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
            {!inputFocused && currentDoctor !== "" ? (
              <Text style={styles.answer}>{currentDoctor}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {!inputFocused && selectedSymptom !== "" ? (
              <Text style={styles.answer}>{selectedSymptom}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>{getQuestion(2)}</Text>
            {!inputFocused && alertMinutesBefore !== null ? (
              <Text style={styles.answer}>
                {getAlertTimeText(alertMinutesBefore)}
              </Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ4 }]}>
            <Text style={styles.question}>{getQuestion(3)}</Text>
            {!inputFocused && extraNotes !== "" ? (
              <Text style={styles.answer}>{extraNotes}</Text>
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
                currentQuestion === 1 ? "transparent" : tileColor,
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
            {currentQuestion === 0 || currentQuestion === 3 ? (
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
                    if (currentQuestion === 0) {
                      setCurrentDoctor(text);
                    } else if (currentQuestion === 3) {
                      setExtraNotes(text);
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
            {currentQuestion === 1 ? (
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
                  sliderWidth={Dimensions.get("window").width}
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
            {currentQuestion === 2 ? (
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
                <Picker.Item label="At time of appointment" value={0} />
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
        last={currentQuestion === 3}
        preventRightHaptics={currentQuestion >= 3}
        left={() => {
          if (
            (currentQuestion === 0 && currentDoctor !== "") ||
            currentQuestion > 0
          ) {
            const qNow = currentQuestion - 1;
            setCurrentQuestion(currentQuestion - 1);
            switch (qNow) {
              case -1:
                handleGoBack();
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
                setCurrentText(currentDoctor);
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
            handleGoBack();
          }
        }}
        right={handleNavigation}
        preventLeftDefault={true}
        preventRightDefault={true}
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
