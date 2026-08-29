import { Text, ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";
import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Meals-Tracker</Text>
      <HomeHeader />
      <MacroGrid />
    </ScrollView>
  );
}
