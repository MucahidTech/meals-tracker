import * as Device from "expo-device";
import { Platform, Text, StyleSheet, ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to Meals-Tracker App!</Text>
      <Text style={globalStyles.sectionTitle}>Device Information</Text>
      <Text>Running on: {Platform.OS}</Text>
      <Text>Device Model: {Device.modelName}</Text>
      <Text>Device Brand: {Device.brand}</Text>
      <Text>OS Version: {Device.osVersion}</Text>
    </ScrollView>
  );
}
