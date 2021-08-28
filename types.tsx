export type RootStackParamList = {
  Root: undefined;
  AddFlow: undefined;
  Notification: {
    id: string;
    name: string;
    notes: string;
    type: HomeTileTypes;
  }
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  DirectToAddFlow: undefined;
  Records: undefined;
};

export type AddFlowParamList = {
  ActionScreen: undefined;
  AreaSelectScreen: undefined;
};


export enum HomeTileTypes {
  Medication = "med",
  Exercise = "exe",
  Appointment = "app",
}
