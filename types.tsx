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
  Settings: undefined;
  Timeline: {
    type: string;
    area: string;
  };
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  DirectToAddFlow: undefined;
  OverviewScreen: undefined;
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
  AppointmentTimeScreen: undefined;
  AppointmentDetailsScreen: undefined;
  RoutineSelectScreen: undefined;
  RoutineDetailsScreen: {
    type: "medication" | "exercise";
  };
  RoutineTimeScreen: undefined;
};

export enum HomeTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}

export type DatabaseEntryType = [
  number,
  number,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  string
];
