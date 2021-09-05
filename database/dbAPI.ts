import * as SQLite from "expo-sqlite";
import {
  createUserTable,
  createRecordTable,
  createAppointmentTable,
  createTreatmentTable,
  createAlertTable,
  createAttachmentTable,
  createCollectionTable,
  deleteRecordTable,
  insertUser,
  insertCollection,
  getCollection
} from "./queries";

function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export async function initDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(deleteRecordTable);
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

export async function addCollection(userId: number, type: string) {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(insertCollection);
        tx.executeSql(
          getCollection,
          [ userId, type ],
          (_, { rows }) => resolve(rows._array[0] as number)
        );
      },
      (error) => reject(error)
    );
  });
}