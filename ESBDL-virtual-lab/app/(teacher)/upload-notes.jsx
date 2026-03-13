import { useState } from "react";
import API from "../../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function UploadNotes() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [unitTitle, setUnitTitle] = useState("");
  const [classes, setClasses] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const classOptions = ["SY9", "SY10", "SY11"];

  /* ================= PICK FILE ================= */
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ]
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  /* ================= TOGGLE CLASS ================= */
  const toggleClass = (cls) => {
    setClasses((prev) =>
      prev.includes(cls)
        ? prev.filter((c) => c !== cls)
        : [...prev, cls]
    );
  };

  /* ================= SUBMIT ================= */
  const uploadNotes = async () => {
    if (!title || !unit || !unitTitle || classes.length === 0 || !file) {
      Alert.alert("Missing Fields", "Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("unit", unit);
      formData.append("unitTitle", unitTitle);
      formData.append("classes", JSON.stringify(classes));

      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream"
      });

      const token = await AsyncStorage.getItem("token");

      await API.post("/notes/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      Alert.alert("Success", "Notes uploaded successfully");

      router.back(); // 🔥 go back to notes list

    } catch (error) {
      Alert.alert("Error", "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Upload Notes</Text>

      {/* TITLE */}
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter notes title"
        value={title}
        onChangeText={setTitle}
      />

      {/* UNIT */}
      <Text style={styles.label}>Unit *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter unit number (e.g. 1)"
        keyboardType="numeric"
        value={unit}
        onChangeText={setUnit}
      />

      {/* UNIT TITLE */}
      <Text style={styles.label}>Unit Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter unit title"
        value={unitTitle}
        onChangeText={setUnitTitle}
      />

      {/* CLASSES */}
      <Text style={styles.label}>Classes *</Text>
      <View style={styles.classRow}>
        {classOptions.map((cls) => (
          <TouchableOpacity
            key={cls}
            onPress={() => toggleClass(cls)}
            style={[
              styles.classBtn,
              classes.includes(cls) && styles.classActive
            ]}
          >
            <Text
              style={{
                color: classes.includes(cls) ? "#fff" : "#000"
              }}
            >
              {cls}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FILE PICKER */}
      <Text style={styles.label}>Upload File *</Text>
      <TouchableOpacity style={styles.fileBtn} onPress={pickFile}>
        <Ionicons name="cloud-upload-outline" size={22} color="#2563eb" />
        <Text style={styles.fileBtnText}>
          {file ? file.name : "Choose File"}
        </Text>
      </TouchableOpacity>

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={uploadNotes}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.submitText}>Publish Notes</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

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

  classRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },

  classBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#e2e8f0"
  },

  classActive: {
    backgroundColor: "#2563eb"
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