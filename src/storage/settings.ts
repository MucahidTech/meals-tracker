import AsyncStorage from "@react-native-async-storage/async-storage";

export type DailyGoals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Settings = {
  dailyGoals: DailyGoals;
  isRemindersEnabled: boolean;
};

const SETTINGS_KEY = "settings";

const defaultSettings: Settings = {
  dailyGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  },
  isRemindersEnabled: false,
};

// ✅ إضافة نظام المستمعات للتغييرات
type SettingsChangeListener = (settings: Settings) => void;
const listeners: SettingsChangeListener[] = [];

export const addSettingsChangeListener = (listener: SettingsChangeListener) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

const notifyListeners = async () => {
  const settings = await getSettings();
  listeners.forEach((listener) => listener(settings));
};

export const getSettings = async (): Promise<Settings> => {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    await saveSettings(defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error("Error loading settings:", error);
    return defaultSettings;
  }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    await notifyListeners(); // ✅ إعلام المستمعين بالتغيير
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};

export const updateDailyGoals = async (
  goals: Partial<DailyGoals>,
): Promise<Settings> => {
  const settings = await getSettings();
  const updatedSettings = {
    ...settings,
    dailyGoals: {
      ...settings.dailyGoals,
      ...goals,
    },
  };
  await saveSettings(updatedSettings);
  return updatedSettings;
};
