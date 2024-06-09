import type { CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export function BarCodeScanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex flex-row rounded-lg bg-muted p-4">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <CameraView className="flex-1" facing={facing}>
        <View className="m-64 flex-1 flex-row bg-transparent">
          <TouchableOpacity
            className="flex-1 items-center self-end"
            onPress={toggleCameraFacing}
          >
            <Text className="size-24 stroke-white font-bold">Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default BarCodeScanner;
