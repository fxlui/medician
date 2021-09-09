import { NavigatorScreenParams } from "@react-navigation/core";

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  AddFlow: NavigatorScreenParams<AddFlowParamList>;
  Notification: {
    id: number;
    title: string;
    notes: string;
    type: HomeTileTypes;
    clear: boolean;
  };
  ActionScreen: undefined;
  NotFound: undefined;
  Settings: undefined;
  Timeline: {
    collectionId: number;
    type: string;
    area: string;
  };
  TimelineDetails: {
    id: number;
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
  SeverityScreen: {
    method: "add" | "edit";
  };
  TimeSelectScreen: undefined;
  DetailsScreen: {
    method: "add" | "edit";
  };
  MediaScreen: {
    method: "add" | "edit";
  };
  TemperatureSelectionScreen: {
    method: "add" | "edit";
  };
  TemperatureScreen: {
    method: "add" | "edit";
  };
  ToiletScreen: {
    method: "add" | "edit";
  };
  ToiletPainScreen: {
    method: "add" | "edit";
  };
  ToiletColorScreen: {
    method: "add" | "edit";
  };
  DizzyScreen: {
    method: "add" | "edit";
  };
  SleepHoursScreen: {
    method: "add" | "edit";
  };
  CustomScreen: {
    method: "add" | "edit";
  };
  AppointmentTimeScreen: undefined;
  AppointmentDetailsScreen: undefined;
  RoutineSelectScreen: undefined;
  MedicationScreen: undefined;
  ExerciseScreen: undefined;
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
