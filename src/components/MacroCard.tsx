import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/global";

type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function MacroCard({
  label,
  value,
  goal,
  color,
}: MacroCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: color }]}>{value}</Text>
      <Text style={styles.goal}>/ {goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    width: "47%",
    borderLeftWidth: 4,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
  goal: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
});
