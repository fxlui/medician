import { types } from "mobx-state-tree";

export const UserModel = types.model("user", {
  id: types.identifierNumber,
  name: types.string,
  gender: types.integer,
  age: types.integer
})