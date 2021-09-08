import {
  types,
  cast,
  flow,
  getSnapshot,
} from "mobx-state-tree";
import { SavedRoutineModel } from "./routine";
import { fetchAllCollections, fetchCollectionData } from "../database/dbAPI";
import { SQLCollectionReturnType, FetchByCollectionResultType } from "../database/db.types";
import { SavedAppointmentModel } from "./appointment";

export const OverviewStoreModel = types
  .model("OverviewStore", {
    collections: types.array(types.model({
      id: types.identifierNumber,
      type: types.string
    })),
    currentCollectionRecords: types.array(types.model({
      id: types.identifierNumber,
      area: types.string,
      subArea: types.string
    })),
    currentCollectionRoutines: types.array(SavedRoutineModel),
    currentCollectionAppointments: types.array(SavedAppointmentModel)
  })
  .views(self => ({
    getCollectionTypesSnapshot: () => {
      return [...getSnapshot(self.collections)].map(item => item.type);
    },
    getCurrentRecordsSnapshot: () => {
      return [...getSnapshot(self.currentCollectionRecords)];
    },
    getCurrentRoutinesSnapshot: () => {
      return [...getSnapshot(self.currentCollectionRoutines)];
    },
    getCurrentAppointmentsSnapshot: () => {
      return [...getSnapshot(self.currentCollectionAppointments)];
    }
  }))
  .actions(self => ({
    checkCurrentData: () => {
      console.log(self.getCurrentRecordsSnapshot());
      console.log(self.getCurrentRoutinesSnapshot());
      console.log(self.getCurrentAppointmentsSnapshot());
    }
  }))
  // Asynchronous actions
  .actions(self => {
    const fetchAllCollectionsAsync = flow(function*() {
      try {
        const result: SQLCollectionReturnType[] = yield fetchAllCollections();
        self.collections = cast(
          result.map(item => ({ id: item.id, type: item.type }))
        );
      } catch (error) {
        console.warn(error);
      }
    });

    const fetchCollectionDataAsync = flow(function*(symptomType: string) {
      const id = self.collections.find(item => item.type === symptomType)?.id;
      if (id) {
        try {
          const result: FetchByCollectionResultType = yield fetchCollectionData(id);
          self.currentCollectionRecords = cast(result.records);
          self.currentCollectionRoutines = cast(
            result.routines.map(
              item => SavedRoutineModel.create({
                id: item.id,
                collectionId: item.collectionId,
                title: item.title,
                complete: item.complete,
                notes: item.notes,
                time: new Date(item.time),
                type: item.type
              })
            )
          );
          self.currentCollectionAppointments = cast(
            result.appointments.map(
              item => SavedAppointmentModel.create({
                id: item.id,
                collectionId: item.collectionId,
                time: new Date(item.time),
                doctor: item.doctor,
                complete: item.complete,
                notes: item.notes
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