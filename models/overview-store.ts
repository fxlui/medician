import {
  types,
  cast,
  Instance,
  SnapshotOut,
  SnapshotOrInstance
} from "mobx-state-tree";

export const OverviewStoreModel = types
  .model("OverviewStore", {
    selectedSymptom: types.optional(types.integer, 0)
  })
  .actions((self) => ({
    setSelectedSymptom: (id: number) => {
      self.selectedSymptom = id;
    }
  }));