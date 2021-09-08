export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  notes: string;
  complete: number;
  time: number;
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
  time: number;
  complete: number;
}

export interface FetchByCollectionResultType {
  records: {
    id: number,
    area: string,
    subArea: string
  }[],
  routines: SQLRoutineReturnType[],
  appointments: SQLAppointmentsReturnType[]
}