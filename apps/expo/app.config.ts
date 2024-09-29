import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Fresh Seasonal Sustainable",
  slug: "expo",
  scheme: "expo",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/fss.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/fss.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "fss.bundle.co2",
    supportsTablet: true,
  },
  android: {
    package: "fss.bundle.co2",
    adaptiveIcon: {
      foregroundImage: "./assets/fss.png",
      backgroundColor: "#ffffff",
    },
  },
  extra: {
    eas: {
      projectId: "3ccae792-fb6b-43aa-a3b7-0229b71670ad",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission: `Allow ${process.env.CUSTOMER_FACING_PRODUCT_NAME} to access your camera`,
        microphonePermission: `Allow ${process.env.CUSTOMER_FACING_PRODUCT_NAME} to access your microphone`,
        recordAudioAndroid: true,
      },
    ],
  ],
});
