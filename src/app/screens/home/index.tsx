import * as Device from "expo-device";
import { Platform, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to Meals-Tracker App!</Text>
      <Text>Running on: {Platform.OS}</Text>
      <Text>Device Model: {Device.modelName}</Text>
      <Text>Device Brand: {Device.brand}</Text>
      <Text>OS Version: {Device.osVersion}</Text>
    </View>
  );
}
