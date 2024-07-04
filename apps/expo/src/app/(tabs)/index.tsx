import { Text, View } from "react-native";

import BarCodeScanner from "~/components/BarCodeScanner";

export default function Index() {
  return (
    <View className="h-full w-full bg-background p-4">
      <Text className="pb-2 text-center text-5xl font-bold text-foreground">
        Fresh <Text className="text-primary">Seasonal</Text> Sustainable
      </Text>
      <BarCodeScanner />
    </View>
  );
}
