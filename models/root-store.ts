import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { HomeScreenStoreModel } from "./home-screen-store";
import { AddFlowStoreModel } from "./add-flow-store";
import { OverviewStoreModel } from "./overview-store";
import { EditFlowStoreModel } from "./edit-flow-store";
import { ProgressStoreModel } from "./progress-store";
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
  editFlowStore: types.optional(EditFlowStoreModel, {}),
  progressStore: types.optional(ProgressStoreModel, {})
});

/**
 * The RootStore instance
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of RootStore
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
