import {
  types,
  cast,
  flow,
  getSnapshot,
  Instance,
  SnapshotOut,
} from "mobx-state-tree";
import { fetchSubAreaRecords, updateSingleRecord } from "../database/dbAPI";
import { SQLRecordReturnType } from "../database/db.types";
import { SavedRecordModel } from "./record";

export const EditFlowStoreModel = types
  .model("EditFlowStore", {
    timelineRecords: types.array(SavedRecordModel),
    currentSymptomType: types.optional(types.string, ""),
    currentEditingRecord: types.maybe(SavedRecordModel),
  })
  .views((self) => ({
    getTimelineRecordsSnapshot: () => {
      return getSnapshot(self.timelineRecords);
    },
  }))
  .actions((self) => ({
    setCurrentEditingRecord: (recordId: number, symptomType: string) => {
      self.currentSymptomType = symptomType;
      const record = self.timelineRecords.find((item) => item.id === recordId);
      if (record) {
        self.currentEditingRecord = cast(getSnapshot(record));
      } else {
        console.error("Error setCurrentEditingRecord, recordId not found");
      }
    },
  }))
  .actions((self) => {
    const fetchTimelineRecordsAsync = flow(function* (
      collectionId: number,
      subArea: string
    ) {
      try {
        const result: SQLRecordReturnType[] = yield fetchSubAreaRecords(
          collectionId,
          subArea
        );
        self.timelineRecords = cast(
          result.map((item) =>
            SavedRecordModel.create({
              id: item.id,
              collectionId: item.collectionId,
              area: item.area,
              subArea: item.subArea,
              severity: item.severity,
              better: item.better,
              worse: item.worse,
              attempt: item.attempt,
              related: item.related,
              colour: item.colour,
              time: new Date(item.time),
              description: item.description,
              dizzy: item.dizzy,
              sleep: item.sleep,
              temperature: item.temperature,
              toiletPain: item.toiletPain,
              toiletType: item.toiletType,
            })
          )
        );
      } catch (error) {
        console.warn(error);
      }
    });

    const updateRecordAsync = flow(function* () {
      try {
        if (self.currentEditingRecord) {
          yield updateSingleRecord({
            id: self.currentEditingRecord.id,
            severity: self.currentEditingRecord.severity,
            better: self.currentEditingRecord.better,
            worse: self.currentEditingRecord.worse,
            related: self.currentEditingRecord.related,
            attempt: self.currentEditingRecord.attempt,
            colour: self.currentEditingRecord.colour,
            description: self.currentEditingRecord.description,
            dizzy: self.currentEditingRecord.dizzy,
            temperature: self.currentEditingRecord.temperature,
            sleep: self.currentEditingRecord.sleep,
            toiletPain: self.currentEditingRecord.toiletPain,
            toiletType: self.currentEditingRecord.toiletType,
          });
        } else {
          console.error("current editting record doesn't exist!");
        }
      } catch (error) {
        console.error(error);
      }
    });

    return { fetchTimelineRecordsAsync, updateRecordAsync };
  });
