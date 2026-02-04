/* ===================================
   DATABASE & STATE MANAGEMENT
   =================================== */

const DB_KEY = "apt_db_v4";
const SESSION_KEY = "apt_session";

// Global state
let db = loadDB();
let currentUser = null;
let isDarkMode = true;
let aiChatOpen = false;
let currentTrendFilter = 'all';
let adminCategoryChart = null;
let trendsChart = null;
let adminAnalyticsChartView = null;

/**
 * Load database from localStorage
 * @returns {Object} Database object
 */
function loadDB() {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load DB from storage", e);
  }
  const seeded = seedDatabase();
  saveDB(seeded);
  return seeded;
}

/**
 * Save database to localStorage
 * @param {Object} dbObj - Database object to save
 */
function saveDB(dbObj) {
  localStorage.setItem(DB_KEY, JSON.stringify(dbObj));
}

/**
 * Initialize database with seed data
 * @returns {Object} Seeded database
 */
function seedDatabase() {
  const users = [];
  const records = [];
  const notifications = [];

  // Admin user
  users.push({
    id: 1,
    username: "admin",
    password: "admin123",
    role: "ADMIN",
    fullName: "System Admin",
  });

  // Faculty users
  users.push({
    id: 2,
    username: "faculty1",
    password: "fac123",
    role: "FACULTY",
    fullName: "Dr. Rajesh Kumar",
    branch: "CSE-AIML",
  });
  users.push({
    id: 3,
    username: "faculty2",
    password: "fac123",
    role: "FACULTY",
    fullName: "Dr. Priya Sharma",
    branch: "CSE-AIML",
  });

  // Student data
  const studentData = [
    { rollNo: "24CSE001", fullName: "Aman Singh", branch: "CSE-AIML", semester: 4, email: "aman@college.edu" },
    { rollNo: "24CSE002", fullName: "Bhavna Patel", branch: "CSE-AIML", semester: 4, email: "bhavna@college.edu" },
    { rollNo: "24CSE003", fullName: "Chirag Verma", branch: "CSE-AIML", semester: 4, email: "chirag@college.edu" },
    { rollNo: "24CSE004", fullName: "Deepa Roy", branch: "CSE-AIML", semester: 4, email: "deepa@college.edu" },
    { rollNo: "24CSE005", fullName: "Eshan Gupta", branch: "CSE-AIML", semester: 4, email: "eshan@college.edu" },
  ];

  const subjects = [
    { code: "CS101", name: "Data Structures" },
    { code: "CS102", name: "Algorithms" },
    { code: "CS103", name: "Database Management" },
    { code: "CS104", name: "Web Development" },
  ];

  let nextId = users.length + 1;

  for (const s of studentData) {
    users.push({
      id: nextId++,
      username: s.rollNo.toLowerCase(),
      password: "student123",
      role: "STUDENT",
      fullName: s.fullName,
      rollNo: s.rollNo,
      branch: s.branch,
      semester: s.semester,
      email: s.email,
    });

    // Create sample records for each student
    for (const subject of subjects) {
      records.push({
        studentId: nextId - 1,
        subjectCode: subject.code,
        total: 40,
        attended: randomInt(25, 40),
        marks: randomInt(45, 95),
      });
    }
  }

  // Seed notifications
  const today = getFormattedDate();
  notifications.push({
    id: 1,
    title: "Welcome to APT",
    message: "Welcome to Adaptive Performance Tracker. Monitor your academic progress with real-time analytics.",
    date: today,
    author: "Admin",
  });
  notifications.push({
    id: 2,
    title: "New Semester Started",
    message: "The new semester has officially begun. All students must register their courses.",
    date: today,
    author: "Admin",
  });

  return { users, records, notifications };
}

/**
 * Get all records for a specific student
 * @param {number} studentId - Student ID
 * @returns {Array} Array of student records
 */
function getStudentRecords(studentId) {
  return db.records.filter((r) => r.studentId === studentId);
}

/**
 * Calculate aggregated statistics for a student
 * @param {number} studentId - Student ID
 * @returns {Object} Aggregated statistics
 */
function getStudentAggregates(studentId) {
  const records = getStudentRecords(studentId);
  if (!records.length) {
    return {
      attendancePct: 0,
      avgMarks: 0,
      category: "At-Risk",
    };
  }

  let totalClasses = 0;
  let totalAttended = 0;
  let marksSum = 0;

  records.forEach((r) => {
    totalClasses += r.total;
    totalAttended += r.attended;
    marksSum += r.marks;
  });

  const attendancePct = totalClasses ? (totalAttended / totalClasses) * 100 : 0;
  const avgMarks = records.length ? marksSum / records.length : 0;
  const category = calculateCategory(attendancePct, avgMarks);

  return {
    attendancePct: parseFloat(attendancePct.toFixed(1)),
    avgMarks: parseFloat(avgMarks.toFixed(1)),
    category,
  };
}

/**
 * Calculate achievement badges for a student
 * @param {number} studentId - Student ID
 * @returns {Array} Array of badge objects
 */
function calculateBadges(studentId) {
  const records = getStudentRecords(studentId);
  const aggr = getStudentAggregates(studentId);
  const badges = [];

  if (aggr.attendancePct >= 90) {
    badges.push({ icon: "fa-fire", label: "Perfect Attendance", color: "text-emerald-400" });
  }
  if (aggr.avgMarks >= 90) {
    badges.push({ icon: "fa-star", label: "Excellent Marks", color: "text-amber-400" });
  }
  if (aggr.category === "Good") {
    badges.push({ icon: "fa-trophy", label: "Top Performer", color: "text-sky-400" });
  }
  if (records.length >= 3) {
    badges.push({ icon: "fa-book", label: "Dedicated Learner", color: "text-violet-400" });
  }
  if (aggr.attendancePct >= 75 && aggr.avgMarks >= 70) {
    badges.push({ icon: "fa-medal", label: "Consistent Achiever", color: "text-rose-400" });
  }
  if (records.some(r => r.marks >= 95)) {
    badges.push({ icon: "fa-flash", label: "Excellence Seeker", color: "text-yellow-400" });
  }

  return badges;
}
