import {
  cast,
  types,
  Instance,
  SnapshotOut,
  getSnapshot,
  SnapshotOrInstance
} from "mobx-state-tree";

/**
 * The Record model.
 * This should be used when creating a new record.
 */
export const RecordModel = types
  .model("Record", {
    type: types.optional(types.string, ""),
    time: types.optional(types.array(types.Date), []),
    severity: types.optional(types.integer, 0),
    area: types.optional(types.string, "other"),
    subArea: types.optional(types.string, "other"),
    better: types.optional(types.string, ""),
    worse: types.optional(types.string, ""),
    related: types.optional(types.string, ""),
    attempt: types.optional(types.string, ""),
    temperature: types.optional(types.number, 0),
    toiletType: types.optional(types.integer, -1),
    toiletPain: types.optional(types.integer, -1),
    colour: types.optional(types.integer, -1),
    dizzy: types.optional(types.integer, -1),
    sleep: types.optional(types.number, 0),
    description: types.optional(types.string, ""),
    attatchmentPaths: types.array(types.model({
      type: types.optional(types.string, "video"),
      uri: types.optional(types.string, "")
    }))
  })
  .views((self) => ({
    getSortedTimes: () => {
      return [...getSnapshot(self.time)].sort((a, b) => a - b);
    }
  }))
  .actions((self) => ({
    setRecordType: (typeId: string) => {
      self.type = typeId;
    },
    setRecordTime: (times: SnapshotOrInstance<typeof self.time>) => {
      self.time = cast(times);
    },
    setRecordAreas: (area: string, subArea: string) => {
      self.area = area;
      self.subArea = subArea;
    },
    setRecordSeverity: (severity: number) => {
      self.severity = severity;
    },
    setRecordDetails: (better: string, worse: string, related: string, attempt: string) => {
      self.better = better;
      self.worse = worse;
      self.related = related;
      self.attempt = attempt;
    },
    setRecordAttachments: (attachments: SnapshotOrInstance<
      typeof self.attatchmentPaths
    >) => {
      self.attatchmentPaths = cast(attachments);
    },
    setRecordTemperature: (temperature: number) => {
      self.temperature = temperature;
    },
    setRecordToiletType: (type: number) => {
      self.toiletType = type;
    },
    setRecordToiletPain: (pain: number) => {
      self.toiletPain = pain;
    },
    setRecordColor: (color: number) => {
      self.colour = color;
    },
    setRecordDizzy: (dizzy: number) => {
      self.dizzy = dizzy;
    },
    setRecordSleep: (hours: number) => {
      self.sleep = hours;
    },
    setRecordDescription: (description: string) => {
      self.description = description;
    }
  }));

  export const SavedRecordModel = types
    .model("SavedRecordModel", {
      id: types.identifierNumber,
      collectionId: types.integer,
      time: types.Date,
      severity: types.optional(types.integer, 0),
      area: types.optional(types.string, "other"),
      subArea: types.optional(types.string, "other"),
      better: types.optional(types.string, ""),
      worse: types.optional(types.string, ""),
      related: types.optional(types.string, ""),
      attempt: types.optional(types.string, ""),
      temperature: types.optional(types.number, 0),
      toiletType: types.optional(types.integer, -1),
      toiletPain: types.optional(types.integer, -1),
      colour: types.optional(types.integer, -1),
      dizzy: types.optional(types.integer, -1),
      sleep: types.optional(types.number, 0),
      description: types.optional(types.string, "")
    })
    .views(self => ({
      getDetails: () => {
        return {
          better: self.better,
          worse: self.worse,
          related: self.related,
          attempt: self.attempt
        }
      }
    }))
    .actions(self => ({
      updateSeverity: (severity: number) => {
        self.severity = severity;
      },
      updateDetails: (better: string, worse: string, related: string, attempt: string) => {
        self.better = better;
        self.worse = worse;
        self.related = related;
        self.attempt = attempt;
      },
      updateRecordTemperature: (temperature: number) => {
        self.temperature = temperature;
      },
      updateRecordToiletType: (type: number) => {
        self.toiletType = type;
      },
      updateRecordToiletPain: (pain: number) => {
        self.toiletPain = pain;
      },
      updateRecordColor: (color: number) => {
        self.colour = color;
      },
      updateRecordDizzy: (dizzy: number) => {
        self.dizzy = dizzy;
      },
      updateRecordSleep: (hours: number) => {
        self.sleep = hours;
      },
      updateRecordDescription: (description: string) => {
        self.description = description;
      },
    }));

type RecordType = Instance<typeof RecordModel>;
export interface Record extends RecordType {};
type RecordSnapshotType = SnapshotOut<typeof RecordModel>;
export interface RecordSnapshot extends RecordSnapshotType {};
type SavedRecordType = Instance<typeof SavedRecordModel>;
export interface SavedRecord extends SavedRecordType {};
type SavedRecordSnapshotType = SnapshotOut<typeof SavedRecordModel>;
export interface SavedRecordSnapshot extends SavedRecordSnapshotType {};
