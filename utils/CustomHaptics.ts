import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

export default function Vibrate(
  style: "extralight" | "light" | "medium" | "heavy" | "done"
) {
  const fetchHaptics = async () => {
    const hapticsResult = await AsyncStorage.getItem("@enable_haptics");
    if (hapticsResult && hapticsResult === "false") {
      return;
    } else {
      switch (style) {
        case "extralight":
          Haptics.selectionAsync();
          break;
        case "light":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case "done":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        default:
          Haptics.selectionAsync();
          break;
      }
    }
  };
  fetchHaptics();
}
