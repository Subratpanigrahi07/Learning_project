# Adaptive Performance Tracker - User Guide

## 🎓 Getting Started

### Logging In

1. **Open the application** in your web browser (open `index.html`)
2. **Enter credentials** using one of the demo accounts:
   
   | User Type | Username | Password | Purpose |
   |-----------|----------|----------|---------|
   | Student | `24cse001` | `student123` | View personal performance |
   | Faculty | `faculty1` | `fac123` | Manage class records |
   | Admin | `admin` | `admin123` | System-wide management |

3. **Click "Sign In"** button
4. You'll be redirected to your role-specific dashboard

### Logging Out
- Click the **Logout** button in the sidebar
- Your session will be cleared and you'll return to the login page

---

## 👨‍🎓 STUDENT GUIDE

### Dashboard
The main dashboard shows your academic performance at a glance:

- **Attendance %**: Your overall class attendance
- **Average Marks**: Your average performance across all subjects
- **Category Badge**: Your current performance status
  - 🟢 **Good**: Attendance ≥75% AND Marks ≥70
  - 🟡 **Average**: Attendance ≥60% AND Marks ≥50
  - 🔴 **At-Risk**: Below average thresholds

### Subject Cards
Below your overall stats, you'll see cards for each subject showing:
- Subject code and name
- Attendance percentage for that subject
- Latest marks received
- Category for that specific subject

**Click on any subject card** to see detailed history.

### Profile Page
View your complete academic profile:
- Personal details (Name, Roll Number, Email, Branch)
- Overall performance statistics
- Achievement badges you've earned

### Achievement Badges 🏆
Earn badges by meeting performance milestones:

| Badge | Icon | Requirement |
|-------|------|-------------|
| Perfect Attendance | 🔥 | Attendance ≥90% |
| Excellent Marks | ⭐ | Average marks ≥90 |
| Top Performer | 🏆 | Category: Good |
| Dedicated Learner | 📚 | 3+ recorded subjects |
| Consistent Achiever | 🎖️ | Attendance ≥75% AND Marks ≥70 |
| Excellence Seeker | ⚡ | Any subject ≥95 marks |

### Trends Analysis
Navigate to **Trends** to see visual charts:

1. **View Performance Over Time**: Line chart showing marks trends
2. **Filter by Subject Type**:
   - **All**: View all subjects
   - **Theory**: Only theoretical subjects
   - **Lab**: Only practical/lab subjects

**How to read the chart**:
- X-axis: Subject codes
- Y-axis: Marks (0-100)
- Each color represents a different subject

### Export Report
Download your academic record as CSV:

1. Click **Export Report** button on dashboard
2. A CSV file will download to your computer
3. Open in Excel or spreadsheet application
4. Contains attendance, marks, and category information

### AI Assistant 🤖
Get personalized academic guidance:

1. **Click the AI Chat Button** (bottom-right corner with robot icon)
2. **Type your question**, for example:
   - "How's my performance?"
   - "What subjects need improvement?"
   - "Study tips for better marks"
3. **AI responds** with personalized recommendations
4. **Keyboard shortcut**: Press `Ctrl+K` to quickly open chat

**Example AI Responses**:
- Performance analysis with suggestions
- Study tips based on your current marks
- Subject-specific advice
- Time management recommendations

### Dark/Light Mode
Toggle between themes:
- Click the **Sun/Moon icon** in top-right
- Your preference is saved automatically

---

## 👨‍🏫 FACULTY GUIDE

### Dashboard
Overview of your class performance:

- **Total Students**: Number of students in your class
- **Average Attendance**: Class-wide attendance percentage
- **At-Risk Count**: Number of students needing intervention

### Class Management
View all students in your class with their:
- Name and roll number
- Current attendance percentage
- Average marks
- Performance category

**Features**:
- **Search**: Type student name to filter
- **Filter by Status**: Show Good/Average/At-Risk students only
- **Sort**: Click column headers to sort

### Marks & Attendance Upload

#### Method 1: Single Entry
1. Select a **student** from the dropdown
2. Enter **subject code** (e.g., CS101)
3. Enter **total classes** for that subject
4. Enter **classes attended**
5. Enter **marks obtained** (0-100)
6. Click **Save** button

#### Method 2: Bulk Upload (CSV)
1. Click **Bulk Upload** button
2. Prepare CSV file with format:
   ```
   StudentID,SubjectCode,Total,Attended,Marks
   24CSE001,CS101,40,32,85
   24CSE002,CS101,40,30,78
   ```
3. **Download Template** if needed
4. Paste CSV content in text area
5. Click **Upload**
6. Review results (shows success/error count)

**CSV Format Details**:
- **StudentID**: Roll number of student (e.g., 24CSE001)
- **SubjectCode**: Course code (e.g., CS101)
- **Total**: Total classes held in semester
- **Attended**: Classes attended by student
- **Marks**: Marks obtained (0-100)

### Notice & Announcements
Draft and publish official notices:

1. Click **Draft Notice** or **Write Announcement**
2. Enter **topic** (e.g., "Assignment Due Date")
3. **AI-assisted drafting** (optional):
   - Click draft button
   - AI generates professional notice text
4. **Edit** the content if needed
5. Click **Publish** to send to all students
6. Notice appears in announcements section

**Notice Template** (AI-generated):
```
NOTICE
Date: [Current Date]
Topic: [Your topic]

Dear Students,

This is to inform you regarding [topic].
Please take note of the following details...

Regards,
Faculty Administration
```

### Data Export
Export class data as CSV:

1. Click **Export Class Data** button
2. CSV file downloads containing:
   - All student names and roll numbers
   - Attendance percentage
   - Average marks
   - Performance category
3. Open in Excel for further analysis

### Performance Analytics
View class-wide trends:
- Subject-wise performance
- Attendance trends
- At-risk student identification
- Category distribution

---

## 👨‍💼 ADMIN GUIDE

### Dashboard
System-wide performance overview:

- **Total Users**: All registered users
- **Total Students**: Enrolled students count
- **At-Risk Students**: Students needing support
- **Performance Chart**: Visual distribution of categories

### Charts
Interactive analytics with two chart types:

1. **Bar Chart**: Compares Good/Average/At-Risk counts
2. **Pie Chart**: Shows percentage distribution

**Toggle Chart Type**:
- Click chart type icon in top-right of chart
- Automatically refreshes with new view type

### User Management
Complete user database view:

**View All Users**:
1. Navigate to **Users** page
2. See complete user list with:
   - ID
   - Username
   - Role (Admin/Faculty/Student)
   - Full Name
   - Additional details (Email, Branch, etc.)

**Search Users**:
- Type in search box
- Filters by name, username, or email
- Real-time filtering

**User Details**:
- Click on any user row to see extended information
- Role-specific data:
  - **Students**: Attendance, marks, category
  - **Faculty**: Branch assignment, class size
  - **Admins**: System permissions

### System Announcements
Create institution-wide announcements:

1. Navigate to **Announcements**
2. Enter **announcement title**
3. Enter **message content**
4. **Date** is automatically set to today
5. Click **Post Announcement**
6. Appears on all dashboards

**Who sees announcements**:
- ✅ All students
- ✅ All faculty
- ✅ All admins
- ✅ Persists in database

### Analytics & Reports
Detailed system analytics:

1. **Navigate to Analytics**
2. **View performance distribution**:
   - Total students in each category
   - Trends over time
   - Departmental comparisons
3. **Export reports**:
   - Use browser's print function (`Ctrl+P`)
   - Save as PDF for archival

### System Configuration

**Theme Management**:
- Toggle Dark/Light mode (same as students/faculty)
- Preference saved automatically

**Notification Settings**:
- Badge shows unread announcements
- Click to mark as read

---

## 🔧 Common Tasks

### How to Check a Student's Progress
1. **Login as Faculty or Admin**
2. Go to **Class** (Faculty) or **Users** (Admin)
3. **Search** for student name
4. **Click** on student row
5. View:
   - Attendance percentage
   - Average marks
   - Performance category
   - Subject-wise breakdown

### How to Improve Attendance
**As Faculty**:
1. Identify at-risk students from dashboard
2. Publish reminder notice
3. Upload corrected attendance records
4. Monitor improvements in next update

**As Student**:
1. Check attendance in dashboard
2. Review notes in each subject
3. Plan to attend future classes
4. Check updated stats after attendance recorded

### How to Support At-Risk Students
**As Faculty**:
1. Use search to find at-risk students
2. Publish **study tips** announcement
3. Offer **additional sessions**
4. Share **resources** via announcements
5. Track progress with bulk uploads

**As Admin**:
1. Review at-risk count on dashboard
2. Send **institutional support** announcements
3. Identify struggling branches/departments
4. Escalate to faculty if needed

### How to Export Data
**Students**: Export personal report
- Click **Export Report**
- Gets CSV with your stats

**Faculty**: Export class data
- Click **Export Class Data**
- Gets CSV with all students

**Admin**: Export user database
- Use **Users** page
- Browser's print as PDF feature

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Open AI Chat |
| `Ctrl+L` / `Cmd+L` | Logout |

---

## 🔐 Privacy & Security

### Your Data
- Data stored locally in browser (localStorage)
- No data sent to external servers (except AI chat)
- Persists across browser sessions

### Password Security
- Change default demo passwords in production
- Use strong passwords (8+ characters)
- Never share credentials

### Logout Practice
- Always logout when done
- Clear browser data for shared computers
- Session expires automatically after inactivity

---

## 🐛 Troubleshooting

### Issue: Can't Login
**Solution**:
- Check username and password spelling
- Verify CAPS LOCK is off
- Try demo credentials to verify access
- Clear browser cookies: Settings → Clear Browsing Data

### Issue: Data Not Saving
**Solution**:
- Check browser localStorage is enabled
- Private/Incognito mode won't save data
- Refresh page after upload
- Check for error messages (red toast)

### Issue: Charts Not Displaying
**Solution**:
- Refresh the page (`F5`)
- Check internet connection (needs CDN)
- Verify Chart.js is loaded (check console)
- Try different browser

### Issue: Slow Performance
**Solution**:
- Close unnecessary browser tabs
- Clear browser cache
- Reduce dataset size (fewer records)
- Use modern browser (Chrome/Firefox)

### Issue: Theme Not Changing
**Solution**:
- Click theme toggle again
- Refresh page
- Check localStorage is enabled
- Try different browser

---

## 📞 Help & Support

### Need Help?
1. **Read this guide** - covers most common tasks
2. **Check [README.md](./README.md)** - technical overview
3. **Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - architecture
4. **Contact administrator** - for system-specific issues

### Reporting Issues
Provide:
- Your role (Student/Faculty/Admin)
- What you were trying to do
- What went wrong
- Error messages (if any)
- Browser and OS

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Feedback**: Always welcome!
