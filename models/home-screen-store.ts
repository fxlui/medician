import {
  types,
  cast,
  flow,
  SnapshotOrInstance,
  getSnapshot,
  Instance,
  SnapshotOut
} from "mobx-state-tree";
import {
  SQLAppointmentsReturnType,
  SQLRoutineReturnType
} from "../database/db.types";
import {
  fetchRecentAppointments,
  fetchRecentRoutines
} from "../database/dbAPI";
import { SavedRoutineModel } from "./routine";
import { SavedAppointmentModel } from "./appointment";

/**
 * The Home Screen Store model.
 * Stores arrays of medication, exercises and appointments.
 */
export const HomeScreenStoreModel = types
  .model("HomeScreenStore", {
    recentRoutines: types.optional(types.array(SavedRoutineModel), []),
    recentAppointments: types.optional(types.array(SavedAppointmentModel), []),
    collectionIds: types.optional(types.array(types.integer), [])
  })
  // Calls to get derived data
  .views(self => ({
    getRecentMedications: () => {
      return getSnapshot(self.recentRoutines).filter(item => item.type === 0);
    },
    getRecentExercises: () => {
      return getSnapshot(self.recentRoutines).filter(item => item.type === 1);
    },
    getRecentAppointments: () => {
      return getSnapshot(self.recentAppointments);
    }
  }))
  // Synchronous actions defined here
  .actions(self => ({
    setRoutines: (routine: SnapshotOrInstance<typeof self.recentRoutines>) => {
      self.recentRoutines = cast(routine);
    },
    setAppointments: (appointments: SnapshotOrInstance<typeof self.recentAppointments>) => {
      self.recentAppointments = cast(appointments);
    }
  }))
  // Asynchronous actions defined here
  .actions(self => {
    const fetchAppointmentsAsync = flow(function*() {
      try {
        const results: SQLAppointmentsReturnType[] = yield fetchRecentAppointments();
        self.recentAppointments = cast(
          results.map(
            item => SavedAppointmentModel.create({
              id: item.id,
              collectionId: item.collectionId,
              complete: item.complete,
              doctor: item.doctor,
              time: new Date(item.time),
              notes: item.notes
            })
          )
        );
      } catch (error) {
        console.warn(error);
      }
    });

    const fetchRoutinesAsync = flow(function*() {
      try {
        const results: SQLRoutineReturnType[] = yield fetchRecentRoutines();
        self.recentRoutines = cast(
          results.map(
            item => SavedRoutineModel.create({
              id: item.id,
              collectionId: item.collectionId,
              title: item.title,
              notes: item.notes,
              type: item.type,
              time: new Date(item.time),
              complete: item.complete
            })
          )
        )
      } catch (error) {
        console.warn(error);
      }
    });
    return { fetchAppointmentsAsync, fetchRoutinesAsync };
  });

type HomeScreenStoreType = Instance<typeof HomeScreenStoreModel>;
export interface HomeScreenStore extends HomeScreenStoreType {};
type HomeScreenStoreSnapshotType = SnapshotOut<typeof HomeScreenStoreModel>;
export interface HomeScreenStoreSnapshot extends HomeScreenStoreSnapshotType {};