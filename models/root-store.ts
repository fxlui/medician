import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { HomeScreenStoreModel } from "./home-screen-store";
import { AddFlowStoreModel } from "./add-flow-store";
import { UserModel } from "./user";

/**
 * The Root Store Model.
 * It has separate storage sections for home screen and add record flow.
 */
export const RootStoreModel = types
  .model("RootStore", {
    user: UserModel,
    homeScreenStore: types.optional(HomeScreenStoreModel, {}),
    addFlowStore: types.optional(AddFlowStoreModel, {})
  });

/**
 * The RootStore instance
 */
export interface RootStore extends Instance<typeof RootStoreModel> {};

/**
 * The data of RootStore
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {};