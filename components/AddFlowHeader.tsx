import { View, Text } from "./Themed";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddFlowHeader = ({
  title,
  subtitle,
  backAction,
  moreAction,
}: {
  title: string;
  subtitle?: string;
  backAction?: () => void;
  moreAction?: () => void;
}) => {
  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={{
        backgroundColor: "red",
        padding: 20,
        paddingHorizontal: 30,
      }}
    >
      {subtitle ? (
        <DefaultView>
          <Text>{subtitle}</Text>
        </DefaultView>
      ) : (
        <DefaultView>
          <Text>{title}</Text>
        </DefaultView>
      )}
    </SafeAreaView>
  );
};

export default AddFlowHeader;
