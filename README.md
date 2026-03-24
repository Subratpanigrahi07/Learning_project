# Adaptive Performance Tracker (APT)

A full-stack premium academic performance management system. APT is an intelligent ERP solution built to revolutionize educational data tracking through real-time analytics, AI-driven insights, and immersive user experiences.

## 📋 Project Overview

APT is a modern Educational Enterprise Resource Planning (ERP) system designed for colleges and universities to track student performance, manage academic records, and provide real-time analytics on attendance and marks. By integrating a Node.js backend with a sophisticated Vanilla JS frontend, APT provides a seamless, secure, and highly visual environment for three distinct roles:

- **Students**: Leverage the "AI Learning Hub" for personalized study roadmaps, monitor performance trends, and earn achievement badges.
- **Faculty**: Monitor class-wide analytics, manage bulk academic records, and execute prescriptive interventions using AI-powered drafting.
- **Admins**: Oversee system-wide performance with market-style trend charts, manage user lifecycles (Add/Remove/Suspend), and broadcast institutional announcements.

---

## 🎯 Feature Ecosystem

### 🎓 Student Features
- **AI Learning Hub**:
    - **Smart Roadmap**: Generate personalized learning paths based on performance.
    - **Weakness Analyzer**: Identify subject-specific gaps automatically.
    - **Study Planner**: Daily schedules optimized for upcoming milestones.
    - **Exam Prep Coach**: AI-driven strategy for competitive performance.
- **Performance Analytics**: Real-time tracking of subject-wise attendance and marks.
- **Visual Insights**: Polar Area charts for grade distribution and Doughnut charts for attendance.
- **Achievement System**: Unlockable badges (e.g., Attendance Hero, Academic Elite) based on performance milestones.
- **Leaderboard**: Compare performance with peers in the same branch/semester.
- **Profile Management**: Detailed academic identity with roll number and branch info.

### 🍎 Faculty Features
- **Class Analytics**: High-level overview of class averages and attendance metrics.
- **At-Risk Interventions**: AI-enhanced "Draft Warning" system for quick student follow-ups.
- **Data Management**: Full CRUD operations for student marks and bulk CSV upload support.
- **Performance Badging**: Highlight recent earners to foster positive reinforcement.
- **Prescriptive Insights**: AI-generated suggestions for pedagogical improvements based on class trends.
- **Export Capabilities**: Download class performance data in standardized formats.

### 🛡️ Admin Features
- **System-Wide Trends**: Market-style trend charts tracking Institutional Marks and Attendance over time.
- **User Management Hub**: Advanced controls to Add Students/Faculty, Remove Users, or Suspend accounts temporarily.
- **Institutional Notices**: Create and manage global announcements with Markdown support.
- **Data Integrity**: Unified monitoring of academic records across all branches with historical data.

---

## 🏗️ Core Architecture & Tech Stack

### 🌐 Frontend (Client-Side)
- **Engine**: Vanilla JavaScript (ES6+) with Modular Design.
- **Styling**: **Tailwind CSS** (Utility-first framework) + Vanilla CSS (**Glassmorphism**, Custom Keyframe Animations).
- **Charts**: **Chart.js 3.9** (Advanced Polar Area, Doughnut, and Linear Market Trends).
- **AI Integration**: **Google Gemini 1.5 Flash** for academic intelligence (Fallbacks included).
- **Icons**: Font Awesome 6 Pro (CDN).
- **Typography**: Google Fonts (Outfit).

### 🖥️ Backend (Server-Side)
- **Runtime**: **Node.js** with **Express.js** framework.
- **Database**: **SQLite3** for persistent SQL-based storage.
- **Security**: **JWT (JSON Web Tokens)** for secure stateless sessions and Role-Based Access Control (RBAC).
- **Password Hashing**: **Bcrypt.js** for high-security credential storage.
- **API Architecture**: REST APIs for Auth, Records, and Notifications.

---

## 📚 Technical Module Breakdown

### `js/api-client.js`
The gateway for all frontend-backend communication. It handles JWT header injection, centralized error handling, and standardized API response parsing for all modules.

### `js/ai.js`
Manages interaction with the Google Gemini API. Includes intelligent prompt engineering and logical fallbacks to mock academic analysis if API limits are reached.

### `js/chart-manager.js`
Dedicated visualization engine. Supports multiple chart types with dynamic theme adaptation (Dark/Light mode) and smooth data transitions.

### `js/db.js` & `js/auth.js`
Orchestrates the transition from legacy `localStorage` to the new SQL-backed session management. `auth.js` manages login flows and secure session persistence.

### `js/ui.js` & `js/events.js`
Core rendering logic and event orchestration. Implemented as a Single Page Application (SPA) experience with view-switching and real-time DOM updates.

---

## 📁 Project Structure

```text
Learning_project/
├── backend/                   # Node.js Express Server
│   ├── src/                  # Controllers, Routes, and API logic
│   ├── database.sqlite       # Local Persistent Storage
│   └── server.js             # API Gateway Entry Point
├── Learning_project/          # Frontend Web Application
│   ├── js/                   # Logical Modules (AI, Charts, API)
│   ├── css/                  # Styling & Global Design Systems
│   ├── frontend/             # Desktop/Mobile view templates
│   └── Perfomence_tracker.html # Unified ERP interface
├── performance_tracker_database.sql # Complete Database Seed Data
└── README.md                  # Comprehensive Documentation
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
- **Node.js**: v16+ (LTS).
- **Web Browser**: Chrome/Edge/Firefox (Latest).

### 2. Implementation Steps
```bash
# Clone the project
git clone <repository-url>
cd Learning_project

# Setup Backend Server
cd backend
npm install
npm start
```

### 3. Usage
The application is now hosted at `http://localhost:5000`. 
- Open your browser to `http://localhost:5000` to access the full-stack system.
- Ensure the backend is running to enable data persistence and AI features.

---

## 🔐 Credentials for Demo

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Administrator** | `admin` | `admin123` | Institutional Management |
| **Faculty** | `faculty1` | `fac123` | Class & Department Control |
| **Student** | `24CSEAIML063` | `password` | AI Learning Hub & Performance |

---

## 🚀 Performance & Security

- **Persistence**: All data resides in a robust SQLite database, ensuring integrity across sessions.
- **UI Responsiveness**: Glassmorphic UI with shimmering loading states and 0.2s cubic-bezier transitions.
- **Lazy Rendering**: Efficient data visualization execution for zero-lag dashboard performance.
- **JWT Protection**: Secure API endpoints ensuring only authorized roles can access or modify data.
- **Input Sanitization**: Built-in XSS protection for chat messages and notifications.
- **Compatibility**: Full support for all modern ES6+ compliant browsers.

---

## 🔮 Future Enhancements
- **Multi-Branch Analytics**: Comparative data for different engineering branches.
- **Email Alerts**: Automatic notifications for attendance dips below threshold.
- **Learning Content**: Integrated study materials in the AI Learning Hub.
- **Mobile PWA**: Progressive Web App for offline access and native-like experience.

---
**Last Updated**: March 25, 2026 | **Version**: 2.1.0 | **Author**: SUBRAT PANIGRAHI
