import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ADD THIS

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Arabic-Bold': require('../assets/fonts/CustomFont-Bold.ttf'), 
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; 
  }

  return (
    // WRAP YOUR STACK IN THIS:
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="login-selection" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="register" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="new-password" options={{ headerShown: false, animation: 'fade' }} />
        
        {/* Register the new Drawer group */}
        <Stack.Screen name="(drawer)" options={{ headerShown: false, animation: 'fade' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}