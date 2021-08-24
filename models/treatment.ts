import { types, Instance, SnapshotOut } from "mobx-state-tree";

/**
 * The Treatment model.
 */
export const TreatmentModel = types
  .model("Treatment", {
    id: types.identifierNumber,
    type: types.integer,
    title: types.string,
    notes: types.optional(types.string, ""),
    start: types.Date,
    duration: types.integer
  });

type TreatmentType = Instance<typeof TreatmentModel>;
export interface Treatment extends TreatmentType {};
type TreatmentSnapshotType = SnapshotOut<typeof TreatmentModel>;
export interface TreatmentSnapshot extends TreatmentSnapshotType {};
