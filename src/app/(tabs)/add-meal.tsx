import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { colors, globalStyles } from "@/styles/global";

export default function AddMealScreen() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    calories?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; calories?: string } = {};

    // Validate meal name
    if (!name.trim()) {
      newErrors.name = "Meal name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Meal name must be at least 2 characters";
    }

    // Validate calories
    if (!calories) {
      newErrors.calories = "Calories are required";
    } else {
      const calValue = Number(calories);
      if (isNaN(calValue) || calValue <= 0) {
        newErrors.calories = "Calories must be a positive number";
      } else if (calValue > 9999) {
        newErrors.calories = "Calories must be less than 10,000";
      }
    }

    const validateMacro = (
      value: string,
      label: string,
    ): string | undefined => {
      if (value) {
        const num = Number(value);
        if (isNaN(num) || num < 0) {
          return `${label} must be a positive number`;
        }
        if (num > 999) {
          return `${label} must be less than 1000`;
        }
      }
      return undefined;
    };

    const proteinError = validateMacro(protein, "Protein");
    const carbsError = validateMacro(carbs, "Carbs");
    const fatError = validateMacro(fat, "Fat");

    if (proteinError) {
      Alert.alert("Validation Error", proteinError);
      return false;
    }
    if (carbsError) {
      Alert.alert("Validation Error", carbsError);
      return false;
    }
    if (fatError) {
      Alert.alert("Validation Error", fatError);
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMeal = () => {
    if (!validateForm()) {
      return;
    }

    const mealData = {
      name: name.trim(),
      calories: Number(calories),
      protein: protein ? Number(protein) : 0,
      carbs: carbs ? Number(carbs) : 0,
      fat: fat ? Number(fat) : 0,
    };

    console.log("Meal data:", mealData);

    Alert.alert("Success", "Meal added successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Reset form
          setName("");
          setCalories("");
          setProtein("");
          setCarbs("");
          setFat("");
          setErrors({});
        },
      },
    ]);
  };

  const isFormValid = name.trim() && calories && Number(calories) > 0;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meal</Text>

      <View>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Meal name"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View>
        <TextInput
          style={[styles.input, errors.calories && styles.inputError]}
          placeholder="Calories"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={calories}
          onChangeText={(text) => {
            setCalories(text);
            if (errors.calories) {
              setErrors((prev) => ({ ...prev, calories: undefined }));
            }
          }}
        />
        {errors.calories && (
          <Text style={styles.errorText}>{errors.calories}</Text>
        )}
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Protein (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Carbs (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Fat (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleAddMeal}
        disabled={!isFormValid}
      >
        <Text
          style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}
        >
          Add Meal
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#ff6b6b",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  rowInput: {
    flex: 1,
    minWidth: 0,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
});
