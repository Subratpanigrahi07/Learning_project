# Project Architecture

## Overview
Adaptive Performance Tracker (APT) is a comprehensive academic performance management system designed for colleges and universities. It provides role-based dashboards for Students, Faculty, and Administrators.

## Project Structure

```
Learning_project/
├── index.html                 # Main entry point (original complete file)
│
├── frontend/                  # All frontend code
│   ├── html/
│   │   ├── login.html        # Login screen component
│   │   ├── dashboards/
│   │   │   ├── student-dashboard.html
│   │   │   ├── faculty-dashboard.html
│   │   │   └── admin-dashboard.html
│   │   ├── views/            # Additional view pages
│   │   │   ├── student-views.html
│   │   │   ├── faculty-views.html
│   │   │   └── admin-views.html
│   │   └── components/       # Reusable components
│   │       ├── sidebar.html
│   │       ├── modals.html
│   │       └── ai-chat.html
│   │
│   ├── css/
│   │   ├── variables.css     # CSS custom properties & theme
│   │   ├── animations.css    # Animation keyframes
│   │   ├── components.css    # Reusable component styles
│   │   └── theme.css         # Light/dark mode styles
│   │
│   └── js/
│       ├── database.js       # Data persistence & queries
│       ├── auth.js           # Authentication & sessions
│       ├── api.js            # External API calls
│       ├── ui.js             # View rendering
│       ├── events.js         # Event handlers
│       ├── utils.js          # Helper functions
│       └── features/         # Feature modules
│           ├── student.js    # Student functionality
│           ├── faculty.js    # Faculty functionality
│           ├── admin.js      # Admin functionality
│           ├── ai-chat.js    # AI integration
│           ├── charts.js     # Chart rendering
│           ├── notifications.js
│           ├── export.js     # Data export
│           └── themes.js     # Theme management
│
├── backend/                   # Backend API (optional)
│   ├── server.js             # Node.js server setup
│   ├── routes/               # API routes
│   ├── middleware/           # Express middleware
│   └── config/               # Configuration files
│
├── config/
│   └── database-seed.js      # Initial database seed data
│
├── docs/                      # Documentation
│   ├── ARCHITECTURE.md       # This file
│   ├── SETUP.md              # Setup instructions
│   ├── API.md                # API documentation
│   └── FEATURES.md           # Feature descriptions
│
├── css/                       # Additional CSS (from original)
├── js/                        # Additional JS (from original)
└── Perfomence_tracker.html    # Original complete file (backup)
```

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS 3** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Chart.js 3.9.1** - Data visualization
- **Marked.js** - Markdown parsing
- **Font Awesome 6.5.1** - Icons

### Backend (Optional)
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB/SQLite** - Database

### APIs
- **Google Gemini API** - AI-powered features

## Key Features

### Student Dashboard
- **Overview**: Attendance, marks, status, profile preview
- **Subject Performance**: Per-subject tracking
- **Attendance Tracking**: Detailed attendance records
- **Marks Management**: Grade tracking
- **Profile Page**: Student information and badges
- **AI Study Companion**: Personalized recommendations
- **Trends Analysis**: Performance trends over time
- **Leaderboard**: Class ranking

### Faculty Dashboard
- **Class Analytics**: Student performance overview
- **Student Management**: Search and filter students
- **Marks Upload**: Single and bulk upload capability
- **Notice Creation**: AI-assisted notice drafting
- **Announcements**: Post updates for students
- **Export**: Export class data to CSV

### Admin Dashboard
- **User Management**: View and manage all users
- **Analytics**: System-wide performance charts
- **Announcements**: Post system-wide notices
- **Reports**: Generate various reports
- **Database Management**: Manage seed data

## State Management

### Global Variables
```javascript
let db = null;              // Database object
let currentUser = null;     // Current logged-in user
let isDarkMode = true;      // Theme preference
let aiChatOpen = false;     // AI chat state
```

### localStorage Keys
- `apt_db_v4` - Database
- `apt_theme` - Theme preference
- `apt_session` (sessionStorage) - Current session

## Data Models

### User
```javascript
{
  id: number,
  username: string,
  password: string,
  role: "STUDENT" | "FACULTY" | "ADMIN",
  fullName: string,
  rollNo?: string,
  email?: string,
  branch?: string,
  semester?: string
}
```

### AcademicRecord
```javascript
{
  studentId: number,
  subjectCode: string,
  semester: string,
  total: number,      // Total classes
  attended: number,   // Classes attended
  marks: number       // Marks obtained (0-100)
}
```

### Notification
```javascript
{
  id: number,
  title: string,
  message: string,
  date: string,       // YYYY-MM-DD
  author: string
}
```

## Authentication

### Demo Accounts
```
Admin:     admin / password
Faculty:   faculty1 / password
Student:   24CSEAIML063 / password
```

### Session Flow
1. User logs in with credentials
2. Session stored in `sessionStorage`
3. App routes to appropriate dashboard
4. On page reload, session is restored
5. Logout clears session

## AI Integration

### Gemini API
- **Model**: gemini-2.5-flash-latest
- **Key**: Stored in code (production: use env vars)
- **Features**:
  - Student performance analysis
  - Faculty notice drafting
  - Study recommendations
  - Chat assistant

### Fallback Logic
If API fails:
- Uses smart mock responses
- Based on user role and context
- Maintains user experience

## Development Guide

### Adding a New View
1. Create HTML in `frontend/html/views/`
2. Create renderer function in `frontend/js/ui.js`
3. Add navigation handler in `frontend/js/events.js`
4. Update `switchView()` function

### Adding a New Feature Module
1. Create file in `frontend/js/features/`
2. Follow naming convention: `feature-name.js`
3. Export functions for external use
4. Import in main JavaScript file

### Adding CSS
1. Create in `frontend/css/`
2. Use CSS variables for consistency
3. Follow BEM naming convention
4. Include in main stylesheet

## Performance Considerations

- **Lazy Loading**: Charts rendered on demand
- **Animation Debouncing**: Input events debounced
- **LocalStorage Caching**: Reduced API calls
- **CSS Classes Over Inline**: Better performance
- **Event Delegation**: Fewer event listeners

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors
- Screen reader friendly

## Security Notes

⚠️ **Important**: 
- Demo passwords visible in code (for demo only)
- Production should use:
  - Backend authentication
  - JWT tokens
  - HTTPS only
  - Environment variables for secrets
  - Rate limiting
  - Input validation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- No IE support

## Future Enhancements

- [ ] Backend API integration
- [ ] Database persistence
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Predictive analysis
- [ ] Video integration
