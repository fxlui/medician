export type RootStackParamList = {
  Root: undefined;
  AddFlow: undefined;
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
  SymptomsScreen: undefined;
  AreaSelectScreen: undefined;
  SeverityScreen: undefined;
  TimeSelectScreen: undefined;
  DetailsScreen: undefined;
  MediaScreen: undefined;
  TemperatureSelectionScreen: undefined;
};

export enum HomeTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}
