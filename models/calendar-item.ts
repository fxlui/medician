import { types, Instance, SnapshotOut } from "mobx-state-tree";

/**
 * The Calender Item model.
 * This is the model for calendar timeline items
 */
export const CalendarItemModel = types
  .model("CalendarItem", {
    id: types.identifierNumber,
    collectionId: types.integer,
    type: types.string,
    title: types.string,
    notes: types.optional(types.string, "")
  });

type CalendarItemType = Instance<typeof CalendarItemModel>;
export interface CalendarItem extends CalendarItemType {};
type CalendarItemSnapshotType = SnapshotOut<typeof CalendarItemModel>;
export interface CalendarItemSnapshot extends CalendarItemSnapshotType {};