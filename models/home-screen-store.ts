import {
  types,
  cast,
  SnapshotOrInstance,
  getSnapshot,
  Instance,
  SnapshotOut
} from "mobx-state-tree";
import { TreatmentModel } from "./treatment";
import { AppointmentModel } from "./appointment";

/**
 * The Home Screen Store model.
 * Stores arrays of medication, exercises and appointments.
 */
export const HomeScreenStoreModel = types
  .model("HomeScreenStore", {
    recentTreatments: types.optional(types.array(TreatmentModel), []),
    recentAppointments: types.optional(types.array(AppointmentModel), []),
    collectionIds: types.optional(types.array(types.integer), [])
  })
  // Calls to get derived data
  .views((self) => ({
    getRecentMedications: () => {
      return getSnapshot(self.recentTreatments).filter(item => item.type === 0);
    },
    getRecentExercises: () => {
      return getSnapshot(self.recentTreatments).filter(item => item.type === 1);
    }
  }))
  // Synchronous actions defined here
  .actions((self) => ({
    setTreatments: (treatment: SnapshotOrInstance<typeof self.recentTreatments>) => {
      self.recentTreatments = cast(treatment);
    },
    setAppointments: (appointments: SnapshotOrInstance<typeof self.recentAppointments>) => {
      self.recentAppointments = cast(appointments);
    }
  }))
  // Asynchronous actions defined here
  .actions((self) => ({
    fetchAll: async () => {
      return;
    }
  }));

type HomeScreenStoreType = Instance<typeof HomeScreenStoreModel>;
export interface HomeScreenStore extends HomeScreenStoreType {};
type HomeScreenStoreSnapshotType = SnapshotOut<typeof HomeScreenStoreModel>;
export interface HomeScreenStoreSnapshot extends HomeScreenStoreSnapshotType {};