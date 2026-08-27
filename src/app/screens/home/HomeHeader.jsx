import { Text, View } from "react-native";
import { globalStyles } from "@/styles/global";

export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.date}>{currentDate}</Text>
    </View>
  );
}
