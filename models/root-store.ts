import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { HomeScreenStoreModel } from "./home-screen-store";
import { AddFlowStoreModel } from "./add-flow-store";
import { OverviewStoreModel } from "./overview-store";
import { AlertModel } from "./alert";
import { UserModel } from "./user";

/**
 * The Root Store Model.
 * It has separate storage sections for home screen and add record flow.
 */
export const RootStoreModel = types.model("RootStore", {
  user: types.optional(UserModel, { id: 1 }),
  homeScreenStore: types.optional(HomeScreenStoreModel, {}),
  addFlowStore: types.optional(AddFlowStoreModel, {}),
  overviewStore: types.optional(OverviewStoreModel, {}),
  alert: types.optional(AlertModel, { id: -1 }),
});

/**
 * The RootStore instance
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of RootStore
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
