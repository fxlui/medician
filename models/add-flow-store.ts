import {
  types,
  cast,
  Instance,
  SnapshotOut,
  SnapshotOrInstance
} from "mobx-state-tree";
import {
  addCollection,
  addRecord,
  getLastRecordId
} from "../database/dbAPI";
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
    setRecordType: (typeId: string) => {
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
    setRecordTemperature: (temperature: number) => {
      self.currentNewRecord.temperature = temperature;
    },
    setRecordToiletType: (type: number) => {
      self.currentNewRecord.toiletType = type;
    },
    setRecordToiletPain: (pain: number) => {
      self.currentNewRecord.toiletPain = pain;
    },
    setRecordColor: (color: number) => {
      self.currentNewRecord.colour = color;
    },
    setRecordDizzy: (dizzy: number) => {
      self.currentNewRecord.dizzy = dizzy;
    },
    setRecordSleep: (hours: number) => {
      self.currentNewRecord.sleep = hours;
    },
    setRecordDescription: (description: string) => {
      self.currentNewRecord.description = description;
    },
    goBack: () => {
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
    },
    resetAddFlow: () => {
      self.currentNewRecord = RecordModel.create();
    }
  }))
  // Asynchronous actions defined here
  .actions((self) => ({
    dbInsertFlow: async (userId: number) => {
      try {
        const collectionId = await addCollection(userId, self.currentNewRecord.type);
        await Promise.all(
          self.currentNewRecord
          .getSortedTimes()
          .map(
          time => addRecord([
            collectionId,
            time,
            self.currentNewRecord.severity,
            self.currentNewRecord.area,
            self.currentNewRecord.subArea,
            self.currentNewRecord.better,
            self.currentNewRecord.worse,
            self.currentNewRecord.related,
            self.currentNewRecord.attempt,
            self.currentNewRecord.temperature,
            self.currentNewRecord.toiletType,
            self.currentNewRecord.toiletPain,
            self.currentNewRecord.colour,
            self.currentNewRecord.dizzy,
            self.currentNewRecord.sleep,
            self.currentNewRecord.description
          ])
        ));
        const lastRecordId = await getLastRecordId();
        console.log(lastRecordId);
      } catch (error) {
        console.error("Insert record into database failed: ", error)
      }
    }
  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {};
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {};