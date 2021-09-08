import * as Haptics from "expo-haptics";
import * as SecureStore from "expo-secure-store";

export default function Vibrate(
  style: "extralight" | "light" | "medium" | "heavy" | "done"
) {
  const fetchHaptics = async () => {
    const hapticsResult = await SecureStore.getItemAsync("enable_haptics");
    if (hapticsResult !== "true") {
      console.log(0);
      return;
    } else {
      console.log(1);
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
