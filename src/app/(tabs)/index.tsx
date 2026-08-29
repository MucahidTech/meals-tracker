import { useCallback, useState } from "react";
import { Text, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { globalStyles } from "@/styles/global";
import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import { getMeals, Meal } from "@/storage/meals";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log("Loaded meals:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Meals-Tracker</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals meals={meals} />
    </ScrollView>
  );
}
