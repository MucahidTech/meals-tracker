import { DailyGoals, getSettings, saveSettings } from "@/storage/settings";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [goals, setGoals] = useState<DailyGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const settings = await getSettings();
      setGoals(settings.dailyGoals);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings]),
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await saveSettings({ dailyGoals: goals, isRemindersEnabled: false });
      Alert.alert("Success", "Goals updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGoals({
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 65,
    });
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Settings</Text>
      <Text style={styles.subtitle}>Daily Nutrition Goals</Text>

      <View style={styles.card}>
        <View style={styles.goalItem}>
          <View style={styles.goalHeader}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#ff6b6b20" }]}
            >
              <Ionicons name="flame" size={24} color={colors.calories} />
            </View>
            <Text style={styles.goalLabel}>Calories</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="2000"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={goals.calories.toString()}
            onChangeText={(text) =>
              setGoals({ ...goals, calories: Number(text) || 0 })
            }
          />
        </View>

        <View style={styles.goalItem}>
          <View style={styles.goalHeader}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#4ecdc420" }]}
            >
              <Ionicons name="barbell" size={24} color={colors.protein} />
            </View>
            <Text style={styles.goalLabel}>Protein (g)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="150"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={goals.protein.toString()}
            onChangeText={(text) =>
              setGoals({ ...goals, protein: Number(text) || 0 })
            }
          />
        </View>

        <View style={styles.goalItem}>
          <View style={styles.goalHeader}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#ffd93d20" }]}
            >
              <Ionicons name="pizza" size={24} color={colors.carbs} />
            </View>
            <Text style={styles.goalLabel}>Carbs (g)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="250"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={goals.carbs.toString()}
            onChangeText={(text) =>
              setGoals({ ...goals, carbs: Number(text) || 0 })
            }
          />
        </View>

        <View style={styles.goalItem}>
          <View style={styles.goalHeader}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#6bcb7720" }]}
            >
              <Ionicons name="water" size={24} color={colors.fat} />
            </View>
            <Text style={styles.goalLabel}>Fat (g)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="65"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={goals.fat.toString()}
            onChangeText={(text) =>
              setGoals({ ...goals, fat: Number(text) || 0 })
            }
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Saving..." : "Save Goals"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalItem: {
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  resetButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  resetButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
