import { createContext, useContext } from "react";
import { RootStore, RootStoreModel } from "./root-store";

const RootStoreContext = createContext<RootStore>({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => useContext(RootStoreContext);

/**
 * Create RootStore, and fetch user and homescreen items from database
 */
export const setupRootStore = async () => {
  const rootStore = RootStoreModel.create({} as RootStore);
  await rootStore.homeScreenStore.fetchAll();
  return rootStore;
}