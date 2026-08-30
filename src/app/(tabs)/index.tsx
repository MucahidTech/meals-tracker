import { useCallback, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { globalStyles } from "@/styles/global";
import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import ShareButton from "@/components/ShareButton";
import CopyButton from "@/components/CopyButton";
import ReminderToggle from "@/components/ReminderToggle";
import { getMeals, Meal } from "@/storage/meals";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getMeals();
      setMeals(data);
    } catch (error) {
      console.error("Failed to load meals:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [loadMeals]),
  );

  const handleMealChange = useCallback(async () => {
    await loadMeals();
  }, [loadMeals]);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Meals-Tracker</Text>
        <ShareButton meals={meals} />
      </View>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <CopyButton meals={meals} />
      <ReminderToggle />
      <RecentMeals
        meals={meals}
        onDelete={loadMeals}
        onRefresh={handleMealChange}
      />
    </ScrollView>
  );
}
