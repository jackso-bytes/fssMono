import React from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  return (
    <View className="h-16 w-full flex-row items-center justify-start bg-primary pl-2">
      <Image
        source={require("../../assets/fssCircle.png")}
        className="h-12 w-12"
      />
      <Text className="font-bold text-secondary">FSS</Text>
    </View>
  );
};

export default Header;
