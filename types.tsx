import { NavigatorScreenParams } from "@react-navigation/core";

export type RootStackParamList = {
  Root: undefined;
  AddFlow: NavigatorScreenParams<AddFlowParamList>;
  Notification: {
    id: string;
    name: string;
    notes: string;
    type: HomeTileTypes;
  };
  ActionScreen: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  DirectToAddFlow: undefined;
  Records: undefined;
};

export type AddFlowParamList = {
  SymptomsScreen: {
    type: "feel" | "cant";
  };
  AreaSelectScreen: undefined;
  SeverityScreen: undefined;
  TimeSelectScreen: undefined;
  DetailsScreen: undefined;
  MediaScreen: undefined;
  TemperatureSelectionScreen: undefined;
  TemperatureScreen: undefined;
  ToiletScreen: undefined;
  ToiletPainScreen: undefined;
  ToiletColorScreen: undefined;
  DizzyScreen: undefined;
  SleepHoursScreen: undefined;
  CustomScreen: undefined;
};

export enum HomeTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}
