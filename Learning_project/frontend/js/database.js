/**
 * Database Module
 * Handles all data persistence and retrieval
 */

const DB_KEY = "apt_db_v4";
const SESSION_KEY = "apt_session";

/**
 * Load database from localStorage or initialize with seed data
 */
function loadDB() {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load DB from storage:", e);
  }
  
  const seeded = seedDatabase();
  saveDB(seeded);
  return seeded;
}

/**
 * Save database to localStorage
 */
function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Failed to save DB:", e);
  }
}

/**
 * Initialize database with seed data
 */
function seedDatabase() {
  const users = [];
  const records = [];
  const notifications = [];

  // Admin user
  users.push({
    id: 1,
    username: "admin",
    password: "password",
    role: "ADMIN",
    fullName: "System Admin",
  });

  // Faculty users
  users.push({
    id: 2,
    username: "faculty1",
    password: "password",
    role: "FACULTY",
    fullName: "Dr. John Smith",
    branch: "CSE-AIML",
  });

  users.push({
    id: 3,
    username: "faculty2",
    password: "password",
    role: "FACULTY",
    fullName: "Prof. Sarah Johnson",
    branch: "CSE-AIML",
  });

  // Student data
  const studentData = [
    { name: "Aarav Patel", rollNo: "24CSEAIML063" },
    { name: "Bhavna Singh", rollNo: "24CSEAIML067" },
    { name: "Chirag Verma", rollNo: "24CSEAIML070" },
    { name: "Deepika Kumar", rollNo: "24CSEAIML074" },
    { name: "Eshan Reddy", rollNo: "24CSEAIML078" },
    { name: "Fatima Hassan", rollNo: "24CSEAIML082" },
    { name: "Gaurav Sharma", rollNo: "24CSEAIML086" },
    { name: "Harini Nair", rollNo: "24CSEAIML090" },
  ];

  const subjects = [
    "A-PYTHON", "ACSPE", "COA", "DAA", "IML", "OS",
    "PPML", "STATS", "AI-FUND", "DL", "NLP", "CV"
  ];

  let nextId = users.length + 1;

  for (const s of studentData) {
    users.push({
      id: nextId++,
      username: s.rollNo.toLowerCase(),
      password: "password",
      role: "STUDENT",
      fullName: s.name,
      rollNo: s.rollNo,
      email: `${s.rollNo.toLowerCase()}@college.edu`,
      branch: "CSE-AIML",
      semester: "4th",
    });

    // Create sample academic records
    for (const subj of subjects) {
      const attended = randomInt(10, 20);
      const total = 20;
      records.push({
        studentId: nextId - 1,
        subjectCode: subj,
        semester: "4th",
        total,
        attended,
        marks: randomInt(40, 100),
      });
    }
  }

  // Seed notifications
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  notifications.push({
    id: 1,
    title: "Welcome to Performance Tracker",
    message: "Your academic performance tracking system is ready. Track attendance, marks, and progress easily.",
    date: today,
    author: "Admin",
  });

  notifications.push({
    id: 2,
    title: "New Course Update",
    message: "Additional learning resources have been uploaded for AI Fundamentals.",
    date: today,
    author: "Admin",
  });

  return { users, records, notifications };
}

/**
 * Helper function for random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get all records for a student
 */
function getStudentRecords(studentId) {
  return db.records.filter(r => r.studentId === studentId);
}

/**
 * Get aggregated statistics for a student
 */
function getStudentAggregates(studentId) {
  const records = getStudentRecords(studentId);
  
  if (!records.length) {
    return {
      attendancePct: 0,
      avgMarks: 0,
      category: "Unknown",
    };
  }

  const totalAttended = records.reduce((sum, r) => sum + r.attended, 0);
  const totalClasses = records.reduce((sum, r) => sum + r.total, 0);
  const attendancePct = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;
  
  const avgMarks = Math.round(records.reduce((sum, r) => sum + r.marks, 0) / records.length);
  
  const category = calculateCategory(attendancePct, avgMarks);

  return {
    attendancePct,
    avgMarks,
    category,
  };
}

/**
 * Calculate performance category
 */
function calculateCategory(attendancePct, marks) {
  if (attendancePct >= 75 && marks >= 70) return "Good";
  if (attendancePct >= 60 && marks >= 50) return "Average";
  return "At-Risk";
}
