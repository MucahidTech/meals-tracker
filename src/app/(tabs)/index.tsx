import * as Device from "expo-device";
import { Platform, Text, ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Meals-Tracker</Text>
      <HomeHeader />
      <Text style={globalStyles.sectionTitle}>Device Information</Text>
      <Text>Running on: {Platform.OS}</Text>
      <Text>Device Model: {Device.modelName}</Text>
      <Text>Device Brand: {Device.brand}</Text>
      <Text>OS Version: {Device.osVersion}</Text>
    </ScrollView>
  );
}
