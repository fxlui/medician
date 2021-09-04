import {
  types,
  cast,
  Instance,
  SnapshotOut,
  SnapshotOrInstance
} from "mobx-state-tree";
import { RecordModel } from "./record";

/**
 * The Add Flow Store model.
 * Stores a record that is waiting to be editted and inserted to db.
 * Also stores the an integer presenting the process of editting it
 */
export const AddFlowStoreModel = types
  .model("AddFlowStore", {
    currentNewRecord: types.optional(RecordModel, {}),
    progressLength: types.optional(types.integer, 1),
    currentProgress: types.optional(types.integer, 1),
  })
  // Synchronous actions defined here
  .actions((self) => ({
    setProgressBarLength: (length: number) => {
      self.progressLength = length;
    },
    setRecordTime: (times: SnapshotOrInstance<typeof self.currentNewRecord.time>) => {
      self.currentNewRecord.time = cast(times);
    },
    setRecordArea: (area: string) => {
      self.currentNewRecord.area = area;
    },
    setRecordSeverity: (severity: number) => {
      self.currentNewRecord.severity = severity;
    },
    setRecordDetails: (better: string, worse: string, related: string, attempt: string) => {
      self.currentNewRecord.better = better;
      self.currentNewRecord.worse = worse;
      self.currentNewRecord.related = related;
      self.currentNewRecord.attempt = attempt;
    },
    goBack: () => {
      self.currentProgress -= 1;
    },
    goForward: () => {
      self.currentProgress += 1;
    },
    resetProgress: () => {
      self.currentProgress = 1;
    }
  }))
  // Asynchronous actions defined here
  .actions((self) => ({

  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {};
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {};