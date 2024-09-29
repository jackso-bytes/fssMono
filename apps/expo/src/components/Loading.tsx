import React from "react";
import { Text, View } from "react-native";
import { Loader2 } from "lucide-react-native";

export const Loading = () => {
  return (
    <View className="align-center m-auto flex justify-center">
      <Text>Loading...</Text>
      <Loader2 />
    </View>
  );
};

export default Loading;
