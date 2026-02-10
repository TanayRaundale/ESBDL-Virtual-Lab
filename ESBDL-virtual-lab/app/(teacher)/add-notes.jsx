import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

export default function AddNotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  /* ================= PICK FILE ================= */
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  /* ================= SUBMIT ================= */
  const uploadNotes = () => {
    if (!title || !subject || !file) {
      Alert.alert("Missing Fields", "Please fill all required fields");
      return;
    }

    Alert.alert("Success", "Notes ready to be uploaded");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Upload Notes</Text>

      {/* Title */}
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter notes title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Brief description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Subject */}
      <Text style={styles.label}>Subject / Lab *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ESDM Virtual Lab"
        value={subject}
        onChangeText={setSubject}
      />

      {/* File Picker */}
      <Text style={styles.label}>Upload File *</Text>
      <TouchableOpacity style={styles.fileBtn} onPress={pickFile}>
        <Ionicons name="cloud-upload-outline" size={22} color="#2563eb" />
        <Text style={styles.fileBtnText}>
          {file ? file.name : "Choose File"}
        </Text>
      </TouchableOpacity>

      {file && (
        <Text style={styles.fileInfo}>
          Selected: {file.name}
        </Text>
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={uploadNotes}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.submitText}>Publish Notes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  label: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "600"
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 15
  },

  textArea: {
    height: 90,
    textAlignVertical: "top"
  },

  fileBtn: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  fileBtnText: {
    color: "#2563eb",
    fontWeight: "600"
  },

  fileInfo: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 13
  },

  submitBtn: {
    marginTop: 30,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
