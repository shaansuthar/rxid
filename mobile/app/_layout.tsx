import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

export default function RootLayout() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SpaceGrotesk-Regular': require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
        'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
        'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
      }} />
      <StatusBar style="light" />
    </>
  );
}