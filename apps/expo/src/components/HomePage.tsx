import type { BarcodeScanningResult, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import EcoScoreIcon from "~/components/icons/EcoScoreIcon";
import { api } from "~/utils/api";

export function HomePage() {
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
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const productName =
    data?.WorldFoodFactsProductInfo?.product.product_name ??
    "Sorry, we couldn't find that product";
  const productGrade =
    data?.WorldFoodFactsProductInfo?.product.ecoscore_data?.grade;
  const productTotalCO2: string | number =
    data?.WorldFoodFactsProductInfo?.product.ecoscore_data?.agribalyse
      .co2_total ?? "Sorry, we couldn't find the total CO2";

  const productGradeGood =
    productGrade === "a" || productGrade === "b" || productGrade === "c";

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
      <View className="bg-muted flex flex-row rounded-lg p-4">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <>
      {data && scanned ? (
        <View className="relative h-full flex-col justify-start">
          <Text className="mb-4 text-3xl font-bold">{productName}</Text>
          {productGrade ? (
            <EcoScoreIcon grade={productGrade} />
          ) : (
            <Text>"Sorry we can't seem to find that item "</Text>
          )}
          <Text className="mb-4 mt-4">
            The EcoScore for this product is an {productGrade?.toUpperCase()}{" "}
            {productGradeGood ? "🎉" : "😞"}
          </Text>
          <Text className="mb-4 text-3xl font-bold">Total CO2</Text>
          <Text>
            this product produces{" "}
            <Text className="font-bold">{productTotalCO2} g CO2e</Text>
          </Text>
          <Text className="mb-4">
            That's equivalent to driving a car for 5 miles...
          </Text>
          <Text className="mb-4 text-3xl font-bold">Seasonality </Text>
          <Text>Sorry, we can't tell if this product is in season for you</Text>
          <View className="absolute bottom-0 ml-0 w-full flex-row justify-center">
            <Button
              title={"Tap to Scan Another Product"}
              onPress={() => setScanned(false)}
              color="green"
            />
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-foreground text-center text-5xl font-bold">
            Fresh <Text className="text-primary">Seasonal</Text> Sustainable
          </Text>

          <Text className="text-8 mb-2 mt-4">
            Scan a barcode to get a CO2 estimate for that food product.
          </Text>
          <View className="bg-muted flex flex-col justify-center rounded-lg p-8">
            {scanned && (
              <Button
                title={"Tap to Scan Another Product"}
                onPress={() => setScanned(false)}
              />
            )}
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
                  <Text className="size-24 font-bold text-white">
                    Flip Camera
                  </Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        </View>
      )}
    </>
  );
}

export default HomePage;
