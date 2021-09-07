import {
  types,
  Instance,
  SnapshotOut,
} from "mobx-state-tree";
import {
  addCollection,
  addRecord,
  getLastRecordId,
  addAppointments,
  addAppointmentAlerts
} from "../database/dbAPI";
import { AppointmentModel } from "./appointment";
import { RecordModel } from "./record";

/**
 * The Add Flow Store model.
 * Stores a record that is waiting to be editted and inserted to db.
 * Also stores the an integer presenting the process of editting it
 */
export const AddFlowStoreModel = types
  .model("AddFlowStore", {
    currentNewRecord: types.optional(RecordModel, {}),
    currentNewAppointment: types.optional(AppointmentModel, {}), 
    progressLength: types.optional(types.integer, 1),
    currentProgress: types.optional(types.integer, 1),
  })
  // Synchronous actions defined here
  .actions((self) => ({
    setProgressBarLength: (length: number) => {
      self.progressLength = length;
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
    },
    resetAppointment: () => {
      self.currentNewAppointment = AppointmentModel.create();
    }
  }))
  // Asynchronous actions defined here
  .actions((self) => ({
    dbInsertRecord: async (userId: number) => {
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
    },
    dbInsertAppointment: async (userId: number) => {
      try {
        const collectionId = await addCollection(
          userId, self.currentNewAppointment.symptomType
        );
        console.log("collection id:", collectionId);
        const insertedAppointmentIDs = await addAppointments(
          collectionId,
          self.currentNewAppointment.doctor,
          self.currentNewAppointment.getSortedTimes()
        )
        console.log("insertedAppointmentIDs", insertedAppointmentIDs);
        await addAppointmentAlerts(
          insertedAppointmentIDs,
          self.currentNewAppointment.alert
        );
      } catch(error) {
        console.warn(error);
      }
    }
  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {};
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {};