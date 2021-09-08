import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme,
  TouchableOpacity,
  Linking,
  Platform,
  Switch,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { StackScreenProps } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

import SafeView from "../components/SafeView";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";

import { Medician } from "../assets/images/medician";
import { Ionicons } from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";

import {
  themeTextColor,
  themeBorderColor,
  themeTileColor,
} from "../constants/Colors";

type ScreenProps = StackScreenProps<RootStackParamList, "Settings">;

const SettingsScreen = ({ navigation }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const borderColor =
    colorScheme === "light" ? themeBorderColor.light : themeBorderColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;

  const [showBioSettings, setShowBioSettings] = React.useState(false);
  const [lockApp, setLockApp] = React.useState(false);
  const [useHaptics, setUseHaptics] = React.useState(true);
  const [bioText, setBioText] = React.useState("");

  React.useEffect(() => {
    const getStatus = async () => {
      const result = await SecureStore.getItemAsync("enable_bio");
      if (result === "true") {
        setLockApp(true);
        setShowBioSettings(true);
      }
      const hapticsResult = await SecureStore.getItemAsync("enable_haptics");
      if (hapticsResult === "false") {
        setUseHaptics(false);
      } else if (hapticsResult === "true") {
        setUseHaptics(true);
      }
      const status = await LocalAuthentication.hasHardwareAsync();
      if (status) {
        const authStatus = await LocalAuthentication.isEnrolledAsync();
        if (authStatus) {
          setShowBioSettings(true);
          const methods =
            await LocalAuthentication.supportedAuthenticationTypesAsync();
          if (
            methods.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
            )
          ) {
            if (Platform.OS === "android") {
              setBioText("Facial Recognition");
            } else {
              setBioText("Face ID");
            }
          } else if (
            methods.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
          ) {
            if (Platform.OS === "android") {
              setBioText("Fingerprint Recognition");
            } else {
              setBioText("Touch ID");
            }
          } else {
            setBioText("biometric sensor");
          }
        }
      }
    };
    getStatus();
  }, []);

  return (
    <SafeView disableTop disableBottom style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Image source={Medician} style={{ height: 150, width: 150 }} />
        <Text style={styles.brand}>Medician</Text>
        <Text style={styles.version}>{Constants.manifest?.version}</Text>

        <View style={styles.section}>
          <Text style={styles.header}>Settings</Text>
          {showBioSettings ? (
            <View
              style={[
                styles.row,
                {
                  backgroundColor: tileColor,
                  borderColor: borderColor,
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text style={styles.rowText}>Lock with {bioText}</Text>
              <Switch
                style={{ marginLeft: "auto" }}
                value={lockApp}
                onValueChange={(value) => {
                  const getBio = async () => {
                    if (!value) {
                      await SecureStore.setItemAsync("enable_bio", "false");
                      setLockApp(false);
                      return;
                    }
                    const bio = await LocalAuthentication.authenticateAsync({
                      promptMessage: `Authenticate to enable biometric authentication`,
                    });
                    if (bio.success) {
                      await SecureStore.setItemAsync("enable_bio", "true");
                      setLockApp(true);
                    } else {
                      setLockApp(false);
                    }
                  };
                  getBio();
                }}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.row,
              { backgroundColor: tileColor, borderColor: borderColor },
            ]}
          >
            <Text style={styles.rowText}>Haptics in App</Text>
            <Switch
              style={{ marginLeft: "auto" }}
              value={useHaptics}
              onValueChange={(value) => {
                const setHaptics = async () => {
                  if (!value) {
                    await SecureStore.setItemAsync("enable_haptics", "false");
                  } else {
                    await SecureStore.setItemAsync("enable_haptics", "true");
                  }
                };
                setHaptics();
                setUseHaptics(value);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>About</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto://support@logicpop.com.au")}
          >
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: 0,
                  backgroundColor: tileColor,
                  borderColor: borderColor,
                },
              ]}
            >
              <Text style={styles.rowText}>Contact Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              WebBrowser.openBrowserAsync("https://logicpop.com.au/privacy")
            }
          >
            <View
              style={[
                styles.row,
                { backgroundColor: tileColor, borderColor: borderColor },
              ]}
            >
              <Text style={styles.rowText}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>Made with </Text>
          <Ionicons name="heart-outline" size={20} color={textColor} />
          <Text> by logicpop</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brand: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 20,
  },
  version: {
    fontSize: 14,
    marginTop: 5,
    opacity: 0.5,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  header: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 10,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "500",
  },
  copyright: {
    marginTop: 160,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.5,
  },
  copyrightText: {
    fontSize: 14,
  },
});

export default SettingsScreen;
