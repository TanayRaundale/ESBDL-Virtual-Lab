import { useState, useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import API from "../../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

export default function StudentNotes() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("All");

  const downloadFile = async (fileUrl, fileName = "document") => {
    try {
      const cleanFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const fileUri = `${FileSystem.documentDirectory}${cleanFileName}`;

      console.log("Attempting download from:", fileUrl);

      const result = await FileSystem.downloadAsync(fileUrl, fileUri);

      if (result.status === 404) {
        console.log("First attempt 404. Trying fallback path...");

        const fallbackUrl = fileUrl.includes("/raw/upload/")
          ? fileUrl.replace("/raw/upload/", "/image/upload/")
          : fileUrl.replace("/image/upload/", "/raw/upload/");

        const secondResult = await FileSystem.downloadAsync(fallbackUrl, fileUri);

        if (secondResult.status === 200) {
          await Sharing.shareAsync(secondResult.uri);
          return;
        }
      }

      if (result.status === 200) {
        await Sharing.shareAsync(result.uri);
      } else {
        Alert.alert("Download Error", `Server returned status ${result.status}`);
      }
    } catch (err) {
      console.log("Download crash:", err);
      Alert.alert("Error", "Could not complete download.");
    }
  };

  const fetchNotes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await API.get("/notes/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
      setFilteredNotes(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  useEffect(() => {
    let filtered = notes;

    if (selectedUnit !== "All") {
      filtered = filtered.filter((note) => note.unitNumber.toString() === selectedUnit);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.topic.toLowerCase().includes(query) ||
          note.unit.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  }, [searchQuery, selectedUnit, notes]);

  const uniqueUnits = ["All", ...new Set(notes.map((n) => n.unitNumber.toString()))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return parseInt(a) - parseInt(b);
  });

  const openPreview = async (note) => {
    if (!note.files?.length) return;

    if (note.files.length === 1) {
      await WebBrowser.openBrowserAsync(note.files[0].fileUrl);
    } else {
      setSelectedNote(note);
      setModalVisible(true);
    }
  };

  const trackDownload = async (noteId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await API.post(
        `/notes/${noteId}/track-download`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log("Track download error:", err);
    }
  };

  const NoteCard = ({ item }) => {

    const unitColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b", "#ec4899", "#22c55e"];
    const gradientColor = unitColors[item.unitNumber % unitColors.length];

    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            trackDownload(item._id);
            openPreview(item);
          }}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[`${gradientColor}15`, `${gradientColor}05`]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.unitBadge, { backgroundColor: gradientColor }]}>
              <Ionicons name="layers" size={12} color="#fff" />
              <Text style={styles.unitBadgeText}>Unit {item.unitNumber}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.topic} numberOfLines={2}>
                {item.topic}
              </Text>
              <Text style={styles.unitName} numberOfLines={1}>
                {item.unit}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="document-text-outline" size={14} color="#64748b" />
                  <Text style={styles.metaText}>
                    {item.files?.length || 0} {item.files?.length === 1 ? "file" : "files"}
                  </Text>
                </View>
                {item.uploadedAt && (
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color="#64748b" />
                    <Text style={styles.metaText}>
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={[styles.downloadIcon, { backgroundColor: `${gradientColor}20` }]}>
              <Ionicons name="download-outline" size={20} color={gradientColor} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={["#3b82f6", "#2563eb"]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Study Notes</Text>
              <Text style={styles.headerSub}>Access all class materials</Text>
            </View>
            <View style={styles.notesCount}>
              <Text style={styles.notesCountText}>{filteredNotes.length}</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by topic or unit..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {uniqueUnits.map((unit) => (
            <TouchableOpacity
              key={unit}
              style={[styles.filterPill, selectedUnit === unit && styles.filterPillActive]}
              onPress={() => setSelectedUnit(unit)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, selectedUnit === unit && styles.filterTextActive]}>
                {unit === "All" ? "All Units" : `Unit ${unit}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading notes...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <NoteCard item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="documents-outline" size={48} color="#cbd5e1" />
              </View>
              <Text style={styles.emptyText}>
                {searchQuery || selectedUnit !== "All" ? "No notes found" : "No notes available"}
              </Text>
              <Text style={styles.emptySubText}>
                {searchQuery || selectedUnit !== "All"
                  ? "Try adjusting your filters"
                  : "New notes will appear here when uploaded"}
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{selectedNote?.topic}</Text>
                <Text style={styles.modalSubtitle}>Select a file to open</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <View style={styles.fileList}>
              {selectedNote?.files?.map((file, index) => {
                const ext = file.fileName?.split(".").pop()?.toLowerCase();
                let iconName = "document-text";
                let iconColor = "#3b82f6";

                if (ext === "pdf") {
                  iconName = "document-text";
                  iconColor = "#ef4444";
                } else if (ext === "doc" || ext === "docx") {
                  iconName = "document";
                  iconColor = "#2563eb";
                } else if (ext === "ppt" || ext === "pptx") {
                  iconName = "easel";
                  iconColor = "#f59e0b";
                } else if (["jpg", "jpeg", "png"].includes(ext)) {
                  iconName = "image";
                  iconColor = "#22c55e";
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.fileOption}
                    onPress={async () => {
                      setModalVisible(false);
                      await WebBrowser.openBrowserAsync(file.fileUrl);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.fileIconCircle, { backgroundColor: `${iconColor}15` }]}>
                      <Ionicons name={iconName} size={22} color={iconColor} />
                    </View>

                    <View style={styles.fileDetails}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {file.fileName || `File ${index + 1}`}
                      </Text>
                      <Text style={styles.fileType}>{ext?.toUpperCase()}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => downloadFile(file.fileUrl, file.fileName)}
                    >
                      <Ionicons name="download-outline" size={22} color="#64748b" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: "#bfdbfe",
    marginTop: 2,
  },
  notesCount: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  notesCountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
  },

  filterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  filterPillActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },
  filterTextActive: {
    color: "#fff",
  },

  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#64748b",
  },

  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardGradient: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    position: "relative",
  },
  unitBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unitBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardContent: {
    paddingRight: 90,
  },
  topic: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
    lineHeight: 22,
  },
  unitName: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: "#64748b",
  },
  downloadIcon: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#475569",
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 40,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  fileList: {
    gap: 10,
    marginBottom: 16,
  },
  fileOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  fileIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  fileType: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#fee2e2",
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#dc2626",
  },
});
