import { types, Instance, SnapshotOut } from "mobx-state-tree";

/**
 * The Appointment model.
 */
export const AppointmentModel = types
  .model("Appointment", {
    name: types.optional(types.string, ""),
    doctor: types.optional(types.string, ""),
    symptomType: types.optional(types.string, ""),
    time: types.array(types.Date),
    alert: types.array(types.Date)
  });

export const SavedAppointmentModel = AppointmentModel
  .props({
    id: types.identifierNumber,
    collectionId: types.integer
  });

type AppointmentType = Instance<typeof AppointmentModel>;
export interface Appointment extends AppointmentType {};
type AppointmentSnapshotType = SnapshotOut<typeof AppointmentModel>;
export interface AppointmentSnapshot extends AppointmentSnapshotType {};
