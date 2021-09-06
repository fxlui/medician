import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import ImageView from "react-native-image-viewing";
import * as VideoThumbnails from "expo-video-thumbnails";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { AddFlowParamList, RootStackParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { useStores } from "../../models/root-store-provider";

import { Ionicons } from "@expo/vector-icons";
import TileBase from "../../components/TileBase";
import SwipeBar from "../../components/SwipeBar";
import { LinearGradient } from "expo-linear-gradient";

type ScreenProps = CompositeScreenProps<
  StackScreenProps<AddFlowParamList, "MediaScreen">,
  StackScreenProps<RootStackParamList>
>;

const imgDir = FileSystem.documentDirectory + "images/";

// Checks if gif directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    console.log("Img directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
}

const moveToFileSystem = async (uri: string) => {
  ensureDirExists();
  FileSystem.moveAsync({
    from: uri,
    to: imgDir + uri.split("/").pop(),
  });
  return imgDir + uri.split("/").pop();
};

const checkLibraryPermission = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else return true;
    }
    return false;
  }
  return true;
};

const checkCameraPermission = async () => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  if (status !== "granted") {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      } else return true;
    }
    return false;
  }
  return true;
};

const generateThumbnail = async (source: string) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(source);
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

interface Media {
  uri: string | undefined;
  type: string | undefined;
}

export default function MediaScreen({ navigation }: ScreenProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";

  const [images, setImages] = React.useState<Media[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visible, setIsVisible] = React.useState(false);

  const { user, addFlowStore } = useStores();

  const pickImage = async () => {
    const hasPermission = await checkLibraryPermission();
    if (!hasPermission) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
    });
    console.log(result);
    if (!result.cancelled) {
      //let newUri = await moveToFileSystem(result.uri);
      const uri = result.uri;
      const type = result.type;
      if (type === "video") {
        const thumbnail = await generateThumbnail(uri);
        setImages((prev) => [...prev, { uri: thumbnail, type: type }]);
      } else {
        setImages((prev) => [...prev, { uri: uri, type: type }]);
      }
    }
  };

  const takeImage = async () => {
    ensureDirExists();
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) return;
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
    });
    console.log(result);
    if (!result.cancelled) {
      //let newUri = await moveToFileSystem(result.uri);
      const uri = result.uri;
      const type = result.type;
      if (type === "video") {
        const thumbnail = await generateThumbnail(uri);
        setImages((prev) => [...prev, { uri: thumbnail, type: type }]);
      } else {
        setImages((prev) => [...prev, { uri: uri, type: type }]);
      }
    }
  };

  return (
    <SafeView style={styles.container} disableTop>
      <Text style={styles.greeting}>Attach any photos or videos here.</Text>
      <View
        style={{
          flex: 1,
          overflow: "visible",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
            overflow: "visible",
          }}
        >
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              overflow: "visible",
            }}
          >
            {images &&
              images.length > 0 &&
              images.map((img, index) => (
                <SwipeBar
                  key={index}
                  onPress={() => {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to delete this image?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {},
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            FileSystem.deleteAsync(img.uri!);
                            setImages(images.filter((u) => u.uri !== img.uri));
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  inMedia
                >
                  <TileBase
                    gradient={
                      colorScheme === "light"
                        ? ["#fff", "#fff"]
                        : ["#252525", "#252525"]
                    }
                    style={{
                      width: Dimensions.get("window").width - 80,
                      height: 150,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                    onClick={
                      img.type === "video"
                        ? () => {
                            Alert.alert(
                              "It's a video!",
                              "Video playbacks aren't supported yet. Don't worry - they are still saved in Medician and you'll be able to play them in the next update. :)"
                            );
                          }
                        : () => {
                            setCurrentIndex(index);
                            setIsVisible(true);
                          }
                    }
                  >
                    <Image
                      source={{ uri: img.uri! }}
                      style={{
                        width: Dimensions.get("window").width - 100,
                        height: 130,
                        borderRadius: 10,
                      }}
                    />
                  </TileBase>
                </SwipeBar>
              ))}
          </View>
        </ScrollView>
        <LinearGradient
          colors={[
            colorScheme === "light" ? "rgba(249,249,249,0)" : "transparent",
            colorScheme === "light" ? "#F9F9F9" : "#000",
          ]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
          }}
          locations={[0, 0.2]}
        />
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            bottom: 50,
            width: "90%",
            borderRadius: 10,
            padding: 20,
            backgroundColor: "transparent",
          }}
        >
          <TileBase
            onClick={takeImage}
            style={{ marginRight: 40, height: 100, width: 100 }}
            gradient={[tileColor, tileColor]}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="camera-outline" size={35} color={textColor} />
            </View>
          </TileBase>
          <TileBase
            onClick={pickImage}
            style={{ height: 100, width: 100 }}
            gradient={[tileColor, tileColor]}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="add" size={35} color={textColor} />
            </View>
          </TileBase>
        </View>
      </View>
      <ImageView
        images={images.map((i) => {
          if (i.type === "image") {
            return { uri: i.uri! };
          } else return {};
        })}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <AddFlowNavBar
        last
        left={() => navigation.pop()}
        right={() => {
          addFlowStore.setRecordAttachments(images);
          addFlowStore.dbInsertFlow(user.id);
          navigation.navigate("Root");
        }}
      ></AddFlowNavBar>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  greeting: {
    fontSize: 26,
    paddingLeft: 30,
    fontWeight: "600",
    marginTop: 15,
    maxWidth: Dimensions.get("window").width - 100,
    marginBottom: 20,
  },
});
