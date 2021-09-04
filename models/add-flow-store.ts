import { types, cast, Instance, SnapshotOut } from "mobx-state-tree";
import { RecordModel } from "./record";

/**
 * The Add Flow Store model.
 * Stores a record that is waiting to be editted and inserted to db.
 * Also stores the an integer presenting the process of editting it
 */
export const AddFlowStoreModel = types
  .model("AddFlowStore", {
    currentNewRecord: types.optional(RecordModel, {}),
    progress: types.optional(types.integer, 0)
  })
  // Synchronous actions defined here
  .actions((self) => ({
    setProgressBarLength: (length: number) => {
      self.progress = length;
    },
    setRecordArea: (area: string) => {
      self.currentNewRecord.area = area;
    },
    setRecordSeverity: (severity: number) => {
      self.currentNewRecord.severity = severity;
    },
  }))
  // Asynchronous actions defined here
  .actions((self) => ({

  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {};
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {};