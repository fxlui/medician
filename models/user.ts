import { types, SnapshotOut, Instance } from "mobx-state-tree";

/**
 * The User Model
 */
export const UserModel = types
  .model("User", {
    id: types.identifierNumber,
    firstTime: types.maybe(types.boolean)
  })
  .actions(self => ({
    finishTutorial: () => {
      self.firstTime = false;
    },
    startTutorial: () => {
      self.firstTime = true;
    }
  }))

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {};
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {};
