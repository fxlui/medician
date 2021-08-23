import { types } from "mobx-state-tree";

/**
 * The Appointment model.
 * Need to convert time from Timestamp to Date when fetching from database.
 */
export const AppointmentModel = types
  .model("appointment", {
    id: types.identifierNumber,
    name: types.string,
    notes: types.optional(types.string, ""),
    time: types.Date,
    alert: types.integer
  })