import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import HomeScreen from "./(tabs)/index";

export default function Index() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <Link href="/meals" style={{ fontSize: 18, color: "#007bff" }}>
        Go to Meals
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
