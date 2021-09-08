export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  notes: string;
  completed: number;
  eventTime: number;
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

export interface SQLRecordReturnType {
  id: number;
  collectionId: number;
  area: string;
  subArea: string;
  severity: number;
  better: string;
  worse: "",
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