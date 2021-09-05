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
    setRecordType: (typeId: number) => {
      self.currentNewRecord.type = typeId;
    },
    setRecordTime: (times: SnapshotOrInstance<typeof self.currentNewRecord.time>) => {
      self.currentNewRecord.time = cast(times);
    },
    setRecordAreas: (area: string, subArea: string) => {
      self.currentNewRecord.area = area;
      self.currentNewRecord.subArea = subArea;
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
    setRecordAttachments: (attachments: SnapshotOrInstance<
      typeof self.currentNewRecord.attatchmentPaths
    >) => {
      self.currentNewRecord.attatchmentPaths = cast(attachments);
    },
    goBack: () => {
      console.log(self.currentProgress)
      if (self.currentProgress != 1) {
        self.currentProgress -= 1;
      }
    },
    goForward: () => {
      if (self.currentProgress != self.progressLength) {
        self.currentProgress += 1;
      }
    },
    resetProgress: () => {
      self.currentProgress = 1;
    }
  }))
  // Asynchronous actions defined here
  .actions((self) => ({
    dbInsertFlow: () => {
      console.log(self.currentNewRecord.type);
      console.log(self.currentNewRecord.area);
      console.log(self.currentNewRecord.subArea);
      console.log(self.currentNewRecord.severity);
      console.log(self.currentNewRecord.better);
      console.log(self.currentNewRecord.worse);
      console.log(self.currentNewRecord.related);
      console.log(self.currentNewRecord.attempt);
      console.log(self.currentNewRecord.attatchmentPaths)
    }
  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {};
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {};