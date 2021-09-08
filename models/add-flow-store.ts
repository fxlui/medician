import { types, Instance, SnapshotOut } from "mobx-state-tree";
import {
  addRecord,
  addCollection,
  getLastRecordId,
  addRoutineAlert,
  addAppointmentAlerts,
  addRoutine,
  addAppointment,
} from "../database/dbAPI";
import { AppointmentModel } from "./appointment";
import { RoutineModel } from "./routine";
import { RecordModel } from "./record";

import * as Notifications from "expo-notifications";
import moment from "moment";
import { HomeTileTypes } from "../types";

/**
 * The Add Flow Store model.
 * Stores a record that is waiting to be editted and inserted to db.
 * Also stores the an integer presenting the process of editting it
 */
export const AddFlowStoreModel = types
  .model("AddFlowStore", {
    currentNewRecord: types.optional(RecordModel, {}),
    currentNewRoutine: types.optional(RoutineModel, {}),
    currentNewAppointment: types.optional(AppointmentModel, {})
  })
  // Synchronous actions defined here
  .actions((self) => ({
    resetAddFlow: () => {
      self.currentNewRecord = RecordModel.create();
    },
    resetAppointment: () => {
      self.currentNewAppointment = AppointmentModel.create();
    },
    resetRoutine: () => {
      self.currentNewRoutine = RoutineModel.create();
    },
  }))
  // Asynchronous actions defined here
  .actions((self) => ({
    dbInsertRecord: async (userId: number) => {
      try {
        const collectionId = await addCollection(
          userId,
          self.currentNewRecord.type
        );
        await Promise.all(
          self.currentNewRecord
            .getSortedTimes()
            .map((time) =>
              addRecord([
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
                self.currentNewRecord.description,
              ])
            )
        );
        const lastRecordId = await getLastRecordId();
        console.log(lastRecordId);
      } catch (error) {
        console.error("Insert record into database failed: ", error);
      }
    },
    dbInsertAppointment: async (userId: number) => {
      try {
        const collectionId = await addCollection(
          userId,
          self.currentNewAppointment.symptomType
        );
        console.log("collection id:", collectionId);
        const insertedAppointmentID = await addAppointment(
          collectionId,
          self.currentNewAppointment.doctor,
          self.currentNewAppointment.notes
        );
        console.log("insertedAppointmentID", addAppointment);

        const alertIDs = await addAppointmentAlerts(
          insertedAppointmentID,
          self.currentNewAppointment.getSortedTimes(),
          self.currentNewAppointment.alert
        );
        console.log(alertIDs);

        // Registering notifications
        // title: `Appointment for ${self.currentNewAppointment.symptomType}: ${self.currentNewAppointment.doctor}`,
        const notificationPromises = self.currentNewAppointment
          .getSortedTimes()
          .map(async (timestamp, index) => {
            if (timestamp === -1) {
              return;
            }
            return Notifications.scheduleNotificationAsync({
              content: {
                title: `Appointment with ${self.currentNewAppointment.doctor}`,
                subtitle: moment(timestamp).format("lll"),
                body:
                  self.currentNewAppointment.notes.substring(0, 97) +
                  (self.currentNewAppointment.notes.length > 97 ? "..." : ""),
                sound: true,
                badge: 1,
                data: {
                  id: alertIDs[index],
                  name: self.currentNewAppointment.doctor,
                  notes: self.currentNewAppointment.notes,
                  type: HomeTileTypes.Appointment,
                },
              },
              trigger: new Date(self.currentNewAppointment.alert[index]),
            });
          });

        await Promise.all(notificationPromises);
      } catch (error) {
        console.warn(error);
      }
    },
    dbInsertRoutine: async (userId: number) => {
      try {
        console.log("routine times: ", self.currentNewRoutine.getSortedTimes());
        const collectionId = await addCollection(
          userId,
          self.currentNewRoutine.symptomType
        );
        console.log("collection id:", collectionId);
        console.log("notes: ", self.currentNewRoutine.notes);
        const insertedRoutineID = await addRoutine(
          collectionId,
          self.currentNewRoutine.type,
          self.currentNewRoutine.title,
          self.currentNewRoutine.notes
        );
        console.log("insertedRoutineIDs", insertedRoutineID);

        const alertIDs = await addRoutineAlert(
          insertedRoutineID,
          self.currentNewRoutine.getSortedTimes(),
          self.currentNewRoutine.alert
        );

        // Registering notifications
        const notificationPromises = self.currentNewRoutine
          .getSortedTimes()
          .map(async (timestamp, index) => {
            if (timestamp === -1) {
              return;
            }
            return Notifications.scheduleNotificationAsync({
              content: {
                title: `${
                  self.currentNewRoutine.type === 0 ? "Medication" : "Exercise"
                }: ${self.currentNewRoutine.title}`,
                subtitle:
                  self.currentNewRoutine.type === 0
                    ? self.currentNewRoutine.notes
                    : moment(timestamp).format("lll"),
                body:
                  self.currentNewRoutine.type === 0
                    ? moment(timestamp).format("lll")
                    : self.currentNewRoutine.notes.substring(0, 97) +
                      (self.currentNewRoutine.notes.length > 97 ? "..." : ""),
                sound: true,
                badge: 1,
                data: {
                  id: alertIDs[index],
                  name: self.currentNewRoutine.title,
                  notes: self.currentNewRoutine.notes,
                  type:
                    self.currentNewRoutine.type === 0
                      ? HomeTileTypes.Medication
                      : HomeTileTypes.Exercise,
                },
              },
              trigger: new Date(self.currentNewRoutine.alert[index]),
            });
          });

        await Promise.all(notificationPromises);
      } catch (error) {
        console.warn(error);
      }
    },
  }));

type AddFlowStoreType = Instance<typeof AddFlowStoreModel>;
export interface AddFlowStore extends AddFlowStoreType {}
type AddFlowStoreSnapshotType = SnapshotOut<typeof AddFlowStoreModel>;
export interface AddFlowStoreSnapshot extends AddFlowStoreSnapshotType {}
