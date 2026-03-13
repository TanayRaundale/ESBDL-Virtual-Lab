// import { useState } from "react";
// import API from "../../src/services/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator
// } from "react-native";

// import * as DocumentPicker from "expo-document-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";

// export default function AddNotes() {
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [className, setClassName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ================= PICK FILE ================= */
//   const pickFile = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-powerpoint",
//         "application/vnd.openxmlformats-officedocument.presentationml.presentation"
//       ]
//     });

//     if (!result.canceled) {
//       setFile(result.assets[0]);
//     }
//   };

//   /* ================= SUBMIT ================= */
//   const uploadNotes = async () => {
//     if (!title || !subject || !className || !file) {
//       Alert.alert("Missing Fields", "Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("subject", subject);
//       formData.append("className", className);

//       formData.append("file", {
//         uri: file.uri,
//         name: file.name,
//         type: file.mimeType || "application/octet-stream"
//       });
//        const token = await AsyncStorage.getItem("token");

// const response = await API.post(
//   "/notes/add",
//   formData,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data"
//     }
//   }
// );

// Alert.alert("Success", "Notes uploaded successfully");

// setTitle("");
// setSubject("");
// setClassName("");
// setFile(null);

     
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <Text style={styles.title}>Upload Notes</Text>

//       {/* Title */}
//       <Text style={styles.label}>Title *</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter notes title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       {/* Subject */}
//       <Text style={styles.label}>Subject *</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="e.g. ESDM Virtual Lab"
//         value={subject}
//         onChangeText={setSubject}
//       />

//       {/* Class Dropdown */}
//       <Text style={styles.label}>Class *</Text>
//       <View style={styles.dropdown}>
//         <Picker
//           selectedValue={className}
//           onValueChange={(itemValue) => setClassName(itemValue)}
//         >
//           <Picker.Item label="Select Class" value="" />
//           <Picker.Item label="SY9" value="SY9" />
//           <Picker.Item label="SY10" value="SY10" />
//           <Picker.Item label="SY11" value="SY11" />
//         </Picker>
//       </View>

//       {/* File Picker */}
//       <Text style={styles.label}>Upload File *</Text>
//       <TouchableOpacity style={styles.fileBtn} onPress={pickFile}>
//         <Ionicons name="cloud-upload-outline" size={22} color="#2563eb" />
//         <Text style={styles.fileBtnText}>
//           {file ? file.name : "Choose File"}
//         </Text>
//       </TouchableOpacity>

//       {/* Submit Button */}
//       <TouchableOpacity
//         style={styles.submitBtn}
//         onPress={uploadNotes}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Ionicons name="add-circle-outline" size={22} color="#fff" />
//             <Text style={styles.submitText}>Publish Notes</Text>
//           </>
//         )}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     padding: 20
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20
//   },

//   label: {
//     fontSize: 14,
//     color: "#475569",
//     marginBottom: 6,
//     marginTop: 12,
//     fontWeight: "600"
//   },

//   input: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     fontSize: 15
//   },

//   dropdown: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     marginBottom: 10
//   },

//   fileBtn: {
//     backgroundColor: "#ffffff",
//     borderWidth: 1,
//     borderColor: "#2563eb",
//     borderRadius: 12,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10
//   },

//   fileBtnText: {
//     color: "#2563eb",
//     fontWeight: "600"
//   },

//   submitBtn: {
//     marginTop: 30,
//     backgroundColor: "#2563eb",
//     borderRadius: 14,
//     paddingVertical: 16,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8
//   },

//   submitText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold"
//   }
// });


import { useState, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import API from "../../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";

export default function NotesHome() {
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* ========= FETCH NOTES ========= */
  const fetchNotes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await API.get("/notes/recent", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotes(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* 🔥 REALTIME REFRESH WHEN SCREEN FOCUSES */
  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  /* 🔥 PULL TO REFRESH */
  const onRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  /* ========= PREVIEW ========= */
const openPreview = async (note) => {
  await WebBrowser.openBrowserAsync(note.fileUrl);
};
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openPreview(item)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.meta}>
          Unit {item.unit} • {item.unitTitle}
        </Text>

        <Text style={styles.meta}>
          Classes: {item.classes?.join(", ")}
        </Text>
      </View>

      <Ionicons name="eye-outline" size={24} color="#2563eb" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No notes uploaded yet</Text>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(teacher)/upload-notes")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  meta: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748b",
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#2563eb",
    width: 58,
    height: 58,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});