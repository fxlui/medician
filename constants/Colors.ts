const tintColorLight = "#000";
const tintColorDark = "#fff";

export const medicationGradient = ["#24AC29", "#3DA523"];
export const exerciseGradient = ["#4E54C8", "#4B52DD"];
export const appointmentGradient = ["#18BDF1", "#2DB1FB"];

const lightTextColor = "#333333";
const darkTextColor = "#fff";

const lightBorderColor = "#dbdbdb";
const darkBorderColor = "#454545";

const lightTileColor = "#fff";
const darkTileColor = "#252525";

const lightLineColor = "#E9E9E9";
const darkLineColor = "#333";

interface lightDarkColors {
  light: string;
  dark: string;
}

export const themeTextColor: lightDarkColors = {
  light: lightTextColor,
  dark: darkTextColor,
};

export const themeBorderColor: lightDarkColors = {
  light: lightBorderColor,
  dark: darkBorderColor,
};

export const themeTileColor: lightDarkColors = {
  light: lightTileColor,
  dark: darkTileColor,
};

export const themeLineColor: lightDarkColors = {
  light: lightLineColor,
  dark: darkLineColor,
};

export default {
  light: {
    text: "#333333",
    background: "#F9F9F9",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
