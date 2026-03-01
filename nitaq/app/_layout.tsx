import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent the splash screen from hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Make sure this path and filename exactly match your file
    'Arabic-Bold': require('../assets/fonts/CustomFont-Bold.ttf'), 
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Return null while the font is loading
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false, animation: 'fade' }} 
      />
      <Stack.Screen 
        name="onboarding" 
        options={{ headerShown: false, animation: 'fade' }} 
      />
      <Stack.Screen name="login-selection" options={{ headerShown: false, animation: 'fade' }} />
    </Stack>
  );
}