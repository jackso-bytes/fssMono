import { View } from "react-native";

import BarCodeScanner from "~/components/BarCodeScanner";

export default function Index() {
  return (
    <View className="h-full w-full bg-background p-4">
      <BarCodeScanner />
    </View>
  );
}
