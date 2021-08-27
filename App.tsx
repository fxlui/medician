import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStoreProvider, setupRootStore } from './models/root-store-provider';
import { RootStore } from './models/root-store';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import SafeView from './components/SafeView';

export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const store = await setupRootStore();
      setRootStore(store);
    })();
  }, []);

  if (!isLoadingComplete || !rootStore) {
    return null;
  } else {
    return (
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </RootStoreProvider>
    );
  }
}
