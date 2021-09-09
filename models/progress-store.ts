import { types } from "mobx-state-tree";

export const ProgressStoreModel = types
  .model("ProgressStore", {
    progressLength: types.optional(types.integer, 1),
    currentProgress: types.optional(types.integer, 1),
  })
  .actions((self) => ({
    setProgressBarLength: (length: number) => {
      self.progressLength = length;
    },
    resetProgress: () => {
      self.currentProgress = 1;
    },
    goBack: () => {
      if (self.currentProgress != 1) {
        self.currentProgress -= 1;
      }
    },
    goForward: () => {
      if (self.currentProgress != self.progressLength) {
        self.currentProgress += 1;
      }
    }
  }));