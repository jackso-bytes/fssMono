import type { BarcodeScanningResult, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export function BarCodeScanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

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
    <>
      <View>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      <View className="flex flex-row justify-center rounded-lg bg-muted p-8">
        <CameraView
          className="flex-1"
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View className="m-44 flex-1 flex-row bg-transparent ">
            <TouchableOpacity
              className="flex-1 items-center self-center"
              onPress={toggleCameraFacing}
            >
              <Text className="size-24 font-bold text-white">Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </>
  );
}

export default BarCodeScanner;
