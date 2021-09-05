import * as SQLite from "expo-sqlite";
import {
  createUserTable,
  createRecordTable,
  createAppointmentTable,
  createTreatmentTable,
  createAlertTable,
  createAttachmentTable,
  createCollectionTable
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
        tx.executeSql(createUserTable);
        tx.executeSql(createRecordTable);
        tx.executeSql(createCollectionTable);
        tx.executeSql(createAppointmentTable);
        tx.executeSql(createTreatmentTable);
        tx.executeSql(createAlertTable);
        tx.executeSql(createAttachmentTable);
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}