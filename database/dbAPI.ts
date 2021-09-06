import * as SQLite from "expo-sqlite";
import {
  createUserTable,
  createRecordTable,
  createAppointmentTable,
  createTreatmentTable,
  createAlertTable,
  createAttachmentTable,
  createCollectionTable,
  insertUser,
  insertCollection,
  getCollectionId,
  insertRecord,
  getLastInsertedRecordId,
  getLastInsertedRecord
} from "./queries";
import { DatabaseEntryType } from "../types";

function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export async function initDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(`DROP TABLE IF EXISTS entry`);
        tx.executeSql(`DROP TABLE IF EXISTS collection`);
        tx.executeSql(createUserTable);
        tx.executeSql(createRecordTable);
        tx.executeSql(createCollectionTable);
        tx.executeSql(createAppointmentTable);
        tx.executeSql(createTreatmentTable);
        tx.executeSql(createAlertTable);
        tx.executeSql(createAttachmentTable);
        tx.executeSql(insertUser, undefined, () => {}, (error) => {
          reject(error);
          return true;
        })
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}

/**
 * 
 * @param userId User's id
 * @param type Symptom type
 * @returns Id of existing/added colleciton
 */
export async function addCollection(userId: number, type: string) {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          insertCollection,
          [userId, (new Date()).getTime(), type]
        );
        tx.executeSql(
          getCollectionId,
          [ userId, type ],
          (_, { rows }) => {
            const result = rows._array[0] as { id: number };
            resolve(result.id);
          }
        );
      },
      (error) => reject(error)
    );
  });
}

/**
 * @param data Array of Record attributes
 * @returns Id of the last record added
 */
export async function addRecord(data: DatabaseEntryType) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(insertRecord, data);
        tx.executeSql(
          getLastInsertedRecord,
          undefined,
          (_, { rows }) => {
            console.log(rows._array);
            resolve();
          }
        );
      },
      (error) => reject(error)
    );
  });
}

export async function getLastRecordId() {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          getLastInsertedRecordId,
          undefined,
          (_, { rows }) => {
            const result = rows._array[0] as { id: number };
            resolve(result.id);
          }
        );
      },
      (error) => reject(error)
    );
  });
}