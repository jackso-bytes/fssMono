import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { BarCodeScanner } from "../components/BarCodeScanner";

export default function Index() {
  return (
    <SafeAreaView className=" bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Fresh <Text className="text-primary">Seasonal</Text> Sustainable
        </Text>
        <Text className="text-8 px-2 pb-2 pt-8">
          Scan a barcode to get a CO2 estimate for that food
        </Text>
        <BarCodeScanner />
      </View>
    </SafeAreaView>
  );
}
