import React from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Alert,
  Modal,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import * as VideoThumbnails from "expo-video-thumbnails";

import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/core";
import { AddFlowParamList, RootStackParamList } from "../../types";
import SafeView from "../../components/SafeView";
import { Text, View } from "../../components/Themed";
import { useColorScheme } from "react-native";

import AddFlowNavBar from "../../components/AddFlowNavBar";
import { useStores } from "../../models/root-store-provider";

import { Entypo, Ionicons } from "@expo/vector-icons";
import TileBase from "../../components/TileBase";
import SwipeBar from "../../components/SwipeBar";
import { LinearGradient } from "expo-linear-gradient";
import { themeTextColor, themeTileColor } from "../../constants/Colors";
import Toast from "react-native-root-toast";
import { getEditDescription } from "../../utils/ScreenUtils";
import TickToast from "../../components/TickToast";
import { observer } from "mobx-react-lite";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PressableBase } from "../../components/PressableBase";

//import { AVPlaybackStatus, Video } from "expo-av";
//import VideoPlayer from "expo-video-player";

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

const MediaScreen = observer(({ navigation, route }: ScreenProps) => {
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const tileColor =
    colorScheme === "light" ? themeTileColor.light : themeTileColor.dark;
  const { user, addFlowStore, editFlowStore } = useStores();

  const defaultImagesList =
    route.params.method === "add"
      ? []
      : editFlowStore.currentRecordAttachments.map((item) => ({
          uri: item.uri,
          type: item.type,
        }));

  const [images, setImages] = React.useState<Media[]>(defaultImagesList);
  const [currentMedia, setCurrentMedia] = React.useState<Media>();
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    ensureDirExists();
  }, []);

  const pickImage = async () => {
    const hasPermission = await checkLibraryPermission();
    if (!hasPermission) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ALL
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ALL
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

  const ModalContainer: React.FC<{ img: Media }> = ({ img }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
          }}
        >
          {img.type === "video" /*<VideoPlayer
                videoProps={{
                  shouldPlay: true,
                  resizeMode: Video.RESIZE_MODE_CONTAIN,
                  source: {
                    uri: img.uri!,
                  },
                }}
              />*/ ? null : (
            <Image
              resizeMode="contain"
              source={{ uri: img.uri }}
              style={[
                {
                  width: width * 0.8,
                  height: height * 0.8,
                },
              ]}
            />
          )}
          <PressableBase
            onPress={() => setModalVisible(!modalVisible)}
            extraProps={{
              style: {
                alignSelf: "center",
                padding: 25,
                zIndex: 200,
                backgroundColor: "black",
                borderRadius: 15,
                marginTop: 20,
              },
            }}
          >
            <Entypo name="chevron-down" size={35} color="#fff" />
          </PressableBase>
        </View>
      </View>
    );
  };

  return (
    <SafeView style={styles.container} disableTop>
      {route.params.method === "edit" ? (
        <Text style={{ paddingLeft: 30, opacity: 0.7 }}>
          Editing record for{" "}
          {getEditDescription(
            editFlowStore.currentSymptomType,
            editFlowStore.currentEditingRecord?.subArea
          )}
        </Text>
      ) : null}
      <Text
        style={[
          styles.greeting,
          {
            maxWidth: width - 100,
          },
        ]}
      >
        Attach any photos{/* or videos*/} here.
      </Text>
      <View
        style={{
          flex: 1,
          overflow: "visible",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
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
                      width: width - 80,
                      height: 150,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                    onClick={() => {
                      if (img.type === "video") {
                        Alert.alert(
                          "It's a video!",
                          "Video playbacks aren't supported yet. Don't worry - they are still saved in Medician and you'll be able to play them in the next update. :)"
                        );
                      } else {
                        setCurrentMedia(img);
                        setModalVisible(true);
                      }
                    }}
                  >
                    <Image
                      source={{ uri: img.uri! }}
                      style={{
                        width: width - 100,
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
            bottom: 75,
            width: "90%",
            borderRadius: 10,
            padding: 20,
            backgroundColor: "transparent",
            zIndex: 50,
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <ModalContainer img={currentMedia!} />
      </Modal>
      <AddFlowNavBar
        last
        preventRightHaptics
        left={() => navigation.pop()}
        right={async () => {
          if (route.params.method === "add") {
            const paths = images
              .map((image) => image.uri)
              .filter((uri) => uri !== undefined) as string[];
            const savedPaths = await Promise.all(
              paths.map((path) => moveToFileSystem(path))
            );
            const finalImages = images.map((item, index) => ({
              type: item.type,
              uri: savedPaths[index],
            }));
            addFlowStore.currentNewRecord.setRecordAttachments(finalImages);
            await addFlowStore.dbInsertRecord(user.id);
          } else {
            // TODO handle edit flow
            await editFlowStore.updateRecordAsync();
          }
          Toast.show(
            <TickToast
              message={`Record ${
                route.params.method.charAt(0).toUpperCase() +
                route.params.method.slice(1)
              }ed`}
            />,
            {
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
            }
          );
          navigation.navigate("Root", { screen: "OverviewScreen" });
        }}
      ></AddFlowNavBar>
    </SafeView>
  );
});

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
    marginBottom: 20,
  },
});

export default MediaScreen;
