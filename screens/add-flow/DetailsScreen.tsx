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
import {
  GiftedChat,
  InputToolbar,
  IMessage,
  Composer,
  Bubble,
  MessageText,
} from "react-native-gifted-chat";

import SwipeBar from "../../components/SwipeBar";
import TileBase from "../../components/TileBase";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "DetailsScreen">,
  StackScreenProps<RootStackParamList>
>;

export default function TimeSelectScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "What makes it better?",
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
      <Text style={styles.greeting}>Please describe what you observe.</Text>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          marginBottom: editing ? 30 : 85,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          // @ts-ignore - recommened usage in docs
          renderAvatar={null}
          renderBubble={(props) => (
            <Bubble
              {...props}
              renderTime={() => null}
              wrapperStyle={{
                left: {
                  borderRadius: 16,
                  padding: 9,
                  backgroundColor: tileColor,
                },
                right: {
                  borderRadius: 16,
                  padding: 9,
                },
              }}
              // @ts-ignore - recommened usage in docs
              renderMessageText={(props) => (
                <MessageText
                  {...props}
                  customTextStyle={{ color: textColor }}
                />
              )}
            />
          )}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: tileColor,
                borderRadius: 16,
                borderTopWidth: 0,
                padding: 8,
                marginLeft: 8,
                marginRight: 8,
              }}
            />
          )}
          renderComposer={(props) => (
            <Composer
              {...props}
              textInputStyle={{ color: textColor }}
              textInputProps={{
                onFocus: () => setEditing(true),
                onBlur: () => setEditing(false),
              }}
            />
          )}
          listViewProps={{
            style: {
              marginBottom: 20,
            },
          }}
          renderDay={() => null}
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
