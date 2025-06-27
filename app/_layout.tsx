import { Stack } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Text as RNText, ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // Apply Poppins as the default font globally
  useEffect(() => {
    if (fontsLoaded) {
      const Text: any = RNText;
      if (Text.defaultProps == null) Text.defaultProps = {};
      Text.defaultProps.style = [{ fontFamily: 'Poppins_400Regular' }, Text.defaultProps.style];
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="StudentLogIn" />
      <Stack.Screen name="StudentSignUp" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="Main" />
      <Stack.Screen name="Mzari" />
      <Stack.Screen name="ReceiveMoney" />
      <Stack.Screen name="TapToPay" />
      <Stack.Screen name="HouseArea" />
      <Stack.Screen name="HouseDetail" />
      <Stack.Screen name="LandLordLogIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="LandlordMain" />
      <Stack.Screen name="HouseRegistration" />
      <Stack.Screen name="LandLordSignUp" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="AboutUs" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Privacy" />
    </Stack>
  );
}
