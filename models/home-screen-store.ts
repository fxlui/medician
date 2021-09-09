import {
  types,
  cast,
  flow,
  SnapshotOrInstance,
  getSnapshot,
  Instance,
  SnapshotOut,
} from "mobx-state-tree";
import {
  SQLAlertIDsType,
  SQLAlertReturnType,
  SQLAppointmentsReturnType,
  SQLRoutineReturnType,
} from "../database/db.types";
import {
  fetchAlert,
  fetchAppointment,
  fetchFutureAppointments,
  fetchIDsFromAlert,
  fetchRecentRoutines,
  fetchRoutine,
  setAlertCompletedValue,
  setAlertEventTime,
  setAlertTime,
  updateAlertSystemID,
  updateAlertTime,
  updateAppointmentOrRoutine,
} from "../database/dbAPI";
import { SavedRoutineModel } from "./routine";
import { SavedAppointmentModel } from "./appointment";
import * as Notifications from "expo-notifications";
import { HomeTileTypes } from "../types";
import moment from "moment";

/**
 * The Home Screen Store model.
 * Stores arrays of medication, exercises and appointments.
 */
export const HomeScreenStoreModel = types
  .model("HomeScreenStore", {
    recentRoutines: types.optional(types.array(SavedRoutineModel), []),
    recentAppointments: types.optional(types.array(SavedAppointmentModel), []),
  })
  // Calls to get derived data
  .views((self) => ({
    getRecentMedications: () => {
      return getSnapshot(self.recentRoutines).filter((item) => item.type === 0);
    },
    getRecentExercises: () => {
      return getSnapshot(self.recentRoutines).filter((item) => item.type === 1);
    },
    getRecentAppointments: () => {
      return getSnapshot(self.recentAppointments);
    },
  }))
  // Synchronous actions defined here
  .actions((self) => ({
    setRoutines: (routine: SnapshotOrInstance<typeof self.recentRoutines>) => {
      self.recentRoutines = cast(routine);
    },
    setAppointments: (
      appointments: SnapshotOrInstance<typeof self.recentAppointments>
    ) => {
      self.recentAppointments = cast(appointments);
    },
  }))
  // Asynchronous actions defined here
  .actions((self) => {
    const fetchAppointmentsAsync = flow(function* () {
      try {
        const results: SQLAppointmentsReturnType[] =
          yield fetchFutureAppointments();
        self.recentAppointments = cast(
          results.map((item) =>
            SavedAppointmentModel.create({
              id: item.id,
              collectionId: item.collectionId,
              complete: item.completed,
              doctor: item.doctor,
              time: new Date(item.eventTime),
              notes: item.notes,
              alertId: item.alertId,
            })
          )
        );
      } catch (error) {
        console.warn(error);
      }
    });

    const fetchRoutinesAsync = flow(function* () {
      try {
        const results: SQLRoutineReturnType[] = yield fetchRecentRoutines();
        self.recentRoutines = cast(
          results.map((item) =>
            SavedRoutineModel.create({
              id: item.id,
              collectionId: item.collectionId,
              title: item.title,
              notes: item.notes,
              type: item.type,
              time: new Date(item.eventTime),
              complete: item.completed,
              alertId: item.alertId,
            })
          )
        );
      } catch (error) {
        console.warn(error);
      }
    });

    const updateAlertTitleNotes = flow(function* (
      alertID: number,
      title: string | undefined,
      notes: string | undefined
    ) {
      try {
        const result: SQLAlertReturnType = yield fetchAlert(alertID);
        const appointmentId = result.appointmentId;
        const routineId = result.routineId;
        if (appointmentId) {
          yield updateAppointmentOrRoutine(
            appointmentId,
            "appointment",
            title,
            notes
          );
          const appointment: SQLAppointmentsReturnType = yield fetchAppointment(
            appointmentId
          );
          if (!appointment) return;
          // first cancel old notification
          yield Notifications.cancelScheduledNotificationAsync(result.systemId);
          const newSystemID = yield Notifications.scheduleNotificationAsync({
            content: {
              title: `Appointment with ${appointment.doctor}`,
              subtitle: moment(result.eventTime).format("lll"),
              body:
                appointment.notes.substring(0, 97) +
                (appointment.notes.length > 97 ? "..." : ""),
              sound: true,
              badge: 1,
              data: {
                id: alertID,
                name: appointment.doctor,
                notes: appointment.notes,
                type: HomeTileTypes.Appointment,
              },
            },
            trigger: result.time,
          });
          // then update the systemID
          if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
        } else if (routineId) {
          yield updateAppointmentOrRoutine(routineId, "routine", title, notes);
          const routine: SQLRoutineReturnType = yield fetchRoutine(routineId);
          if (!routine) return;
          // first cancel old notification
          yield Notifications.cancelScheduledNotificationAsync(result.systemId);
          const newSystemID = yield Notifications.scheduleNotificationAsync({
            content: {
              title: `${routine.type === 0 ? "Medication" : "Exercise"}: ${
                routine.title
              }`,
              subtitle:
                routine.type === 0
                  ? routine.notes
                  : moment(result.eventTime).format("lll"),
              body:
                routine.type === 0
                  ? moment(result.eventTime).format("lll")
                  : routine.notes.substring(0, 97) +
                    (routine.notes.length > 97 ? "..." : ""),
              sound: true,
              badge: 1,
              data: {
                id: alertID,
                name: routine.title,
                notes: routine.notes,
                type:
                  routine.type === 0
                    ? HomeTileTypes.Medication
                    : HomeTileTypes.Exercise,
              },
            },
            trigger: result.time,
          });
          // then update the systemID
          if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
        }
      } catch (error) {
        console.warn(error);
      }
    });

    const setAlertCompleted = flow(function* (
      alertID: number,
      completed: boolean
    ) {
      try {
        yield setAlertCompletedValue(alertID, completed ? 1 : 0);
      } catch (error) {
        console.warn(error);
      }
    });

    const getAlertDetails = flow(function* (alertID: number) {
      try {
        const results: SQLAlertReturnType = yield fetchAlert(alertID);
        return results;
      } catch (error) {
        console.warn(error);
      }
    });

    const getAppointmentDetailsFromAlert = flow(function* (
      alert: SQLAlertReturnType
    ) {
      try {
        const appointment: SQLAppointmentsReturnType = yield fetchAppointment(
          alert.appointmentId
        );
        if (!appointment) {
          console.error(
            "Could not find appointment with id: " + alert.appointmentId
          );
        }
        return appointment;
      } catch (error) {
        console.warn(error);
      }
    });

    const getRoutineDetailsFromAlert = flow(function* (
      alert: SQLAlertReturnType
    ) {
      try {
        const routine: SQLRoutineReturnType = yield fetchRoutine(
          alert.routineId
        );
        if (!routine) {
          console.error("Could not find routine with id: " + alert.routineId);
        }
        return routine;
      } catch (error) {
        console.warn(error);
      }
    });

    const updateAlertTimes = flow(function* (
      alertID: number,
      eventTime: Date,
      alertTime: Date
    ) {
      if (!eventTime || !alertTime) {
        console.log("oh no");
        return;
      }
      try {
        const result: SQLAlertReturnType = yield fetchAlert(alertID);
        const appointmentId = result.appointmentId;
        const routineId = result.routineId;
        //console.log("yay1");
        if (appointmentId) {
          //console.log("yay2");
          if (eventTime && eventTime.getTime() >= 1) {
            //console.log("setting eventTime ", eventTime, " For ", alertID);
            yield setAlertEventTime(alertID, eventTime.getTime());
          }
          if (alertTime) {
            //console.log("setting alertTime ", alertTime, " For ", alertID);
            yield setAlertTime(alertID, alertTime.getTime());
            const appointment: SQLAppointmentsReturnType =
              yield fetchAppointment(appointmentId);
            if (!appointment) return;
            // first cancel old notification
            yield Notifications.cancelScheduledNotificationAsync(
              result.systemId
            );
            const newSystemID = yield Notifications.scheduleNotificationAsync({
              content: {
                title: `Appointment with ${appointment.doctor}`,
                subtitle: moment(eventTime).format("lll"),
                body:
                  appointment.notes.substring(0, 97) +
                  (appointment.notes.length > 97 ? "..." : ""),
                sound: true,
                badge: 1,
                data: {
                  id: alertID,
                  name: appointment.doctor,
                  notes: appointment.notes,
                  type: HomeTileTypes.Appointment,
                },
              },
              trigger: alertTime,
            });
            // then update the systemID
            if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
          }
          //console.log("yay3");
        } else if (routineId) {
          if (eventTime && eventTime.getTime() >= 1) {
            //console.log("setting eventTime ", eventTime, " For ", alertID);
            yield setAlertEventTime(alertID, eventTime.getTime());
          }
          if (alertTime) {
            //console.log("setting alertTime ", alertTime, " For ", alertID);
            yield setAlertTime(alertID, alertTime.getTime());
            const routine: SQLRoutineReturnType = yield fetchRoutine(routineId);
            if (!routine) return;
            //console.log(routine);
            //const result: SQLAlertReturnType = yield fetchAlert(alertID);
            //console.log(result);
            // first cancel old notification
            yield Notifications.cancelScheduledNotificationAsync(
              result.systemId
            );
            const newSystemID = yield Notifications.scheduleNotificationAsync({
              content: {
                title: `${routine.type === 0 ? "Medication" : "Exercise"}: ${
                  routine.title
                }`,
                subtitle:
                  routine.type === 0
                    ? routine.notes
                    : moment(eventTime).format("lll"),
                body:
                  routine.type === 0
                    ? moment(eventTime).format("lll")
                    : routine.notes.substring(0, 97) +
                      (routine.notes.length > 97 ? "..." : ""),
                sound: true,
                badge: 1,
                data: {
                  id: alertID,
                  name: routine.title,
                  notes: routine.notes,
                  type:
                    routine.type === 0
                      ? HomeTileTypes.Medication
                      : HomeTileTypes.Exercise,
                },
              },
              trigger: alertTime,
            });
            // then update the systemID
            if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    });

    const snoozeAlert = flow(function* (
      alertID: number,
      diffInMinutes: number
    ) {
      try {
        //console.log("SNOOZING");
        const alert: SQLAlertReturnType = yield fetchAlert(alertID);
        //console.log(alert);

        const newTime =
          alert.time <= 1
            ? new Date(new Date().getTime() + diffInMinutes * 60000)
            : new Date(alert.time + diffInMinutes * 60000);
        //console.log(diffInMinutes);
        //console.log(newTime.toString());
        const oldSystemID = alert.systemId;
        //console.log(oldSystemID);

        if (alert.appointmentId) {
          const appointment: SQLAppointmentsReturnType = yield fetchAppointment(
            alert.appointmentId
          );
          if (!appointment) {
            console.error(
              "Could not find appointment with id: " + alert.appointmentId
            );
          }
          const newSystemID = yield Notifications.scheduleNotificationAsync({
            content: {
              title: `Appointment with ${appointment.doctor}`,
              subtitle: moment(alert.eventTime).format("lll"),
              body:
                appointment.notes.substring(0, 97) +
                (appointment.notes.length > 97 ? "..." : ""),
              sound: true,
              badge: 1,
              data: {
                id: alertID,
                name: appointment.doctor,
                notes: appointment.notes,
                type: HomeTileTypes.Appointment,
              },
            },
            trigger: newTime,
          });
          // first update the systemID
          if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
          // then update alert time
          yield updateAlertTime(alertID, newTime.getTime());
        } else if (alert.routineId) {
          const routine: SQLRoutineReturnType = yield fetchRoutine(
            alert.routineId
          );
          if (!routine) {
            console.error("Could not find routine with id: " + alert.routineId);
          }
          const newSystemID = yield Notifications.scheduleNotificationAsync({
            content: {
              title: `${routine.type === 0 ? "Medication" : "Exercise"}: ${
                routine.title
              }`,
              subtitle:
                routine.type === 0
                  ? routine.notes
                  : moment(newTime).format("lll"),
              body:
                routine.type === 0
                  ? moment(newTime).format("lll")
                  : routine.notes.substring(0, 97) +
                    (routine.notes.length > 97 ? "..." : ""),
              sound: true,
              badge: 1,
              data: {
                id: alertID,
                name: routine.title,
                notes: routine.notes,
                type:
                  routine.type === 0
                    ? HomeTileTypes.Medication
                    : HomeTileTypes.Exercise,
              },
            },
            trigger: newTime,
          });
          // first update the systemID
          if (newSystemID) yield updateAlertSystemID(alertID, newSystemID);
          // then update alert time
          yield updateAlertTime(alertID, newTime.getTime());
        }
        yield Notifications.cancelScheduledNotificationAsync(oldSystemID);
      } catch (error) {
        console.warn(error);
      }
    });

    return {
      fetchAppointmentsAsync,
      fetchRoutinesAsync,
      updateAlertTitleNotes,
      setAlertCompleted,
      snoozeAlert,
      getAlertDetails,
      getAppointmentDetailsFromAlert,
      getRoutineDetailsFromAlert,
      updateAlertTimes,
    };
  });

type HomeScreenStoreType = Instance<typeof HomeScreenStoreModel>;
export interface HomeScreenStore extends HomeScreenStoreType {}
type HomeScreenStoreSnapshotType = SnapshotOut<typeof HomeScreenStoreModel>;
export interface HomeScreenStoreSnapshot extends HomeScreenStoreSnapshotType {}
