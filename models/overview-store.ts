import {
  types,
  cast,
  flow,
  getSnapshot,
  Instance,
  SnapshotOut,
} from "mobx-state-tree";
import { SavedRoutineModel } from "./routine";
import { fetchAllCollections, fetchCollectionData } from "../database/dbAPI";
import {
  SQLCollectionReturnType,
  FetchByCollectionResultType,
} from "../database/db.types";
import { SavedAppointmentModel } from "./appointment";

const SimpleRecordModel = types.model("SimpleRecordModel", {
  id: types.identifierNumber,
  area: types.string,
  subArea: types.string,
});

export const OverviewStoreModel = types
  .model("OverviewStore", {
    collections: types.array(
      types.model({
        id: types.identifierNumber,
        type: types.string,
      })
    ),
    selectedCollectionId: types.maybe(types.number),
    currentCollectionRecords: types.array(SimpleRecordModel),
    currentCollectionRoutines: types.array(SavedRoutineModel),
    currentCollectionAppointments: types.array(SavedAppointmentModel),
  })
  .views((self) => ({
    getCollectionTypesSnapshot: () => {
      return [...getSnapshot(self.collections)].map((item) => item.type);
    },
    getCurrentRecordsSnapshot: () => {
      return [...getSnapshot(self.currentCollectionRecords)];
    },
    getCurrentSubAreas: () => {
      return [...getSnapshot(self.currentCollectionRecords)].map(item => item.subArea);
    },
    getCurrentRoutinesSnapshot: () => {
      return [...getSnapshot(self.currentCollectionRoutines)];
    },
    getCurrentAppointmentsSnapshot: () => {
      return [...getSnapshot(self.currentCollectionAppointments)];
    },
    getCurrentSelectedCollection: () => {
      return [...getSnapshot(self.collections)].find(
        (item) => item.id === self.selectedCollectionId
      );
    },
  }))
  .actions((self) => ({
    setSelectedCollection: (symptomType: string) => {
      self.selectedCollectionId = self.collections.find(
        (item) => item.type === symptomType
      )?.id;
    },
  }))
  // Asynchronous actions
  .actions((self) => {
    const fetchAllCollectionsAsync = flow(function* () {
      try {
        const result: SQLCollectionReturnType[] = yield fetchAllCollections();
        self.collections = cast(
          result.map((item) => ({ id: item.id, type: item.type }))
        );
        if (!self.selectedCollectionId && self.collections.length != 0) {
          self.selectedCollectionId = self.collections[0].id;
        }
      } catch (error) {
        console.warn(error);
      }
    });

    const fetchCollectionDataAsync = flow(function* () {
      if (self.selectedCollectionId) {
        try {
          const result: FetchByCollectionResultType = yield fetchCollectionData(
            self.selectedCollectionId
          );
          self.currentCollectionRecords = cast(result.records);
          self.currentCollectionRoutines = cast(
            result.routines.map((item) =>
              SavedRoutineModel.create({
                id: item.id,
                collectionId: item.collectionId,
                title: item.title,
                complete: item.completed,
                notes: item.notes,
                time: new Date(item.eventTime),
                type: item.type,
              })
            )
          );
          self.currentCollectionAppointments = cast(
            result.appointments.map((item) =>
              SavedAppointmentModel.create({
                id: item.id,
                collectionId: item.collectionId,
                time: new Date(item.eventTime),
                doctor: item.doctor,
                complete: item.completed,
                notes: item.notes,
              })
            )
          );
        } catch (error) {
          console.warn(error);
        }
      } else {
        console.error("symptom type not found in overview store");
      }
    });

    return { fetchAllCollectionsAsync, fetchCollectionDataAsync };
  });

type SimpleRecordType = Instance<typeof SimpleRecordModel>;
export interface SimpleRecord extends SimpleRecordType {}
type SimpleRecordSnapshotType = SnapshotOut<typeof SimpleRecordModel>;
export interface SimpleRecordSnapshot extends SimpleRecordSnapshotType {}
