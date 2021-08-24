import { types, Instance, SnapshotOut } from "mobx-state-tree";

/**
 * The Appointment model.
 */
export const AppointmentModel = types
  .model("Appointment", {
    id: types.identifierNumber,
    name: types.string,
    notes: types.optional(types.string, ""),
    time: types.Date,
    alert: types.integer
  });

type AppointmentType = Instance<typeof AppointmentModel>;
export interface Appointment extends AppointmentType {};
type AppointmentSnapshotType = SnapshotOut<typeof AppointmentModel>;
export interface AppointmentSnapshot extends AppointmentSnapshotType {};
