import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  RootStoreProvider,
  setupRootStore,
} from "./models/root-store-provider";
import { RootStore } from "./models/root-store";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/Navigation";
import { initDatabase } from "./database/dbAPI";

export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
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
      const result = await SecureStore.getItemAsync("enable_bio");
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
    getBioLock();
    lockOrientation();
  }, []);

  if (!isLoadingComplete || !rootStore || lock) {
    return <AppLoading />;
  } else {
    return (
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </RootStoreProvider>
    );
  }
}
