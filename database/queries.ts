export const insertUser = `
INSERT OR IGNORE INTO user (id) VALUES (1)
`;

export const insertCollection = `
INSERT OR IGNORE INTO collection(userId, date, type) VALUES (?, ?, ?)
`;

export const insertRecord = `
INSERT INTO entry 
(collectionId, time, severity, area, subArea, better, worse, related, attempt, temperature, toiletType, toiletPain, colour, dizzy, sleep, description)
values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const insertAttachment = `
INSERT INTO attachment
(entryId, type, path) VALUES (?, ?, ?)
`;

export const updateRecord = `
UPDATE entry
SET severity = ?,
    better = ?,
    worse = ?,
    related = ?,
    attempt = ?,
    temperature = ?,
    toiletType = ?,
    toiletPain = ?,
    colour = ?,
    dizzy = ?,
    sleep = ?,
    description = ?
WHERE entry.id = ?
LIMIT 1
`;

export const insertAppointment = `
INSERT INTO appointment
(collectionId, doctor, notes) values (?, ?, ?)
`;

export const insertRoutine = `
INSERT INTO routine
(type, collectionId, title, notes) values (?, ?, ?, ?)
`;

export const insertRoutineAlert = `
INSERT INTO alert
(routineId, eventTime, time) values (?, ?, ?)
`;

export const insertAppointmentAlert = `
INSERT INTO alert
(appointmentId, eventTime, time) values (?, ?, ?)
`;

export const getAllCollecitons = `
SELECT *
FROM collection
`;

export const getRecordsbyCollection = `
SELECT entry.id, entry.area, entry.subArea
FROM entry
WHERE entry.collectionId = ?
`;

export const getSubAreaRecords = `
SELECT *
FROM entry
WHERE entry.collectionId = ?
AND entry.subArea = ?
`;

export const getRoutinesbyCollection = `
SELECT 
  routine.id,
  routine.collectionId,
  routine.type,
  routine.title,
  routine.notes,
  alert.eventTime,
  alert.completed
FROM routine
JOIN alert ON alert.routineId = routine.id
WHERE routine.collectionId = ?
ORDER BY alert.eventTime
`;

export const getAppointmentsByCollection = `
SELECT
  appointment.id,
  appointment.collectionId,
  appointment.doctor,
  appointment.notes,
  alert.completed,
  alert.eventTime
FROM appointment
JOIN alert ON alert.appointmentId = appointment.id
WHERE appointment.collectionId = ?
ORDER BY alert.eventTime
`;

export const getAlertByID = `
SELECT
  alert.id,
  alert.appointmentId,
  alert.routineId,
  alert.time,
  alert.eventTime,
  alert.completed
FROM alert
WHERE alert.id = ?
`;

export const getRoutineByID = `
SELECT
  routine.id,
  routine.collectionId,
  routine.type,
  routine.title,
  routine.notes,
  routine.duration,
  routime.sets,
  routine.reps
FROM routine
WHERE routine.id = ?
`;

export const getAppointmentByID = `
SELECT
  appointment.id,
  appointment.collectionId,
  appointment.doctor,
  appointment.notes
FROM appointment
WHERE appointment.id = ?
`;

// removed the time constraints on this
export const getFutureAppointments = `
SELECT
  appointment.id,
  appointment.collectionId,
  appointment.doctor,
  appointment.notes,
  alert.completed,
  alert.eventTime
FROM appointment
JOIN alert ON alert.appointmentId = appointment.id
WHERE alert.completed = 0
ORDER BY alert.eventTime
`;

export const getRecentRoutines = `
SELECT 
  routine.id,
  routine.collectionId,
  routine.type,
  routine.title,
  routine.notes,
  alert.eventTime,
  alert.completed
FROM routine
JOIN alert ON alert.routineId = routine.id
WHERE alert.eventTime <= ?
AND alert.completed = 0
ORDER BY alert.eventTime
`;

export function getLastInserted(
  table: "entry" | "appointment" | "routine" | "alert" | "attachment"
) {
  return `
  SELECT *
  FROM ${table}
  WHERE ${table}.id = (SELECT MAX(${table}.id) FROM ${table})
  `;
}

export function getLastInsertedId(table: "entry" | "appointment" | "routine") {
  return `
  SELECT ${table}.id
  FROM ${table}
  WHERE ${table}.id = (SELECT MAX(${table}.id) FROM ${table})
  `;
}

export const getCollectionId = `
SELECT collection.id
FROM collection
WHERE collection.userId = ? and collection.type = ?
`;

export const createUserTable = `
CREATE TABLE if not exists "user" (
  "id"	INTEGER NOT NULL UNIQUE,
  PRIMARY KEY("id" AUTOINCREMENT)
)
`;

export const createCollectionTable = `
CREATE TABLE if not exists "collection" (
	"id"	INTEGER NOT NULL UNIQUE,
	"userId"	INTEGER NOT NULL,
	"date"	INTEGER NOT NULL,
	"type"	TEXT NOT NULL UNIQUE,
	FOREIGN KEY("userId") REFERENCES "user"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
)
`;

export const createRecordTable = `
  CREATE TABLE if not exists "entry" (
    "id"	INTEGER NOT NULL UNIQUE,
    "collectionId"	INTEGER NOT NULL,
    "time"	INTEGER NOT NULL,
    "severity"	INTEGER NOT NULL,
    "area"	TEXT NOT NULL,
    "subArea"	TEXT NOT NULL,
    "better"	TEXT,
    "worse"	TEXT,
    "related"	TEXT,
    "attempt"	TEXT,
    "temperature"	REAL,
    "toiletType"	INTEGER,
    "toiletPain"	INTEGER,
    "colour"	INTEGER,
    "dizzy"	INTEGER,
    "sleep"	REAL,
    "description"	TEXT,
    FOREIGN KEY("collectionId") REFERENCES "collection"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;

export const createAppointmentTable = `
  CREATE TABLE if not exists "appointment" (
    "id"	INTEGER NOT NULL UNIQUE,
    "collectionId"	INTEGER,
    "doctor"	TEXT,
    "notes"  TEXT,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("collectionId") REFERENCES "collection"("id")
  )
`;

export const createRoutineTable = `
  CREATE TABLE if not exists "routine" (
    "id"	INTEGER NOT NULL UNIQUE,
    "collectionId"	INTEGER,
    "type"	INTEGER NOT NULL,
    "title" TEXT,
    "notes"	TEXT,
    "duration"  INTEGER,
    "sets" INTEGER,
    "reps" INTEGER,
    FOREIGN KEY("collectionId") REFERENCES "collection"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;

export const createAlertTable = `
  CREATE TABLE if not exists "alert" (
    "id"	INTEGER NOT NULL UNIQUE,
    "appointmentId"	INTEGER,
    "routineId"	INTEGER,
    "time"	INTEGER NOT NULL,
    "eventTime"  INTEGER NOT NULL,
    "completed"	INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY("appointmentId") REFERENCES "appointment"("id"),
    FOREIGN KEY("routineId") REFERENCES "routine"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;

export const createAttachmentTable = `
  CREATE TABLE if not exists "attachment" (
    "id"	INTEGER NOT NULL UNIQUE,
    "entryId"	INTEGER NOT NULL,
    "type"	INTEGER NOT NULL,
    "path"	TEXT NOT NULL,
    FOREIGN KEY("entryId") REFERENCES "entry"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;
