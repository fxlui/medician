import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import * as SplashScreen from "expo-splash-screen";
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
import { initDatabase } from "./database/dbAPI";

import { Text, View } from "./components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import TileBase from "./components/TileBase";

import { themeTextColor, themeTileColor } from "./constants/Colors";
import { Asset } from "expo-asset";
import { Animated, ImageURISource, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const AnimatedAppLoader: React.FC<{
  children: React.ReactNode;
  image: ImageURISource;
}> = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => async () => {
      await Asset.fromModule(image.uri!);
    },
    [image]
  );

  const onFinish = React.useMemo(() => () => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
};

const AnimatedSplashScreen: React.FC<{
  children: React.ReactNode;
  image: ImageURISource;
}> = ({ children, image }) => {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = React.useMemo(
    () => async () => {
      try {
        await SplashScreen.hideAsync();
        // Load stuff
        await Promise.all([]);
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true);
      }
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colorScheme === "light" ? "#fff" : "#000",
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest?.splash?.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

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
      // TODO move following to end of tutorial
      await initDatabase();
      const store = await setupRootStore();
      setRootStore(store);
      await SecureStore.setItemAsync("enable_haptics", "true");
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
              <AnimatedAppLoader
                image={{ uri: Constants.manifest?.splash?.image }}
              >
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </AnimatedAppLoader>
            </SafeAreaProvider>
          </RootStoreProvider>
        </RootSiblingParent>
      </ActionSheetProvider>
    );
  }
}
