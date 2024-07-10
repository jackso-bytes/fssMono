import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

const handleOpenURL = () => {
  Linking.openURL("https://world.openfoodfacts.org").catch((err) =>
    console.error("Failed to open URL:https://world.openfoodfacts.org", err),
  );
};

export const About = () => {
  return (
    <View className="h-full w-full p-4">
      <Text className="mb-4 text-2xl font-bold">
        What is Fresh Seasonal Sustainable?
      </Text>
      <Text className="text mb-4">
        FSS is an app designed to help you make eco-friendly food choices by
        providing the carbon footprint of various food items.
      </Text>
      <Image
        source={require("../../../assets/world.jpg")}
        className="mb-4 w-full"
      />
      <Text className="mb-4">
        We use World Open Food Facts to provide CO2 estimates for each food
        item.
      </Text>
      <TouchableOpacity onPress={handleOpenURL}>
        <Text className="text-lg text-primary underline">
          Learn more about World Open Food Facts
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;
