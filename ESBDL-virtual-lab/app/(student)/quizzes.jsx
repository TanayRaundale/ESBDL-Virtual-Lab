<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Quizzes() {

  // 🧠 SAMPLE QUIZ DATA (Controlled by Teacher)
  const activeQuizzes = [
    {
      id: "1",
      title: "DSA Quiz – Trees",
      subject: "Data Structures",
      duration: "20 mins",
      status: "Active"
    },
    {
      id: "2",
      title: "DBMS Quiz – SQL",
      subject: "Database Systems",
      duration: "15 mins",
      status: "Upcoming"
    }
  ];

  const previousResults = [
    {
      id: "101",
      title: "Operating Systems Quiz",
      score: 18,
      total: 20,
      result: "Passed"
    },
    {
      id: "102",
      title: "Computer Networks Quiz",
      score: 11,
      total: 20,
      result: "Failed"
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Quizzes</Text>
      <Text style={styles.subheading}>
        Attend quizzes & track your performance
      </Text>

      {/* ACTIVE QUIZZES */}
      <Text style={styles.sectionTitle}>Active Quizzes</Text>

      <FlatList
        data={activeQuizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuizCard quiz={item} />}
      />

      {/* PREVIOUS RESULTS */}
      <Text style={styles.sectionTitle}>Previous Results</Text>

      <FlatList
        data={previousResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ResultCard result={item} />}
      />
    </View>
  );
}

/* ================= QUIZ CARD ================= */

function QuizCard({ quiz }) {
  const isActive = quiz.status === "Active";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <View
          style={[
            styles.statusBadge,
            isActive ? styles.active : styles.upcoming
          ]}
        >
          <Text style={styles.statusText}>{quiz.status}</Text>
        </View>
      </View>

      <Text style={styles.subject}>{quiz.subject}</Text>

      <View style={styles.metaRow}>
        <Ionicons name="time-outline" size={14} color="#64748b" />
        <Text style={styles.metaText}>{quiz.duration}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.startBtn,
          !isActive && styles.disabledBtn
        ]}
        disabled={!isActive}
      >
        <Ionicons
          name="play-outline"
          size={18}
          color="#fff"
        />
        <Text style={styles.startText}>
          {isActive ? "Start Quiz" : "Not Available"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= RESULT CARD ================= */

function ResultCard({ result }) {
  const passed = result.result === "Passed";

  return (
    <View style={styles.card}>
      <Text style={styles.quizTitle}>{result.title}</Text>

      <View style={styles.resultRow}>
        <Text style={styles.score}>
          Score: {result.score}/{result.total}
        </Text>
        <Text
          style={[
            styles.resultStatus,
            passed ? styles.pass : styles.fail
          ]}
        >
          {result.result}
        </Text>
      </View>
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

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a"
  },

  subheading: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
    marginTop: 20
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 4
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  quizTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a"
  },

  subject: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 4
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },

  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#64748b"
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  active: {
    backgroundColor: "#dcfce7"
  },

  upcoming: {
    backgroundColor: "#e5e7eb"
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a"
  },

  startBtn: {
    marginTop: 14,
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  disabledBtn: {
    backgroundColor: "#94a3b8"
  },

  startText: {
    color: "#fff",
    fontWeight: "700"
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  score: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a"
  },

  resultStatus: {
    fontSize: 14,
    fontWeight: "700"
  },

  pass: {
    color: "#16a34a"
  },

  fail: {
    color: "#dc2626"
  }
});
=======
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Quizzes() {

  // 🧠 SAMPLE QUIZ DATA (Controlled by Teacher)
  const activeQuizzes = [
    {
      id: "1",
      title: "DSA Quiz – Trees",
      subject: "Data Structures",
      duration: "20 mins",
      status: "Active"
    },
    {
      id: "2",
      title: "DBMS Quiz – SQL",
      subject: "Database Systems",
      duration: "15 mins",
      status: "Upcoming"
    }
  ];

  const previousResults = [
    {
      id: "101",
      title: "Operating Systems Quiz",
      score: 18,
      total: 20,
      result: "Passed"
    },
    {
      id: "102",
      title: "Computer Networks Quiz",
      score: 11,
      total: 20,
      result: "Failed"
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Quizzes</Text>
      <Text style={styles.subheading}>
        Attend quizzes & track your performance
      </Text>

      {/* ACTIVE QUIZZES */}
      <Text style={styles.sectionTitle}>Active Quizzes</Text>

      <FlatList
        data={activeQuizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuizCard quiz={item} />}
      />

      {/* PREVIOUS RESULTS */}
      <Text style={styles.sectionTitle}>Previous Results</Text>

      <FlatList
        data={previousResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ResultCard result={item} />}
      />
    </View>
  );
}

/* ================= QUIZ CARD ================= */

function QuizCard({ quiz }) {
  const isActive = quiz.status === "Active";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <View
          style={[
            styles.statusBadge,
            isActive ? styles.active : styles.upcoming
          ]}
        >
          <Text style={styles.statusText}>{quiz.status}</Text>
        </View>
      </View>

      <Text style={styles.subject}>{quiz.subject}</Text>

      <View style={styles.metaRow}>
        <Ionicons name="time-outline" size={14} color="#64748b" />
        <Text style={styles.metaText}>{quiz.duration}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.startBtn,
          !isActive && styles.disabledBtn
        ]}
        disabled={!isActive}
      >
        <Ionicons
          name="play-outline"
          size={18}
          color="#fff"
        />
        <Text style={styles.startText}>
          {isActive ? "Start Quiz" : "Not Available"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= RESULT CARD ================= */

function ResultCard({ result }) {
  const passed = result.result === "Passed";

  return (
    <View style={styles.card}>
      <Text style={styles.quizTitle}>{result.title}</Text>

      <View style={styles.resultRow}>
        <Text style={styles.score}>
          Score: {result.score}/{result.total}
        </Text>
        <Text
          style={[
            styles.resultStatus,
            passed ? styles.pass : styles.fail
          ]}
        >
          {result.result}
        </Text>
      </View>
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

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a"
  },

  subheading: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
    marginTop: 20
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 4
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  quizTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a"
  },

  subject: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 4
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },

  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#64748b"
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  active: {
    backgroundColor: "#dcfce7"
  },

  upcoming: {
    backgroundColor: "#e5e7eb"
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a"
  },

  startBtn: {
    marginTop: 14,
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  disabledBtn: {
    backgroundColor: "#94a3b8"
  },

  startText: {
    color: "#fff",
    fontWeight: "700"
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  score: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a"
  },

  resultStatus: {
    fontSize: 14,
    fontWeight: "700"
  },

  pass: {
    color: "#16a34a"
  },

  fail: {
    color: "#dc2626"
  }
});
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
