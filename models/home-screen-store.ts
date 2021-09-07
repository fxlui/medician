import {
  types,
  cast,
  SnapshotOrInstance,
  getSnapshot,
  Instance,
  SnapshotOut
} from "mobx-state-tree";
import { RoutineModel } from "./routine";
import { AppointmentModel } from "./appointment";

/**
 * The Home Screen Store model.
 * Stores arrays of medication, exercises and appointments.
 */
export const HomeScreenStoreModel = types
  .model("HomeScreenStore", {
    recentRoutines: types.optional(types.array(RoutineModel), []),
    recentAppointments: types.optional(types.array(AppointmentModel), []),
    collectionIds: types.optional(types.array(types.integer), [])
  })
  // Calls to get derived data
  .views((self) => ({
    getRecentMedications: () => {
      return getSnapshot(self.recentRoutines).filter(item => item.type === 0);
    },
    getRecentExercises: () => {
      return getSnapshot(self.recentRoutines).filter(item => item.type === 1);
    }
  }))
  // Synchronous actions defined here
  .actions((self) => ({
    setRoutines: (routine: SnapshotOrInstance<typeof self.recentRoutines>) => {
      self.recentRoutines = cast(routine);
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