# Adaptive Performance Tracker (APT)

A comprehensive web-based academic performance management system built with vanilla JavaScript, HTML5, and Tailwind CSS.

## 📋 Overview

APT is a modern ERP system designed for educational institutions to track student performance, manage academic records, and provide real-time analytics on attendance and marks. The application supports three user roles:

- **Students**: Monitor personal academic progress, view trends, and earn achievement badges
- **Faculty**: Manage class attendance and marks, publish announcements, draft notices with AI assistance
- **Admins**: System-wide analytics, user management, and institutional announcements

## 🎯 Features

### Student Features
- **Dashboard**: Real-time performance metrics with visual indicators
- **Performance Analytics**: Attendance percentage and average marks tracking
- **Achievement Badges**: Unlock badges based on performance milestones
- **Trends Analysis**: View subject-wise performance over time
- **Leaderboard**: Compare performance with peers
- **Report Export**: Download personal academic reports as CSV
- **Profile Management**: View and manage academic profile
- **AI Assistant**: Get personalized study recommendations

### Faculty Features
- **Class Dashboard**: Monitor class attendance and performance metrics
- **Bulk Upload**: Import student records via CSV
- **Marks Management**: Record and update student marks and attendance
- **Notice Drafting**: AI-powered academic notice generation
- **Data Export**: Export class data for reporting
- **Announcements**: Publish system-wide notifications
- **Performance Analytics**: Analyze class-wide trends

### Admin Features
- **User Management**: View and manage all system users
- **System Analytics**: Dashboard with performance distribution charts
- **Announcement Management**: Create and publish institutional announcements
- **Data Monitoring**: System-wide performance metrics
- **Report Generation**: Multi-view analytics dashboards

## 🏗️ Project Structure

```
Learning_project/
├── index.html                 # Main HTML file
├── css/
│   ├── styles.css            # Base styles and layout
│   ├── animations.css        # Animation definitions
│   └── theme.css             # Light/dark mode styles
├── js/
│   ├── utils.js              # Utility functions
│   ├── db.js                 # Database & state management
│   ├── auth.js               # Authentication logic
│   ├── ai.js                 # AI assistant integration
│   ├── chart-manager.js      # Chart rendering
│   ├── ui.js                 # UI rendering functions
│   ├── events.js             # Event handlers
│   └── main.js               # Application initialization
├── config/
│   └── tailwind.config.js    # Tailwind CSS configuration
├── assets/                    # Images, icons, etc.
├── docs/
│   ├── README.md             # This file
│   ├── PROJECT_STRUCTURE.md  # Detailed structure guide
│   ├── API.md                # API documentation
│   └── USER_GUIDE.md         # User manual
└── cursor.html               # Original monolithic file (backup)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (uses localStorage)
- Internet connection for CDN resources

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Learning_project
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your web browser
   # Or use a local server (recommended)
   ```

3. **Using a local server (recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   http-server
   
   # Then open: http://localhost:8000
   ```

## 🔐 Demo Credentials

Use these credentials to test the application:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Faculty | `faculty1` | `fac123` |
| Student | `24cse001` | `student123` |

## 📚 Module Documentation

### `utils.js`
Common utility functions used across the application:
- `animateValue()` - Animate numeric values with easing
- `randomInt()` - Generate random integers
- `showToast()` - Display toast notifications
- `calculateCategory()` - Determine student performance category
- `exportToCSV()` - Export data as CSV files
- `getFormattedDate()` - Format dates

### `db.js`
Database and state management:
- Database schema with users, records, and notifications
- `loadDB()` / `saveDB()` - Persistence with localStorage
- `getStudentRecords()` - Retrieve student academic records
- `getStudentAggregates()` - Calculate performance statistics
- `calculateBadges()` - Determine earned achievement badges

### `auth.js`
Authentication and user management:
- `attemptLogin()` - User login validation
- `handleLogin()` - Form submission handler
- `restoreSession()` - Session recovery
- `logout()` - User logout
- `initTheme()` / `toggleTheme()` - Theme management

### `ai.js`
AI assistant integration:
- `toggleAIChat()` - Open/close chat widget
- `sendAIMessage()` - Process user messages
- `callGemini()` - Gemini API integration with fallbacks
- Mock responses for performance analysis and notice generation

### `chart-manager.js`
Chart visualization:
- `renderTrendsChart()` - Subject performance trends
- `renderAdminCategoryChart()` - Performance distribution
- `renderAdminAnalyticsChart()` - Detailed analytics
- Chart.js integration with theme support

### `ui.js`
User interface rendering:
- `switchView()` - Navigate between views
- `updateSidebarForUser()` - Dynamic sidebar based on role
- `renderStudentDashboard()` - Student overview
- `renderFacultyDashboard()` - Faculty class management
- `renderAdminDashboard()` - System administration
- `renderBadges()` - Achievement badges display
- `renderNotificationsList()` - Announcements

### `events.js`
Event handling and interactions:
- `setupEventListeners()` - Wire all event handlers
- `exportStudentReport()` - CSV export functionality
- `exportClassData()` - Faculty data export
- `handleBulkUpload()` - CSV import processing
- Search and filter implementations
- Keyboard shortcuts (Ctrl+K for AI, Ctrl+L for logout)

### `main.js`
Application initialization:
- DOM ready event handler
- Initial theme setup
- Session restoration
- Cleanup on unload

## 🎨 Styling

### CSS Architecture
- **styles.css** - Base styles, glass morphism, layout
- **animations.css** - Keyframe animations and transitions
- **theme.css** - Light/dark mode color schemes
- **Tailwind CSS** - Utility-first framework via CDN

### Design Features
- Glass morphism cards with hover effects
- Smooth fade-in and slide animations
- Responsive grid layouts
- Dark mode with colorful gradient background
- Light mode with modern gradient animations

## 🔗 External Dependencies

### CDN Resources
- **Tailwind CSS** - CSS framework
- **Font Awesome 6** - Icon library
- **Chart.js 3.9** - Chart library
- **Marked.js** - Markdown parser
- **Google Fonts** - Outfit font

### APIs
- **Google Gemini** - AI-powered assistance (fallback mode)

## 💾 Data Storage

The application uses browser's **localStorage** for persistence:
- Database key: `apt_db_v4`
- Session key: `apt_session`
- Theme preference: `apt_theme`

**Note**: Data persists across browser sessions but is device-specific.

## 🔄 Data Flow

```
User Input
    ↓
Event Listeners (events.js)
    ↓
Data Processing (utils.js, db.js)
    ↓
State Update (db.js)
    ↓
UI Rendering (ui.js)
    ↓
Visual Update
```

## 🚀 Performance Optimization

- Lazy rendering of charts
- CSS animations using transform and opacity
- Debounced search filtering
- Efficient DOM queries
- CSS class reuse via Tailwind
- Minimal JavaScript re-renders

## 🔒 Security Notes

- Passwords stored in localStorage (demo only - use backend auth in production)
- Input sanitization for HTML content
- CORS-enabled for external APIs
- XSS protection in chat messages

## 🐛 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE 11: Not supported (uses ES6)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar collapses on mobile
- Touch-friendly buttons and inputs

## 🔮 Future Enhancements

- Backend API integration
- Database persistence (PostgreSQL/MongoDB)
- Advanced analytics and reporting
- Email notifications
- Mobile app (React Native)
- Dark mode scheduler
- Offline functionality (PWA)
- User preferences customization

## 📄 License

This project is open-source and available for educational use.

## 👨‍💻 Contributing

Contributions are welcome! Please follow these guidelines:
1. Keep code modular and well-documented
2. Follow existing code style
3. Update documentation for new features
4. Test on multiple browsers

## 📞 Support

For questions or issues, please refer to:
- `PROJECT_STRUCTURE.md` - Detailed file organization
- `API.md` - Function reference
- `USER_GUIDE.md` - End-user documentation

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready
