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
import BodyAreas from "../../assets/BodyAreas.json";

import { TopTile, BottomTile } from "../../components/AreaTile";
import Carousel from "react-native-snap-carousel";
import { Picker } from "@react-native-picker/picker";
import { useStores } from "../../models/root-store-provider";
import * as Haptics from "expo-haptics";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "RoutineDetailsScreen">,
  StackScreenProps<RootStackParamList>
>;
interface topBaseData {
  index: number;
  dataIndex: number;
  item: {
    id: number;
    emoji: string;
    text: string;
  };
}

interface bottomBaseData {
  index: number;
  dataIndex: number;
  item: {
    id: number;
    text: string;
  };
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function RoutineDetailsScreen({
  navigation,
  route,
}: ScreenProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const animatedOpacityQ1 = React.useRef(new Animated.Value(1)).current;
  const animatedOpacityQ2 = React.useRef(new Animated.Value(0.5)).current;
  const animatedOpacityQ3 = React.useRef(new Animated.Value(0.5)).current;

  const routineType = route.params.type;
  const bodyAreaArr = BodyAreas;

  const [inputFocused, setInputFocused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [alertMinutesBefore, setAlertMinutesBefore] =
    React.useState<Number | null>(null);

  const [selectedTop, setSelectedTop] = React.useState(0);
  const [selectedBottom, setSelectedBottom] = React.useState(0);
  const [selectedArea, setSelectedArea] = React.useState("");

  const inputRef = React.useRef<TextInput>(null);
  const topRef =
    React.createRef<Carousel<{ id: number; emoji: string; text: string }>>();
  const bottomRef = React.createRef<Carousel<{ id: number; text: string }>>();

  const { addFlowStore } = useStores();

  const getQuestion = (question: Number) => {
    switch (question) {
      case 0:
        return "What is this for?";
      case 1:
        return "When do you want us to remind you?";
      case 2:
        return "Extra notes";
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
        setCurrentQuestion(3);
        break;
      default:
        break;
    }
  };

  const handleNavigation = () => {
    if (currentQuestion >= 2) {
      addFlowStore.goForward();
      navigation.navigate("RoutineTimeScreen");
    } else {
      nextQuestion();
    }
  };

  const renderTopTile = ({ item, index }: topBaseData) => {
    return (
      <TopTile
        title={item.text}
        index={index}
        emoji={item.emoji}
        selected={selectedTop === index}
        updater={() => {
          topRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const renderBottomTile = ({ item, index }: bottomBaseData) => {
    return (
      <BottomTile
        title={item.text}
        index={index}
        selected={selectedBottom === index}
        updater={() => {
          bottomRef.current?.snapToItem(index);
        }}
      />
    );
  };

  const getAlertTimeText = (minutes: Number) => {
    switch (minutes) {
      case 0:
        return `At the time of ${routineType}`;
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
        <Text style={styles.greeting}>
          Please tell me more about your {routineType}.
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
            {!inputFocused && selectedArea !== "" ? (
              <Text style={styles.answer}>{selectedArea}</Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ2 }]}>
            <Text style={styles.question}>{getQuestion(1)}</Text>
            {!inputFocused && alertMinutesBefore !== null ? (
              <Text style={styles.answer}>
                {getAlertTimeText(alertMinutesBefore)}
              </Text>
            ) : null}
          </Animated.View>
          <Animated.View style={[styles.qna, { opacity: animatedOpacityQ3 }]}>
            <Text style={styles.question}>{getQuestion(2)}</Text>
            {!inputFocused && currentText !== "" ? (
              <Text style={styles.answer}>{currentText}</Text>
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
                currentQuestion === 0 ? "transparent" : tileColor,
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
            {currentQuestion === 2 ? (
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
              </>
            ) : null}
            {currentQuestion === 0 ? (
              <View
                style={{
                  backgroundColor: "transparent",
                  marginRight: -20,
                }}
              >
                <Carousel
                  data={bodyAreaArr.map((item) => ({
                    id: item.id,
                    emoji: item.emoji,
                    text: item.text,
                  }))}
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
                  itemWidth={150}
                  inactiveSlideOpacity={0.8}
                  onLayout={() =>
                    setSelectedArea(
                      BodyAreas[selectedTop].parts[selectedBottom]
                    )
                  }
                  onScrollIndexChanged={(index) => {
                    setSelectedTop(index);
                    bottomRef.current?.snapToItem(0);
                    //setSelectedBottom(0);
                    setSelectedArea(BodyAreas[index].parts[0]);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  ref={topRef}
                />
                <Carousel
                  data={bodyAreaArr[selectedTop].parts.map((item, index) => ({
                    id: index,
                    text: item,
                  }))}
                  renderItem={renderBottomTile}
                  vertical={false}
                  sliderWidth={Dimensions.get("window").width}
                  containerCustomStyle={{
                    overflow: "visible",
                  }}
                  contentContainerCustomStyle={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    overflow: "visible",
                    marginTop: 30,
                    marginBottom: 20,
                  }}
                  itemWidth={150}
                  inactiveSlideOpacity={0.8}
                  onScrollIndexChanged={(index) => {
                    setSelectedBottom(index);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedArea(BodyAreas[selectedTop].parts[index]);
                  }}
                  ref={bottomRef}
                />
              </View>
            ) : null}
            {currentQuestion === 1 ? (
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
                <Picker.Item label={`At time of ${routineType}`} value={0} />
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
                setCurrentText(currentText);
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
                break;
              default:
                break;
            }
          } else {
            addFlowStore.goBack();
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
