import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { TutorialParamList, RootStackParamList } from "../../types";
import TileBase from "../../components/TileBase";
import { useColorScheme } from "react-native";
import PagerView from "react-native-pager-view";

import { StackScreenProps } from "@react-navigation/stack";
import CustomHaptics from "../../utils/CustomHaptics";
import { Home } from "../../assets/images/Home";
import { Action } from "../../assets/images/Action";
import { Symptom } from "../../assets/images/Symptom";
import { Routine } from "../../assets/images/Routine";
import { Overview } from "../../assets/images/Overview";
import { themeTileColor } from "../../constants/Colors";
import { useStores } from "../../models/root-store-provider";
import SafeView from "../../components/SafeView";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDatabase } from "../../database/dbAPI";

type ScreenProps = StackScreenProps<RootStackParamList, "Tutorial">;

const OverviewTut: React.FC<{ key: number }> = ({ key }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      key={key}
    >
      <View
        style={{
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          You can view all the details about your symptoms here.{" "}
        </Text>
        <View
          style={{
            borderRadius: 25,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 310,
              height: 630,
              borderRadius: 15,
            }}
            source={Overview}
          />
        </View>
      </View>
    </View>
  );
};

const RoutineTut: React.FC<{ key: number }> = ({ key }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      key={key}
    >
      <View
        style={{
          maxWidth: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          Use these buttons to add appointments and routines.
        </Text>
        <View
          style={{
            borderRadius: 25,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 310,
              height: 630,
              borderRadius: 15,
            }}
            source={Routine}
          />
        </View>
      </View>
    </View>
  );
};

const SymptomTut: React.FC<{ key: number }> = ({ key }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      key={key}
    >
      <View
        style={{
          maxWidth: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          Any two of these buttons{"\n"}can be used to add an symptom.
        </Text>
        <View
          style={{
            borderRadius: 25,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 310,
              height: 630,
              borderRadius: 15,
            }}
            source={Symptom}
          />
        </View>
      </View>
    </View>
  );
};

const ActionTut: React.FC<{ key: number }> = ({ key }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      key={key}
    >
      <View
        style={{
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "600",
          }}
        >
          Use this button to add reminders or symptoms.
        </Text>
        <View
          style={{
            borderRadius: 25,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 310,
              height: 630,
              borderRadius: 15,
            }}
            source={Action}
          />
        </View>
      </View>
    </View>
  );
};

const HomeTut: React.FC<{ key: number }> = ({ key }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      key={key}
    >
      <View
        style={{
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "600",
          }}
        >
          You will be able to see 👀{"\n"}all your notifications here.
        </Text>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            borderRadius: 25,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 310,
              height: 630,
              borderRadius: 15,
            }}
            source={Home}
          />
        </View>
      </View>
    </View>
  );
};

const WelcomeTut: React.FC<ScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  const { user } = useStores();

  const finish = () => {
    CustomHaptics("light");
    const setNewUser = async () => {
      await initDatabase();
      await AsyncStorage.setItem("@tutorialPassed", "true");
      user.finishTutorial();
      navigation.navigate("Root", { screen: "HomeScreen" });
    };
    setNewUser();
  };

  const EndingTut: React.FC<{ key: number }> = ({ key }) => (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
      key={0}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>🎉 Congrats!</Text>
        <Text
          style={[
            styles.greeting,
            {
              marginTop: 10,
            },
          ]}
        >
          You should be good to go.
        </Text>
      </View>

      <View
        style={{
          flex: 4,
          alignItems: "center",
        }}
      >
        <TileBase
          gradient={[tileColor, tileColor]}
          style={{
            marginTop: 80,
            width: 150,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={finish}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Let's Start</Text>
        </TileBase>
      </View>
    </View>
  );

  return (
    <SafeView>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.container} key={0}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              👋 Hello.{"\n"}
              Welcome to Medician.{"\n"}
            </Text>
            <Text style={styles.greeting}>
              Let's get you familiar{"\n"}
              with the app.{"\n"}
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "500",
                opacity: 0.8,
              }}
            >
              Swipe right to get started.
            </Text>
          </View>

          <View
            style={{
              flex: 3,
              alignItems: "center",
            }}
          >
            <TileBase
              gradient={[tileColor, tileColor]}
              style={{
                marginTop: 80,
                width: 150,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={finish}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Skip Tutorial
              </Text>
            </TileBase>
          </View>
        </View>
        <HomeTut key={1} />
        <ActionTut key={2} />
        <SymptomTut key={3} />
        <RoutineTut key={4} />
        <OverviewTut key={5} />
        <EndingTut key={6} />
      </PagerView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 6,
    marginLeft: 30,
    marginTop: 80,
    flexDirection: "column",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "600",
  },
  img: {
    flex: 1,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
  },
  list: {
    overflow: "visible",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 40,
  },
});
export default WelcomeTut;
