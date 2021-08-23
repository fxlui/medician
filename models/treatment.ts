import { types } from "mobx-state-tree";

/**
 * The Treatment model.
 * Need to convert start time from Timestamp to Date when fetching from database.
 */
export const TreatmentModel = types
  .model("treatment", {
    id: types.identifierNumber,
    type: types.integer,
    title: types.string,
    notes: types.optional(types.string, ""),
    start: types.Date,
    duration: types.integer
  })