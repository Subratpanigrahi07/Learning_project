/**
 * Database Seed Configuration
 * All demo data for the Adaptive Performance Tracker
 */

// Student list with 64 entries
const STUDENT_DATA = [
  { name: "Aarav Patel", rollNo: "24CSEAIML063" },
  { name: "Bhavna Singh", rollNo: "24CSEAIML067" },
  { name: "Chirag Verma", rollNo: "24CSEAIML070" },
  { name: "Deepika Kumar", rollNo: "24CSEAIML074" },
  { name: "Eshan Reddy", rollNo: "24CSEAIML078" },
  { name: "Fatima Hassan", rollNo: "24CSEAIML082" },
  { name: "Gaurav Sharma", rollNo: "24CSEAIML086" },
  { name: "Harini Nair", rollNo: "24CSEAIML090" },
  // ... Add more students as needed
];

// Courses/Subjects
const SUBJECTS = [
  "A-PYTHON",      // Advanced Python
  "ACSPE",         // Advanced CS & Programming
  "COA",           // Computer Organization & Architecture
  "DAA",           // Design & Analysis of Algorithms
  "IML",           // Introduction to Machine Learning
  "OS",            // Operating Systems
  "PPML",          // Practical Python for ML
  "STATS",         // Statistics & Probability
  "AI-FUND",       // AI Fundamentals
  "DL",            // Deep Learning
  "NLP",           // Natural Language Processing
  "CV",            // Computer Vision
];

// Demo faculty
const FACULTY = [
  { name: "Sankar patro", branch: "CSE" },
  { name: "A shreelaxmi", branch: "CSE" },
];

// Initial notifications
const INITIAL_NOTIFICATIONS = [
  {
    title: "Welcome to Performance Tracker",
    message: "Your academic performance tracking system is ready. Track attendance, marks, and progress easily.",
    author: "Admin",
  },
  {
    title: "New Course Update",
    message: "Additional learning resources have been uploaded for AI Fundamentals.",
    author: "Admin",
  },
];

// Export for use in database.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STUDENT_DATA,
    SUBJECTS,
    FACULTY,
    INITIAL_NOTIFICATIONS,
  };
}
