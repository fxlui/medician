import { types, SnapshotOut, Instance } from "mobx-state-tree";

/**
 * The User Model
 */
export const UserModel = types
  .model("User", {
    id: types.identifierNumber,
    name: types.string,
    gender: types.string,
    age: types.integer
  });

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {};
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {};
