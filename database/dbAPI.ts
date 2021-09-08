import * as SQLite from "expo-sqlite";
import {
  createUserTable,
  createRecordTable,
  createAppointmentTable,
  createRoutineTable,
  createAlertTable,
  createAttachmentTable,
  createCollectionTable,
  insertUser,
  insertCollection,
  getCollectionId,
  insertRecord,
  insertAppointment,
  insertAppointmentAlert,
  insertRoutine,
  insertRoutineAlert,
  getLastInserted,
  getLastInsertedId,
  getRecentAppointments,
  getRecentRoutines,
  getAllCollecitons,
  getAppointmentsByCollection,
  getRecordsbyCollection,
  getRoutinesbyCollection
} from "./queries";
import {
  SQLRoutineReturnType,
  SQLAppointmentsReturnType,
  SQLCollectionReturnType,
  FetchByCollectionResultType
} from "./db.types";
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
        tx.executeSql(`DROP TABLE IF EXISTS appointment`);
        tx.executeSql(`DROP TABLE IF EXISTS treatment`);
        tx.executeSql(`DROP TABLE IF EXISTS routine`);
        tx.executeSql(`DROP TABLE IF EXISTS alert`);
        tx.executeSql(createUserTable);
        tx.executeSql(createRecordTable);
        tx.executeSql(createCollectionTable);
        tx.executeSql(createAppointmentTable);
        tx.executeSql(createRoutineTable);
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


// Modify before submit
/**
 * @param data Array of Record attributes
 * @returns
 */
export async function addRecord(data: DatabaseEntryType) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(insertRecord, data);
        tx.executeSql(
          getLastInserted("entry"),
          undefined,
          (_, { rows }) => {
            console.log("dbAPI.ts: Added Records: ",rows._array);
            resolve();
          }
        );
      },
      (error) => reject(error)
    );
  });
}

/**
 * 
 * @returns Id of the last record added
 */
export async function getLastRecordId() {
  return new Promise<number>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          getLastInsertedId("entry"),
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

export async function addAppointments(collectionId: number, doctor: string, timeArr: number[], notes: string) {
  return new Promise<number[]>((resolve, reject) => {
    const res: number[] = [];
    db.transaction(
      tx => {
        timeArr.forEach(time => {
          tx.executeSql(
            insertAppointment,
            [collectionId, doctor, time, notes],
            () => {},
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
          tx.executeSql(
            getLastInserted("appointment"),
            undefined,
            (_, { rows } ) => {
              console.log("dbAPI.ts: Added Appointments: ",rows._array)
            },
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
          tx.executeSql(
            getLastInsertedId("appointment"),
            undefined,
            (_, { rows } ) => {
              const result = rows._array[0] as { id: number };
              res.push(result.id);
            },
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
        });
      },
      (error) => reject(error),
      () => resolve(res)
    );
  });
}

export async function addAppointmentAlerts(appointmentIDs: number[], alertTimes: number[]) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        appointmentIDs.forEach((appointmentId, index) => {
          tx.executeSql(
            insertAppointmentAlert,
            [appointmentId, alertTimes[index]],
            () => {},
            (_, error) => {
              console.log(error);
              reject(error);
              return true;
            }
          );
          tx.executeSql(
            getLastInserted("alert"),
            undefined,
            (_, { rows }) => console.log("dbAPI.ts: Added Alerts for Appointments: ",rows._array),
            (_, error) => {
              console.log(error);
              reject(error);
              return true;
            }
          );
        });
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}

export async function addRoutines(
  collectionId: number, type: number, title: string, notes: string, timeArr: number[]
) {
  return new Promise<number[]>((resolve, reject) => {
    const res: number[] = [];
    db.transaction(
      tx => {
        timeArr.forEach(time => {
          tx.executeSql(
            insertRoutine,
            [type, collectionId, title, notes, time],
            () => {},
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
          tx.executeSql(
            getLastInserted("routine"),
            undefined,
            (_, { rows } ) => {
              console.log("dbAPI.ts: Added routines: ",rows._array)
            },
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
          tx.executeSql(
            getLastInsertedId("routine"),
            undefined,
            (_, { rows } ) => {
              const result = rows._array[0] as { id: number };
              res.push(result.id);
            },
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          )
        });
      },
      (error) => reject(error),
      () => resolve(res)
    );
  });
}

export async function addRoutineAlert(routineIDs: number[], alertIDs: number[]) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      tx => {
        routineIDs.forEach((routineID, index) => {
          tx.executeSql(
            insertRoutineAlert,
            [routineID, alertIDs[index]],
            () => {},
            (_, error) => {
              console.log(error);
              reject();
              return true;
            }
          );
          tx.executeSql(
            getLastInserted("alert"),
            undefined,
            (_, { rows }) => console.log("dbAPI.ts: Added Alert for routines: ",rows._array),
            (_, error) => {
              console.log(error);
              reject(error);
              return true;
            }
          );
        });
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}

export async function fetchRecentAppointments() {
  return new Promise<SQLAppointmentsReturnType[]>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          getRecentAppointments,
          [Date.now() + 1000 * 60 * 60 * 24 * 14], // Two weeks from now
          (_, { rows }) => resolve(rows._array as SQLAppointmentsReturnType[])
        )
      },
      (error) => reject(error)
    );
  })
}

export async function fetchRecentRoutines() {
  return new Promise<SQLRoutineReturnType[]>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          getRecentRoutines,
          [Date.now() + 1000 * 60 * 60 * 24 * 14], // Two weeks from now
          (_, { rows }) => resolve(rows._array as SQLRoutineReturnType[])
        )
      },
      (error) => reject(error)
    );
  })
}

export async function fetchAllCollections() {
  return new Promise<SQLCollectionReturnType[]>((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          getAllCollecitons,
          undefined,
          (_, { rows }) => resolve(rows._array as SQLCollectionReturnType[])
        );
      },
      (error) => reject(error)
    );
  })
}

export async function fetchCollectionData(collectionId: number) {
  return new Promise<FetchByCollectionResultType>((resolve, reject) => {
    const result: FetchByCollectionResultType = {
      records: [],
      routines: [],
      appointments: []
    };
    db.transaction(
      tx => {
        tx.executeSql(
          getRecordsbyCollection,
          [collectionId],
          (_, { rows }) => result.records = rows._array
        );
        tx.executeSql(
          getRoutinesbyCollection,
          [collectionId],
          (_, { rows }) => result.routines = rows._array
        );
        tx.executeSql(
          getAppointmentsByCollection,
          [collectionId],
          (_, { rows }) => result.appointments = rows._array
        );
      },
      (error) => reject(error),
      () => {
        console.log("dbAPI.ts: fetchCollectionData: ",result);
        resolve(result);
      }
    );
  });
}
