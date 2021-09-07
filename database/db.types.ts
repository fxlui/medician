export interface SQLAppointmentsReturnType {
  id: number;
  collectionId: number;
  doctor: string;
  complete: number;
  time: number;
}

export interface SQLRoutineReturnType {
  id: number;
  collectionId: number;
  type: number;
  titile: string;
  notes: string;
  time: number;
  complete: number;
}