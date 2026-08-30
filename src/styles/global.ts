import { StyleSheet } from "react-native";

export const colors = {
  // Background colors
  background: "#0f0e17",
  backgroundSecondary: "#1a1932",

  // Surface colors
  surface: "#1e1d3a",
  surfaceLight: "#2a294a",
  surfaceDark: "#15142a",

  // Primary colors
  primary: "#00d4ff",
  primaryDark: "#0099cc",
  primaryLight: "#66e5ff",

  // Text colors
  text: "#fffffe",
  textSecondary: "#a7a9be",
  textMuted: "#6b6d8a",

  // Meals colors
  calories: "#ff6b6b",
  protein: "#4ecdc4",
  carbs: "#ffd93d",
  fat: "#6bcb77",

  // State colors
  success: "#00d26a",
  error: "#ff6b6b",
  warning: "#ffd93d",
  info: "#4fc3f7",

  // Seperators color
  border: "#2a294a",
  divider: "#252545",

  // Shadows colors
  shadow: "rgba(0, 0, 0, 0.3)",
  shadowLight: "rgba(0, 212, 255, 0.1)",

  // Special colors
  alert: "#ff5252",
  highlight: "#00d4ff",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextPrimary: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
});
