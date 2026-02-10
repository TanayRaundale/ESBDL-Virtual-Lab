import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function ActivateQuiz() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activate Quiz</Text>

      {/* Quiz Info */}
      <View style={styles.card}>
        <Text style={styles.label}>Quiz Name</Text>
        <Text style={styles.value}>Unit Test – ESDM</Text>

        <Text style={styles.label}>Target Batch</Text>
        <Text style={styles.value}>SE 11</Text>

        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>30 Minutes</Text>
      </View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.status,
            { color: isActive ? "#16a34a" : "#dc2626" }
          ]}
        >
          {isActive ? "Active" : "Inactive"}
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isActive ? "#dc2626" : "#2563eb" }
        ]}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.buttonText}>
          {isActive ? "Deactivate Quiz" : "Activate Quiz"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 3
  },

  label: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 10
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a"
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20
  },

  statusLabel: {
    fontSize: 16,
    marginRight: 6
  },

  status: {
    fontSize: 16,
    fontWeight: "bold"
  },

  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
