export const createUserTable = `
  CREATE TABLE if not exists "user" (
    "id"	INTEGER NOT NULL UNIQUE,
    "name"	TEXT,
    "gender"	TEXT,
    "dob"	INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
  );
`;

export const createCollectionTable = `
CREATE TABLE if not exists "collection" (
	"id"	INTEGER NOT NULL UNIQUE,
	"userId"	INTEGER NOT NULL,
	"date"	INTEGER NOT NULL,
	"type"	INTEGER NOT NULL,
	FOREIGN KEY("userId") REFERENCES "user"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
`;

export const createRecordTable = `
  CREATE TABLE if not exists "entry" (
    "id"	INTEGER NOT NULL UNIQUE,
    "time"	INTEGER NOT NULL,
    "severity"	INTEGER NOT NULL,
    "area"	TEXT NOT NULL,
    "collectionId"	INTEGER NOT NULL,
    "better"	TEXT,
    "worse"	TEXT,
    "related"	TEXT,
    "attempt"	TEXT,
    "temperature"	REAL,
    "toiletPain"	INTEGER,
    "colour"	INTEGER,
    "dizzy"	INTEGER,
    "sleep"	REAL,
    FOREIGN KEY("collectionId") REFERENCES "collection"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;

export const createAppointmentTable = `
  CREATE TABLE if not exists "appointment" (
    "id"	INTEGER NOT NULL UNIQUE,
    "collectionId"	INTEGER,
    "name"	TEXT,
    "notes"	TEXT,
    "time"	INTEGER NOT NULL,
    "complete"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("collectionId") REFERENCES "collection"("id")
  )
`;

export const createTreatmentTable = `
  CREATE TABLE if not exists "treatment" (
    "id"	INTEGER NOT NULL UNIQUE,
    "collectionId"	INTEGER,
    "type"	INTEGER NOT NULL,
    "title"	TEXT NOT NULL,
    "notes"	TEXT,
    "start"	INTEGER,
    "duration"	INTEGER,
    "complete"	INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY("collectionId") REFERENCES "collection"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
  )
`;

export const createAlertTable = `
  CREATE TABLE if not exists "alert" (
    "id"	INTEGER NOT NULL UNIQUE,
    "appointmentId"	INTEGER,
    "treatmentId"	INTEGER,
    "time"	INTEGER NOT NULL,
    "dismissed"	INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY("appointmentId") REFERENCES "appointment"("id"),
    FOREIGN KEY("treatmentId") REFERENCES "treatment"("id"),
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