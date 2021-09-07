export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  notes: string;
  complete: number;
  time: number;
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