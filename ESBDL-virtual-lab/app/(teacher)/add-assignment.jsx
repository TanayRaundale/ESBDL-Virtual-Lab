<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

export default function AddAssignment() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Assignment</Text>

      {/* Assignment Title */}
      <Text style={styles.label}>Assignment Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter assignment title"
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter assignment instructions"
        multiline
      />

      {/* Subject / Lab */}
      <Text style={styles.label}>Subject / Lab</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ESDM Virtual Lab"
      />

      {/* Due Date */}
      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="DD / MM / YYYY"
      />

      {/* Total Marks */}
      <Text style={styles.label}>Total Marks</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 20"
        keyboardType="numeric"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Assignment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fafc",
    flexGrow: 1
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  label: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
    marginTop: 12
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },

  textArea: {
    height: 100,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
=======
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

export default function AddAssignment() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Assignment</Text>

      {/* Assignment Title */}
      <Text style={styles.label}>Assignment Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter assignment title"
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter assignment instructions"
        multiline
      />

      {/* Subject / Lab */}
      <Text style={styles.label}>Subject / Lab</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ESDM Virtual Lab"
      />

      {/* Due Date */}
      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="DD / MM / YYYY"
      />

      {/* Total Marks */}
      <Text style={styles.label}>Total Marks</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 20"
        keyboardType="numeric"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Assignment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fafc",
    flexGrow: 1
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  label: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
    marginTop: 12
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },

  textArea: {
    height: 100,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
