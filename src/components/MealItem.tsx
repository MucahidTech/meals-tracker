import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { deleteMeal } from "@/storage/meals";
import { colors } from "@/styles/global";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) {
  const handleEdit = () => {
    router.push({
      pathname: "/edit-meal",
      params: {
        id,
        name,
        calories: calories.toString(),
        protein: protein.toString(),
        carbs: carbs.toString(),
        fat: fat.toString(),
      },
    });
  };

  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.macros}>
            <Text style={styles.calories}>{calories} cal</Text>
            {" • "}
            <Text style={styles.protein}>{protein}g P</Text>
            {" • "}
            <Text style={styles.carbs}>{carbs}g C</Text>
            {" • "}
            <Text style={styles.fat}>{fat}g F</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Ionicons name="pencil" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  calories: { color: colors.calories },
  protein: { color: colors.protein },
  carbs: { color: colors.carbs },
  fat: { color: colors.fat },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
  },
});
