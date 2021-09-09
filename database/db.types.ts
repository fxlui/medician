export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  notes: string;
  completed: number;
  eventTime: number;
  alertId: number;
}

export interface SQLAlertReturnType {
  id: number;
  appointmentId: number;
  routineId: number;
  time: number;
  eventTime: number;
  completed: number;
  systemId: string;
}

export interface SQLAlertIDsType {
  appointmentId: number;
  routineId: number;
}

export interface SQLCollectionReturnType {
  id: number;
  date: number;
  type: string;
  userId: number;
}

export interface SQLRoutineReturnType {
  id: number;
  collectionId: number;
  type: number;
  title: string;
  notes: string;
  eventTime: number;
  completed: number;
  alertId: number;
}

export interface FetchByCollectionResultType {
  records: {
    id: number;
    area: string;
    subArea: string;
  }[];
  routines: SQLRoutineReturnType[];
  appointments: SQLAppointmentsReturnType[];
}

export interface SQLRecordReturnType {
  id: number;
  collectionId: number;
  area: string;
  subArea: string;
  severity: number;
  better: string;
  worse: "";
  related: string;
  attempt: string;
  description: string;
  colour: number;
  dizzy: number;
  sleep: number;
  temperature: number;
  time: number;
  toiletPain: number;
  toiletType: number;
}

export interface SQLRecordUpdateType {
  severity: number;
  better: string;
  worse: string;
  related: string;
  attempt: string;
  temperature: number;
  toiletType: number;
  toiletPain: number;
  colour: number;
  dizzy: number;
  sleep: number;
  description: string;
  id: number;
}
