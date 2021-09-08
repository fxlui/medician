import {
  cast,
  types,
  Instance,
  SnapshotOut,
  getSnapshot,
  SnapshotOrInstance,
  flow,
} from "mobx-state-tree";
import { SavedRoutineModel } from "./routine";
import { SavedAppointmentModel } from "./appointment";
import {
  SQLAlertReturnType,
  SQLAppointmentsReturnType,
  SQLRoutineReturnType,
} from "../database/db.types";
import { fetchAlert, fetchAppointment, fetchRoutine } from "../database/dbAPI";
import { HomeTileTypes } from "../types";

/**
 * The Alert model.
 */
export const AlertModel = types
  .model("Alert", {
    id: types.maybe(types.number),
    appointment: types.maybe(SavedAppointmentModel),
    routine: types.maybe(SavedRoutineModel),
    time: types.maybe(types.Date),
    eventTime: types.maybe(types.Date),
    completed: types.optional(types.boolean, false),
  })
  .views((self) => ({
    getId: () => self.id,
    getType: () =>
      self.appointment
        ? HomeTileTypes.Appointment
        : self.routine?.type === 0
        ? HomeTileTypes.Medication
        : HomeTileTypes.Exercise,
    getAppointment: () => getSnapshot(self.appointment!),
    getRoutine: () => getSnapshot(self.routine!),
    getTime: () => self.time,
    getEventTime: () => self.eventTime,
    getCompleted: () => self.completed,
    getName: () =>
      self.appointment ? self.appointment.doctor : self.routine?.title,
    getNotes: () =>
      self.appointment ? self.appointment.notes : self.routine?.notes,
  }))
  .actions((self) => ({
    setAlertWithID: (id: number) => {
      self.id = id;
      // read from db here...
      const fetchAlertAsync = flow(function* () {
        try {
          const results: SQLAlertReturnType[] = yield fetchAlert(id);
          console.log("FETCHED: " + results);
          self.time = new Date(results[0].time);
          self.eventTime = new Date(results[0].eventTime);
          self.completed = results[0].completed ? true : false;
          // fetching appointments
          if (results[0].appointmentId) {
            const appointmentResults: SQLAppointmentsReturnType[] =
              yield fetchAppointment(results[0].appointmentId);
            console.log("FETCHED1: " + appointmentResults);
            self.appointment = SavedAppointmentModel.create({
              id: appointmentResults[0].id,
              collectionId: appointmentResults[0].collectionId,
              complete: results[0].completed,
              doctor: appointmentResults[0].doctor,
              time: new Date(appointmentResults[0].eventTime),
              notes: appointmentResults[0].notes,
            });
            // fetching routines
          } else if (results[0].routineId) {
            const routineResults: SQLRoutineReturnType[] = yield fetchRoutine(
              results[0].routineId
            );
            console.log("FETCHED2: " + routineResults);
            self.routine = SavedRoutineModel.create({
              id: routineResults[0].id,
              collectionId: routineResults[0].collectionId,
              type: routineResults[0].type,
              title: routineResults[0].title,
              notes: routineResults[0].notes,
              time: new Date(routineResults[0].eventTime),
              complete: results[0].completed,
            });
          }
        } catch (error) {
          console.warn(error);
        }
      });
      fetchAlertAsync();
    },
    setRoutine: (routine: SnapshotOrInstance<typeof SavedRoutineModel>) => {
      self.routine = cast(routine);
    },
    setAppointment: (
      appointment: SnapshotOrInstance<typeof SavedAppointmentModel>
    ) => {
      self.appointment = cast(appointment);
    },
    setTime: (time: Date) => {
      self.time = time;
    },
    setEventTime: (eventTime: Date) => {
      self.eventTime = eventTime;
    },
    setCompleted: (completed: boolean) => {
      self.completed = completed;
    },
  }));

type AlertType = Instance<typeof AlertModel>;
export interface Alert extends AlertType {}
type AlertSnapshotType = SnapshotOut<typeof AlertModel>;
export interface AlertSnapshot extends AlertSnapshotType {}
