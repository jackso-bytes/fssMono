import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

const handleOpenURL = () => {
  Linking.openURL("https://world.openfoodfacts.org").catch((err) =>
    console.error("Failed to open URL:https://world.openfoodfacts.org", err),
  );
};

export const About = () => {
  return (
    <View className="h-full w-full p-4">
      <Text className="mb-4 text-3xl font-bold">
        What is Fresh Seasonal Sustainable?1
      </Text>
      <Text>
        FSS is an app designed to help you make eco-friendly food choices by
        providing detailed information on the carbon footprint of various food
        items.
      </Text>
      <Image source={require("../../assets/avo-bowl.png")} className="w-full" />
      <Text className="mb-4 text-3xl font-bold">
        How We Calculate CO2 Estimates
      </Text>
      <Text>
        We use World Open Food Facts to provide CO2 estimates for each food
        item. If you want to read more about how they calculate the estimates
        please use the link below.
      </Text>
      <Image source={require("../../assets/world.jpg")} className="w-full" />
      <TouchableOpacity onPress={handleOpenURL}>
        <Text>Open https://world.openfoodfacts.org</Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;
