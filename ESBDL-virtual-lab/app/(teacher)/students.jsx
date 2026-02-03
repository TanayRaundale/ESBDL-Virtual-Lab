import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  BarChart,
  LineChart,
  PieChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// ─── Temporary Data ─────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: 1, name: "Aisha Patel",    avatar: "AP", marks: { Assignment1: 88, Assignment2: 74, Assignment3: 91, Midterm: 82 } },
  { id: 2, name: "Rahul Mehta",    avatar: "RM", marks: { Assignment1: 65, Assignment2: 78, Assignment3: 70, Midterm: 72 } },
  { id: 3, name: "Priya Nair",     avatar: "PN", marks: { Assignment1: 92, Assignment2: 95, Assignment3: 88, Midterm: 90 } },
  { id: 4, name: "Vikram Iyer",    avatar: "VI", marks: { Assignment1: 55, Assignment2: 60, Assignment3: 58, Midterm: 61 } },
  { id: 5, name: "Sneha Joshi",    avatar: "SJ", marks: { Assignment1: 79, Assignment2: 82, Assignment3: 85, Midterm: 78 } },
  { id: 6, name: "Niran Das",      avatar: "ND", marks: { Assignment1: 90, Assignment2: 87, Assignment3: 93, Midterm: 89 } },
  { id: 7, name: "Kavya Reddy",    avatar: "KR", marks: { Assignment1: 71, Assignment2: 68, Assignment3: 75, Midterm: 70 } },
  { id: 8, name: "Sarthak Bansal", avatar: "SB", marks: { Assignment1: 83, Assignment2: 80, Assignment3: 77, Midterm: 85 } },
];

const ASSIGNMENTS = ["Assignment1", "Assignment2", "Assignment3", "Midterm"];
const AVATAR_BG = ["#3b82f6","#8b5cf6","#ec4899","#f97316","#06b6d4","#22c55e","#eab308","#ef4444"];

function getGrade(avg) {
  if (avg >= 85) return { label: "A", color: "#22c55e" };
  if (avg >= 70) return { label: "B", color: "#3b82f6" };
  if (avg >= 55) return { label: "C", color: "#eab308" };
  return { label: "F", color: "#ef4444" };
}

// ─── Shared chart config ────────────────────────────────────────────────────────
const baseChartConfig = {
  backgroundColor: "transparent",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  strokeDasharray: "0",
  propsForDots: { r: "4", fill: "#3b82f6" },
  propsForBackgroundGrid: { stroke: "#f1f5f9" },
};

// ─── Sub-components ─────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, accent }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: accent }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
      {sub != null && <Text style={styles.statSub}>{sub}</Text>}
    </View>
  );
}

function StudentRow({ student, index, isExpanded, onToggle }) {
  const marks = student.marks;
  const avg = (Object.values(marks).reduce((a, b) => a + b, 0) / ASSIGNMENTS.length).toFixed(1);
  const grade = getGrade(Number(avg));

  return (
    <View style={styles.studentCard}>
      <TouchableOpacity onPress={onToggle} style={styles.studentHeader} activeOpacity={0.7}>
        <View style={[styles.avatarCircle, { backgroundColor: AVATAR_BG[index % AVATAR_BG.length] }]}>
          <Text style={styles.avatarText}>{student.avatar}</Text>
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${avg}%`, backgroundColor: grade.color }]} />
          </View>
        </View>
        <View style={styles.gradeBox}>
          <Text style={[styles.gradeLetter, { color: grade.color }]}>{grade.label}</Text>
          <Text style={styles.gradeAvg}>{avg}%</Text>
        </View>
        <Text style={styles.chevron}>{isExpanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.marksGrid}>
          {ASSIGNMENTS.map((a) => {
            const val = marks[a];
            const g = getGrade(val);
            return (
              <View key={a} style={styles.markItem}>
                <Text style={styles.markLabel}>{a.replace("Assignment", "A")}</Text>
                <View style={styles.markBarBg}>
                  <View style={[styles.markBarFill, { width: `${val}%`, backgroundColor: g.color }]} />
                </View>
                <Text style={[styles.markVal, { color: g.color }]}>{val}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// ─── Legend row (shared) ────────────────────────────────────────────────────────
function LegendRow({ items }) {
  return (
    <View style={styles.legendRow}>
      {items.map((item, i) => (
        <View key={i} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────────
export default function Students() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("All");

  // ── Derived data ──────────────────────────────────────────────────────────────
  const allAverages = useMemo(() =>
    STUDENTS.map(s => {
      const vals = Object.values(s.marks);
      return { ...s, avg: vals.reduce((a, b) => a + b, 0) / vals.length };
    }), []);

  const classAvg = (allAverages.reduce((a, s) => a + s.avg, 0) / allAverages.length).toFixed(1);
  const topStudent = [...allAverages].sort((a, b) => b.avg - a.avg)[0];
  const passRate = ((allAverages.filter(s => s.avg >= 55).length / allAverages.length) * 100).toFixed(0);

  // ── Bar chart: avg marks per assignment ──────────────────────────────────────
  const barData = useMemo(() => {
    const labels = ASSIGNMENTS.map(a => a.replace("Assignment", "A"));
    const data = ASSIGNMENTS.map(a =>
      parseFloat((allAverages.reduce((sum, s) => sum + s.marks[a], 0) / allAverages.length).toFixed(1))
    );
    return { labels, datasets: [{ data, color: () => "#3b82f6", strokeWidth: 2 }] };
  }, []);

  // ── Line chart: top 3 students trend ─────────────────────────────────────────
  const top3Names = ["Priya Nair", "Aisha Patel", "Niran Das"];
  const top3Colors = ["#ec4899", "#3b82f6", "#a855f7"];

  const lineData = useMemo(() => {
    const labels = ASSIGNMENTS.map(a => a.replace("Assignment", "A"));
    const datasets = top3Names.map((name, i) => {
      const student = STUDENTS.find(s => s.name === name);
      return {
        label: name.split(" ")[0],
        data: ASSIGNMENTS.map(a => student.marks[a]),
        color: () => top3Colors[i],
        strokeWidth: 2,
      };
    });
    return { labels, datasets };
  }, []);

  // ── Pie chart: grade distribution ─────────────────────────────────────────────
  const pieData = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, F: 0 };
    allAverages.forEach(s => { counts[getGrade(s.avg).label]++; });
    const slices = [
      { label: "A (85+)",   value: counts.A, color: "#22c55e" },
      { label: "B (70-84)", value: counts.B, color: "#3b82f6" },
      { label: "C (55-69)", value: counts.C, color: "#eab308" },
      { label: "F (<55)",   value: counts.F, color: "#ef4444" },
    ].filter(d => d.value > 0);

    return {
      labels: slices.map(s => `${s.label} (${s.value})`),
      datasets: [{ data: slices.map(s => s.value), colors: slices.map(s => s.color) }],
      legend: slices,
    };
  }, []);

  // ── Filtered list ─────────────────────────────────────────────────────────────
  const filteredStudents = useMemo(() => {
    if (filter === "All") return allAverages;
    const ranges = { A: [85, 100], B: [70, 84.99], C: [55, 69.99], F: [0, 54.99] };
    const [lo, hi] = ranges[filter];
    return allAverages.filter(s => s.avg >= lo && s.avg <= hi);
  }, [filter, allAverages]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Marks</Text>
        <Text style={styles.headerSub}>Class overview & analytics</Text>
      </View>

      {/* Stat Cards */}
      <View style={styles.statsRow}>
        <StatCard title="Class Avg"   value={`${classAvg}%`}                          sub="Overall"          accent="#3b82f6" />
        <StatCard title="Top Student" value={topStudent.name.split(" ")[0]}           sub={`${topStudent.avg.toFixed(1)}%`} accent="#22c55e" />
        <StatCard title="Pass Rate"   value={`${passRate}%`}                          sub="≥ 55 marks"       accent="#a855f7" />
      </View>

      {/* ── Bar Chart ── */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Avg Marks per Assignment</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            ...baseChartConfig,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          }}
          showValuesOnTopOfBars
          fromZero
          yAxisMax={100}
          style={styles.chart}
        />
      </View>

      {/* ── Line Chart ── */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Top 3 Students — Trend</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={190}
          chartConfig={{
            ...baseChartConfig,
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
          }}
          style={styles.chart}
          bezier
          fromZero={false}
          yAxisMin={50}
          yAxisMax={100}
        />
        <LegendRow items={top3Names.map((n, i) => ({ label: n.split(" ")[0], color: top3Colors[i] }))} />
      </View>

      {/* ── Pie Chart ── */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Grade Distribution</Text>
        <PieChart
          data={pieData.labels.map((label, i) => ({
            name: label,
            population: pieData.datasets[0].data[i],
            color: pieData.datasets[0].colors[i],
            legendFontColor: "#64748b",
            legendFontSize: 12,
          }))}
          width={screenWidth - 40}
          height={170}
          chartConfig={{
            ...baseChartConfig,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          center={[screenWidth / 2 - 90, 0]}
          hasLegend={false}
        />
        <LegendRow items={pieData.legend} />
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        {["All", "A", "B", "C", "F"].map(g => (
          <TouchableOpacity
            key={g}
            onPress={() => setFilter(g)}
            style={[styles.pill, filter === g && styles.pillActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, filter === g && styles.pillTextActive]}>
              {g === "All" ? "All Students" : `Grade ${g}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section label */}
      <Text style={styles.sectionLabel}>Students ({filteredStudents.length})</Text>

      {/* Student List */}
      {filteredStudents.map((s, i) => (
        <StudentRow
          key={s.id}
          student={s}
          index={i}
          isExpanded={expandedId === s.id}
          onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
        />
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f8fafc" },

  // Header
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#1e293b", letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: "#64748b", marginTop: 2 },

  // Stat Cards
  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginTop: 14 },
  statCard: {
    flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: 12,
    borderLeftWidth: 3,
    shadowColor: "#0f172a", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  statTitle: { fontSize: 9, textTransform: "uppercase", letterSpacing: 0.8, color: "#94a3b8", fontWeight: "600" },
  statValue: { fontSize: 17, fontWeight: "700", marginTop: 3 },
  statSub: { fontSize: 10, color: "#94a3b8", marginTop: 1 },

  // Charts
  chartCard: {
    backgroundColor: "#fff", borderRadius: 14, marginHorizontal: 20, marginTop: 16,
    padding: 16, alignItems: "center",
    shadowColor: "#0f172a", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  chartTitle: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 8, alignSelf: "flex-start" },
  chart: { marginLeft: -10 },

  // Legend
  legendRow: { flexDirection: "row", gap: 16, marginTop: 10, flexWrap: "wrap", justifyContent: "center" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { fontSize: 11, color: "#64748b", fontWeight: "500" },

  // Filter Pills
  filterRow: { flexDirection: "row", gap: 8, paddingHorizontal: 20, marginTop: 20, flexWrap: "wrap" },
  pill: { backgroundColor: "#e2e8f0", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  pillActive: { backgroundColor: "#3b82f6" },
  pillText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  pillTextActive: { color: "#fff" },

  // Section label
  sectionLabel: { fontSize: 11, fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8, paddingHorizontal: 20, marginTop: 18, marginBottom: 8 },

  // Student Cards
  studentCard: {
    marginHorizontal: 20, marginBottom: 8, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden",
    shadowColor: "#0f172a", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  studentHeader: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 14, fontWeight: "600", color: "#1e293b" },
  progressBar: { marginTop: 5, height: 5, backgroundColor: "#f1f5f9", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  gradeBox: { alignItems: "center" },
  gradeLetter: { fontSize: 16, fontWeight: "700" },
  gradeAvg: { fontSize: 10, color: "#94a3b8" },
  chevron: { fontSize: 11, color: "#94a3b8" },

  // Expanded assignment marks
  marksGrid: { paddingHorizontal: 16, paddingBottom: 14, gap: 8 },
  markItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  markLabel: { fontSize: 12, color: "#64748b", width: 32 },
  markBarBg: { flex: 1, height: 8, backgroundColor: "#f1f5f9", borderRadius: 4, overflow: "hidden" },
  markBarFill: { height: "100%", borderRadius: 4 },
  markVal: { fontSize: 12, fontWeight: "700", width: 28, textAlign: "right" },
});