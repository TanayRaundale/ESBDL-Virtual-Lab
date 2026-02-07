import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Assignments() {
  // 📘 SAMPLE ASSIGNMENTS DATA
  const assignments = [
    {
      id: "1",
      title: "Binary Trees & Traversals",
      subject: "Data Structures",
      teacher: "Prof. Sharma",
      dueDate: "15 Feb 2026",
      status: "Pending"
    },
    {
      id: "2",
      title: "SQL Joins & Indexes",
      subject: "Database Systems",
      teacher: "Dr. Mehta",
      dueDate: "10 Feb 2026",
      status: "Submitted"
    },
    {
      id: "3",
      title: "React Native Components",
      subject: "Mobile App Development",
      teacher: "Ms. Kulkarni",
      dueDate: "18 Feb 2026",
      status: "Pending"
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Assignments</Text>
      <Text style={styles.subtitle}>
        Assignments shared by your teachers
      </Text>

      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <AssignmentCard assignment={item} />
        )}
      />
    </View>
  );
}

/* ================= CARD ================= */

function AssignmentCard({ assignment }) {
  const isSubmitted = assignment.status === "Submitted";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.subject}>{assignment.subject}</Text>
        <View
          style={[
            styles.statusBadge,
            isSubmitted ? styles.submitted : styles.pending
          ]}
        >
          <Text style={styles.statusText}>
            {assignment.status}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.titleText}>{assignment.title}</Text>

      {/* Meta */}
      <View style={styles.metaRow}>
        <Ionicons name="person-outline" size={14} color="#64748b" />
        <Text style={styles.metaText}>{assignment.teacher}</Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={14} color="#64748b" />
        <Text style={styles.metaText}>
          Due: {assignment.dueDate}
        </Text>
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={18} color="#fff" />
        <Text style={styles.downloadText}>Download Assignment</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a"
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
    marginTop: 4
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 4
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  subject: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563eb"
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  pending: {
    backgroundColor: "#fee2e2"
  },

  submitted: {
    backgroundColor: "#dcfce7"
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a"
  },

  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 10
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },

  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#64748b"
  },

  downloadBtn: {
    marginTop: 14,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  downloadText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14
  }
});
