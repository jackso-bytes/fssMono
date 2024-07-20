import "@bacons/text-decoder/install";
import "../styles.css";

import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";

import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <TRPCProvider>
      <SafeAreaView className="flex-1">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </TRPCProvider>
  );
}
