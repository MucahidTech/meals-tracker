import AsyncStorage from "@react-native-async-storage/async-storage";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

const MEALS_KEY = "meals";

type MealChangeListener = (meals: Meal[]) => void;
const listeners: MealChangeListener[] = [];

export const addMealChangeListener = (listener: MealChangeListener) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

const notifyListeners = async () => {
  const meals = await getMeals();
  listeners.forEach((listener) => listener(meals));
};

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  await notifyListeners();
  return newMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
  await notifyListeners();
};

export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
  await notifyListeners();
};

export const updateMeal = async (
  id: string,
  updatedMeal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const meals = await getMeals();
  const index = meals.findIndex((meal) => meal.id === id);

  if (index === -1) {
    throw new Error("Meal not found");
  }

  const meal: Meal = {
    ...updatedMeal,
    id,
    createdAt: meals[index].createdAt,
  };

  meals[index] = meal;
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(meals));
  await notifyListeners();
  return meal;
};
