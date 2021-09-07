import {
  cast,
  types,
  Instance,
  getSnapshot,
  SnapshotOut,
  SnapshotOrInstance
} from "mobx-state-tree";

/**
 * The Appointment model for adding new appointments.
 * Not compatible for editting or displaying
 */
export const AppointmentModel = types
  .model("Appointment", {
    doctor: types.optional(types.string, ""),
    symptomType: types.optional(types.string, ""),
    time: types.array(types.Date),
    // Storing unix timestamps directly
    alert: types.array(types.number)
  })
  .views(self => ({
    getSortedTimes: () => {
      return [...getSnapshot(self.time)].sort((a, b) => a - b);
    }
  }))
  .actions(self => ({
    setAppointmentTime: (time: SnapshotOrInstance<typeof self.time>) => {
      self.time = cast(time);
    },
    setAppointmentDetails: (name: string, type: string, alertMinutesBefore: number | null) => {
      self.doctor = name;
      self.symptomType = type;
      self.alert = cast(self.getSortedTimes().map(
        item => 
          (alertMinutesBefore === null) ? -1 : (item - alertMinutesBefore * 60 * 1000)
      ));
    }
  }));

export const SavedAppointmentModel = types
  .model("SavedAppointment",{
    id: types.identifierNumber,
    collectionId: types.integer,
    complete: types.optional(types.number, 0),
    doctor: types.optional(types.string, "Mark Wong"),
    time: types.Date,
    notes: types.optional(types.string, "")
  })
  .actions(self => ({
    updateNotes: (notes: string) => {
      self.notes = notes;
    }
  }));

type AppointmentType = Instance<typeof AppointmentModel>;
export interface Appointment extends AppointmentType {};
type AppointmentSnapshotType = SnapshotOut<typeof AppointmentModel>;
export interface AppointmentSnapshot extends AppointmentSnapshotType {};

type SavedAppointmentType = Instance<typeof SavedAppointmentModel>;
export interface SavedAppointment extends SavedAppointmentType {};
type SavedAppointmentSnapshotType = SnapshotOut<typeof SavedAppointmentModel>;
export interface SavedAppointmentSnapshot extends SavedAppointmentSnapshotType {};
