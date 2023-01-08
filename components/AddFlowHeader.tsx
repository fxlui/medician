import { View, Text } from "./Themed";
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { PressableBase } from "./PressableBase";
import { Ionicons } from "@expo/vector-icons";
import CustomHaptics from "../utils/CustomHaptics";
import { StackHeaderProps } from "@react-navigation/stack";

const AddFlowHeader = ({
  screenProps,
  title,
  subtitle,
  backAction,
  moreAction,
}: {
  screenProps: StackHeaderProps;
  title: string;
  subtitle?: string;
  backAction?: () => void;
  moreAction?: () => void;
}) => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={{
        backgroundColor: colorScheme === "light" ? "#fff" : "#252525",
        padding: 20,
        paddingHorizontal: 30,
        paddingBottom: Math.max(insets.bottom, 20),
      }}
    >
      {subtitle ? (
        <DefaultView>
          <DefaultView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PressableBase
              extraProps={{
                style: {
                  paddingRight: 10,
                },
                accessibilityLabel: "Navigate to previous screen",
              }}
              onPress={() => {
                CustomHaptics("light");
                if (backAction) {
                  backAction();
                } else {
                  screenProps.navigation.goBack();
                }
              }}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={colorScheme === "light" ? "#333" : "#fff"}
              />
            </PressableBase>
            {moreAction ? (
              <PressableBase
                extraProps={{
                  accessibilityLabel: "More options",
                }}
                onPress={() => {
                  CustomHaptics("light");
                  moreAction();
                }}
              >
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={28}
                  color={colorScheme === "light" ? "#333" : "#fff"}
                />
              </PressableBase>
            ) : null}
          </DefaultView>

          <DefaultView
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
              {title}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 10 }}>
              {subtitle}
            </Text>
          </DefaultView>
        </DefaultView>
      ) : (
        <DefaultView
          style={
            moreAction
              ? {}
              : {
                  flexDirection: "row",
                  alignItems: "center",
                }
          }
        >
          <DefaultView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DefaultView
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PressableBase
                extraProps={{
                  style: {
                    paddingRight: 10,
                  },
                  accessibilityLabel: "Navigate to previous screen",
                }}
                onPress={() => {
                  CustomHaptics("light");
                  if (backAction) {
                    backAction();
                  } else {
                    screenProps.navigation.goBack();
                  }
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color={colorScheme === "light" ? "#333" : "#fff"}
                />
              </PressableBase>
              {moreAction ? (
                <Text style={{ fontSize: 20, fontWeight: "500" }}>{title}</Text>
              ) : null}
            </DefaultView>
            {moreAction ? (
              <PressableBase
                extraProps={{
                  accessibilityLabel: "More options",
                }}
                onPress={() => {
                  CustomHaptics("light");
                  moreAction();
                }}
              >
                <Ionicons
                  name="ellipsis-horizontal-sharp"
                  size={28}
                  color={colorScheme === "light" ? "#333" : "#fff"}
                />
              </PressableBase>
            ) : null}
          </DefaultView>
          {!moreAction ? (
            <Text style={{ fontSize: 20, fontWeight: "500" }}>{title}</Text>
          ) : null}
        </DefaultView>
      )}
    </SafeAreaView>
  );
};

export default AddFlowHeader;
