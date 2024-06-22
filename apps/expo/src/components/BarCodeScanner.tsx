import type { BarcodeScanningResult, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { api } from "~/utils/api";

export function BarCodeScanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  const { isError, data, error, refetch } =
    api.getEstimate.getEstimate.useQuery(
      { barCodeUniqueId: scannedData ?? "" },
      {
        enabled: !!scannedData,
      },
    );

  const handleBarCodeScanned = async (barCodeObject: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(barCodeObject.data);
    // manually call backend when we have data;
    await refetch();
    console.log(data);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // break cases

  if (isError) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex flex-row rounded-lg bg-muted p-4">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
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
