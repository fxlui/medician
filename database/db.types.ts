export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  notes: string;
  completed: number;
  eventTime: number;
}

export interface SQLAlertReturnType {
  id: number;
  appointmentId: number;
  routineId: number;
  time: number;
  eventTime: number;
  completed: number;
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
