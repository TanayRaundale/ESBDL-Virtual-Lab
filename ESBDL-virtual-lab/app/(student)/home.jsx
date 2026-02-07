import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  // 🔹 DEMO ANALYTICS DATA
  const stats = {
    notes: 42,
    quizzes: 12,
    assignments: 8,
    avgScore: 86
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Student Dashboard</Text>
        <Text style={styles.subtitle}>Your learning overview</Text>
      </View>

      {/* KPI ROW */}
      <View style={styles.kpiRow}>
        <KpiCard
          icon="book-outline"
          label="Notes Read"
          value={stats.notes}
          color="#2563eb"
        />
        <KpiCard
          icon="help-circle-outline"
          label="Quizzes"
          value={stats.quizzes}
          color="#16a34a"
        />
      </View>

      <View style={styles.kpiRow}>
        <KpiCard
          icon="document-text-outline"
          label="Assignments"
          value={stats.assignments}
          color="#f59e0b"
        />
        <KpiCard
          icon="trophy-outline"
          label="Avg Score"
          value={`${stats.avgScore}%`}
          color="#7c3aed"
        />
      </View>

      {/* PROGRESS CARD */}
      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: "72%" }]} />
        </View>

        <Text style={styles.progressText}>72% completed this week</Text>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsGrid}>
        <ActionCard icon="book" title="Notes" />
        <ActionCard icon="help-circle" title="Quizzes" />
        <ActionCard icon="brush" title="Diagrams" />
        <ActionCard icon="person" title="Profile" />
      </View>

      <View style={styles.progressCard2}>
        <Text style={styles.sectionTitle}>THANK YOU</Text>
        <Text style={styles.progressText}></Text>
      </View>
    </ScrollView>
  );
}

/* ================= COMPONENTS ================= */

function KpiCard({ icon, label, value, color }) {
  return (
    <View style={styles.kpiCard}>
      <View style={[styles.kpiIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={22} color="#fff" />
      </View>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

function ActionCard({ icon, title }) {
  return (
    <View style={styles.actionCard}>
      <Ionicons name={icon} size={26} color="#2563eb" />
      <Text style={styles.actionText}>{title}</Text>
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

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a"
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b"
  },

  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },

  kpiCard: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 16,
    padding: 16,
    elevation: 4
  },

  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },

  kpiValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a"
  },

  progressCard2: {
  justifyContent: 'center', // vertical center
  alignItems: 'center',     // horizontal center
},

  kpiLabel: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748b"
  },

  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
    elevation: 4
  },

  progressBarBg: {
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    marginTop: 10
  },

  progressBarFill: {
    height: 10,
    backgroundColor: "#2563eb",
    borderRadius: 10
  },

  progressText: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748b"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 25,
    marginBottom: 12
  },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  actionCard: {
    backgroundColor: "#fff",
    width: "48%",
    height: 90,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    elevation: 3
  },

  actionText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a"
  }
});
