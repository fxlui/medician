import {
  types,
  cast,
  flow,
  getSnapshot,
  Instance,
  SnapshotOut,
} from "mobx-state-tree";
import { fetchSubAreaRecords } from "../database/dbAPI";
import { SQLRecordReturnType } from "../database/db.types";
import { SavedRecordModel } from "./record";

export const EditFlowStoreModel = types
  .model("EditFlowStore", {
    timelineRecords: types.array(SavedRecordModel)
  })
  .views(self => ({
    getTimelineRecordsSnapshot: () => {
      return getSnapshot(self.timelineRecords);
    }
  }))
  .actions(self => {
    const fetchTimelineRecordsAsync = flow(function*(collectionId: number, subArea: string) {
      try {
        const result :SQLRecordReturnType[] = yield fetchSubAreaRecords(collectionId, subArea);
        self.timelineRecords = cast(result.map(
          item => SavedRecordModel.create({
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
            toiletType: item.toiletType
          }))
        );
      } catch (error) {
        console.warn(error);
      }
    });

    return { fetchTimelineRecordsAsync };
  })