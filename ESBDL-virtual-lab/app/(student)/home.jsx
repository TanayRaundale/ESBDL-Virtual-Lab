import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>📘 View Notes</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>📝 Take Quiz</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>📊 My Results</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
