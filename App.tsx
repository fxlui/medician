import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as LocalAuthentication from "expo-local-authentication";
import * as ScreenOrientation from "expo-screen-orientation";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

import {
  RootStoreProvider,
  setupRootStore,
} from "./models/root-store-provider";
import { RootStore } from "./models/root-store";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/Navigation";

import { Text, View } from "./components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import TileBase from "./components/TileBase";

import { themeTextColor, themeTileColor } from "./constants/Colors";
import * as Notifications from "expo-notifications";
import { initDatabase } from "./database/dbAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  const [lock, setLock] = useState(false);

  useEffect(() => {
    (async () => {
      await initDatabase();
      const store = await setupRootStore();
      setRootStore(store);
    })();
    const lockOrientation = async () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    const getBioLock = async () => {
      const result = await AsyncStorage.getItem("@enable_bio");
      if (result === "true") {
        setLock(true);
        const bio = await LocalAuthentication.authenticateAsync({
          promptMessage: `Unlock Medician`,
        });
        if (bio.success) {
          setLock(false);
        }
      }
    };
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    getBioLock();
    lockOrientation();
  }, []);

  if (!isLoadingComplete || !rootStore) {
    return <AppLoading />;
  } else if (lock) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FontAwesome name="lock" size={40} color={textColor} />
        <Text style={{ marginTop: 30, fontSize: 18, fontWeight: "500" }}>
          To access Medician,
        </Text>
        <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "500" }}>
          you will need to unlock first.
        </Text>
        <TileBase
          gradient={[tileColor, tileColor]}
          style={{
            marginTop: 40,
            width: 150,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            const tryUnlock = async () => {
              const bio = await LocalAuthentication.authenticateAsync({
                promptMessage: `Unlock Medician`,
              });
              if (bio.success) {
                setLock(false);
              }
            };
            tryUnlock();
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Unlock</Text>
        </TileBase>
      </View>
    );
  } else {
    return (
      <ActionSheetProvider>
        <RootSiblingParent>
          <RootStoreProvider value={rootStore}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </RootStoreProvider>
        </RootSiblingParent>
      </ActionSheetProvider>
    );
  }
}
