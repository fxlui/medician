import { types, Instance, SnapshotOut, getSnapshot } from "mobx-state-tree";

/**
 * The Record model.
 * This should be used when creating a new record.
 */
export const RecordModel = types
  .model("Record", {
    type: types.optional(types.string, ""),
    time: types.optional(types.array(types.Date), []),
    severity: types.optional(types.integer, 0),
    area: types.optional(types.string, "other"),
    subArea: types.optional(types.string, "other"),
    better: types.optional(types.string, ""),
    worse: types.optional(types.string, ""),
    related: types.optional(types.string, ""),
    attempt: types.optional(types.string, ""),
    temperature: types.optional(types.number, 0),
    toiletType: types.optional(types.integer, -1),
    toiletPain: types.optional(types.integer, -1),
    colour: types.optional(types.integer, -1),
    dizzy: types.optional(types.integer, -1),
    sleep: types.optional(types.number, 0),
    description: types.optional(types.string, ""),
    attatchmentPaths: types.array(types.model({
      type: types.optional(types.string, "video"),
      uri: types.optional(types.string, "")
    }))
  })
  .views((self) => ({
    getSortedTimes: () => {
      return getSnapshot(self.time).sort((a, b) => a - b);
    }
  }))

/**
 * The Saved Record model.
 * This should be used when fetching existing record from db.
 */
export const SavedRecordModel = RecordModel
  .props({
    id: types.identifierNumber,
    collectionId: types.integer,
  });

type RecordType = Instance<typeof RecordModel>;
export interface Record extends RecordType {};
type RecordSnapshotType = SnapshotOut<typeof RecordModel>;
export interface RecordSnapshot extends RecordSnapshotType {};
type SavedRecordType = Instance<typeof SavedRecordModel>;
export interface SavedRecord extends SavedRecordType {};
type SavedRecordSnapshotType = SnapshotOut<typeof SavedRecordModel>;
export interface SavedRecordSnapshot extends SavedRecordSnapshotType {};
