import {
  cast,
  types,
  Instance,
  getSnapshot,
  SnapshotOut,
  SnapshotOrInstance
} from "mobx-state-tree";

/**
 * The Appointment model.
 */
export const AppointmentModel = types
  .model("Appointment", {
    doctor: types.optional(types.string, ""),
    symptomType: types.optional(types.string, ""),
    time: types.array(types.Date),
    // Storing unix timestamps directly
    alert: types.array(types.number)
  })
  .views((self) => ({
    getSortedTimes: () => {
      return [...getSnapshot(self.time)].sort((a, b) => a - b);
    }
  }))
  .actions((self) => ({
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

export const SavedAppointmentModel = AppointmentModel
  .props({
    id: types.identifierNumber,
    collectionId: types.integer
  });

type AppointmentType = Instance<typeof AppointmentModel>;
export interface Appointment extends AppointmentType {};
type AppointmentSnapshotType = SnapshotOut<typeof AppointmentModel>;
export interface AppointmentSnapshot extends AppointmentSnapshotType {};
