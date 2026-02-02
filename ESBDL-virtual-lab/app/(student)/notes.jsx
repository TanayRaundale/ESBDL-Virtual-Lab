import { View, Text, FlatList, StyleSheet } from "react-native";


export default function Notes() {

    const notesData = [
  {
    id: "1",
    title: "Introduction to ESBDL",
    description: "Overview of Embedded Systems and Deep Learning concepts.",
  },
  {
    id: "2",
    title: "Microcontrollers Basics",
    description: "Architecture, memory, and peripherals.",
  },
  {
    id: "3",
    title: "Sensors & Actuators",
    description: "Types of sensors and their working principles.",
  },
  {
    id: "4",
    title: "Neural Networks Fundamentals",
    description: "Perceptron, activation functions, and training.",
  },
];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📘 Notes</Text>

      <FlatList
        data={notesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  desc: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
});
