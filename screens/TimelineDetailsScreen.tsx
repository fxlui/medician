import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  useWindowDimensions,
  Modal,
} from "react-native";
import { Text, View } from "../components/Themed";
import SafeView from "../components/SafeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, AddFlowParamList } from "../types";

import { observer } from "mobx-react-lite";
import { useStores } from "../models/root-store-provider";
import useColorScheme from "../hooks/useColorScheme";
import moment from "moment";
import uniqueSymptoms from "../assets/uniqueSymptoms.json";
import toiletSymptoms from "../assets/ToiletSymptoms.json";
import { PressableBase } from "../components/PressableBase";
import { Entypo, Feather } from "@expo/vector-icons";
import { getEditDescription } from "../utils/ScreenUtils";
import {
  themeBorderColor,
  themeTextColor,
  themeTileColor,
} from "../constants/Colors";
import TileBase from "../components/TileBase";

type ScreenProps = StackScreenProps<RootStackParamList, "TimelineDetails">;

const getTimeString = (timestamp: number) => {
  return `${moment(timestamp).format("MMM D")} ${moment().format("HH:mm")}`;
};

const getDiscomfortEmoji = (severity: number) => {
  if (severity < 4) {
    return "😐";
  } else if (severity < 7) {
    return "😕";
  } else if (severity < 10) {
    return "😖";
  } else {
    return "😡";
  }
};

const getDiscomfortText = (severity: number) => {
  if (severity < 4) {
    return "Minor discomfort";
  } else if (severity < 7) {
    return "Moderate discomfort";
  } else if (severity < 10) {
    return "Severe discomfort";
  } else {
    return "Unbearable";
  }
};

const TimelineDetailsScreen = observer(({ navigation, route }: ScreenProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? themeTextColor.light : themeTextColor.dark;
  const borderColor =
    colorScheme === "light" ? themeBorderColor.light : themeBorderColor.dark;

  const {
    progressStore,
    editFlowStore: {
      currentSymptomType,
      currentEditingRecord,
      currentRecordAttachments,
    },
  } = useStores();

  function useEditDirect(symptomType: string) {
    progressStore.resetProgress();
    switch (symptomType) {
      case "pain":
      case "itchy":
        progressStore.setProgressBarLength(3);
        navigation.navigate("AddFlow", {
          screen: "SeverityScreen",
          params: { method: "edit" },
        }); // also set progress bar length
        break;
      case "hot":
      case "cold":
        progressStore.setProgressBarLength(5);
        navigation.navigate("AddFlow", {
          screen: "TemperatureSelectionScreen",
          params: { method: "edit" },
        });
        break;
      case "toilet":
        progressStore.setProgressBarLength(6);
        navigation.navigate("AddFlow", {
          screen: "ToiletScreen",
          params: { method: "edit" },
        });
        break;
      case "dizzy":
      case "walk":
        progressStore.setProgressBarLength(4);
        navigation.navigate("AddFlow", {
          screen: "DizzyScreen",
          params: { method: "edit" },
        });
        break;
      case "sleep":
        progressStore.setProgressBarLength(4);
        navigation.navigate("AddFlow", {
          screen: "SleepHoursScreen",
          params: { method: "edit" },
        });
        break;
      default:
        progressStore.setProgressBarLength(4);
        navigation.navigate("AddFlow", {
          screen: "CustomScreen",
          params: { method: "edit" },
        });
        break;
    }
  }

  const sectionStyle = StyleSheet.create({
    section: {
      marginTop: 10,
      marginBottom: 10,
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
    },
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableBase
          extraProps={{ style: { padding: 5 } }}
          onPress={() => {
            // navigate to edit
            useEditDirect(currentSymptomType);
            //console.log(route.params.id);
          }}
        >
          <Feather
            name="edit"
            size={20}
            color={textColor}
            style={{ paddingRight: 10 }}
          />
        </PressableBase>
      ),
    });
  }, [navigation]);

  const ModalContainer: React.FC<{ img: string }> = ({ img }) => {
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
          <Image
            resizeMode="contain"
            source={{ uri: img }}
            style={[
              {
                width: width * 0.8,
                height: height * 0.8,
              },
            ]}
          />
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

  const { height, width } = useWindowDimensions();
  const [currentMedia, setCurrentMedia] = React.useState<string>();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeView disableTop style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 25, paddingTop: 15 }}>
        <View style={sectionStyle.section}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              marginBottom: 20,
            }}
          >
            {getEditDescription(
              currentSymptomType,
              currentEditingRecord?.subArea
            )}
            {"\n"}
            {currentEditingRecord &&
              getTimeString(currentEditingRecord.time.getTime())}
          </Text>
        </View>

        {currentEditingRecord?.temperature !== 0 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Temperature</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.temperature}
            </Text>
          </View>
        )}

        {currentEditingRecord?.toiletType !== -1 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Type of Toilet Difficulty</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.toiletType === 0
                ? "Urination"
                : "Defecation"}
            </Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.colour !== -1 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>
              Color of [urine/fecal matter]
            </Text>
            <Text style={styles.sectionText}>
              {toiletSymptoms.color[currentEditingRecord.colour].name}
            </Text>
          </View>
        )}

        {currentEditingRecord?.dizzy !== -1 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>
              Is the room or the head spinning?
            </Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.dizzy === 0 ? "Head" : "Roome"}
            </Text>
          </View>
        )}
        {currentEditingRecord?.sleep !== 0 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>How long did you sleep?</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord?.sleep}
            </Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.severity !== 0 && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Severity</Text>
            <Text style={styles.sectionText}>
              {getDiscomfortEmoji(currentEditingRecord.severity)}{" "}
              {getDiscomfortText(currentEditingRecord.severity)}
            </Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.better !== "" && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>What makes it better?</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord.better}
            </Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.worse !== "" && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>What makes it worse?</Text>
            <Text style={styles.sectionText}>{currentEditingRecord.worse}</Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.related !== "" && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>
              What do you think its related to?
            </Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord.related}
            </Text>
          </View>
        )}

        {currentEditingRecord && currentEditingRecord.attempt !== "" && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Have you tried anything?</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord.attempt}
            </Text>
          </View>
        )}
        {currentEditingRecord && currentEditingRecord.description !== "" && (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Extra notes</Text>
            <Text style={styles.sectionText}>
              {currentEditingRecord.description}
            </Text>
          </View>
        )}

        {currentEditingRecord &&
        currentRecordAttachments &&
        currentRecordAttachments.length > 0 ? (
          <View style={sectionStyle.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {currentRecordAttachments.map((item, index) => (
                <TileBase
                  key={index}
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
                    setCurrentMedia(item.uri);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      width: width - 100,
                      height: 130,
                      borderRadius: 10,
                    }}
                  />
                </TileBase>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <ModalContainer img={currentMedia!} />
      </Modal>
    </SafeView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  list: {
    overflow: "visible",
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TimelineDetailsScreen;
