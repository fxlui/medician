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
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";

import SafeView from "../../components/SafeView";
import { AddFlowParamList, RootStackParamList } from "../../types";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import ProgressBar from "./ProgressBar";
import AddFlowNavBar from "../../components/AddFlowNavBar";

import { Calendar, DateObject } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import SwipeBar from "../../components/SwipeBar";
import TileBase from "../../components/TileBase";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "DetailsScreen">,
  StackScreenProps<RootStackParamList>
>;

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeView style={styles.container} disableTop>
      <KeyboardAvoidingView style={{ flex: 1, marginBottom: 80 }}>
        <Text style={styles.greeting}>Please describe what you observe.</Text>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          // @ts-ignore - recommened usage in docs
          renderAvatar={null}
          renderBubble={(props) => <TileBase>{props.children}</TileBase>}
          textInputStyle={{
            backgroundColor: "transparent",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "lightgrey",
            padding: 10,
            marginBottom: 10,
          }}
        />
      </KeyboardAvoidingView>
      <AddFlowNavBar
        left={() => navigation.pop()}
        right={() => navigation.navigate("AreaSelectScreen")}
      />
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
    paddingLeft: 30,
    marginTop: 15,
    maxWidth: Dimensions.get("window").width - 100,
    marginBottom: 20,
  },
  greetingSub: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 30,
    opacity: 0.5,
  },
  question: {
    fontWeight: "500",
    fontSize: 18,
  },
});
