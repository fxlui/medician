import {
  cast,
  types,
  Instance,
  SnapshotOut,
  getSnapshot,
  SnapshotOrInstance
} from "mobx-state-tree";

/**
 * The Routine model.
 */
export const RoutineModel = types
  .model("Routine", {
    type: types.optional(types.integer, 0),
    symptomType: types.optional(types.string, ""),
    minutesBefore: types.optional(types.number, -1),
    title: types.optional(types.string, ""),
    notes: types.optional(types.string, ""),
    time: types.array(types.Date),
    alert: types.array(types.integer)
  })
  .views((self) => ({
    getSortedTimes: () => {
      return [...getSnapshot(self.time)].sort((a, b) => a - b);
    }
  }))
  .actions((self) => ({
    setRoutineType: (type: number) => {
      self.type = type;
    },
    setRoutineDetails: (title: string, symptomType: string, minutes: number, notes: string) => {
      self.title = title;
      self.symptomType = symptomType;
      self.minutesBefore = minutes;
      self.notes = notes;
    },
    setRoutineTimeAndAlert: (times: SnapshotOrInstance<typeof self.time>) => {
      self.time = cast(times);
      self.alert = cast(self.getSortedTimes().map(
        item => 
          (self.minutesBefore === -1) ? -1 : (item - self.minutesBefore * 60 * 1000)
      ));
    }
  }));

export const SavedRoutineModel = types
  .model("SavedRoutine" ,{
    id: types.identifierNumber,
    collectionId: types.integer,
    type: types.integer,
    title: types.string,
    notes: types.string,
    time: types.Date,
    complete: types.integer
  });

type RoutineType = Instance<typeof RoutineModel>;
export interface Routine extends RoutineType {};
type RoutineSnapshotType = SnapshotOut<typeof RoutineModel>;
export interface RoutineSnapshot extends RoutineSnapshotType {};

type SavedRoutineType = Instance<typeof SavedRoutineModel>;
export interface SavedRoutine extends SavedRoutineType {};
type SavedRoutineSnapshotType = SnapshotOut<typeof SavedRoutineModel>;
export interface SavedRoutineSnapshot extends SavedRoutineSnapshotType {};
