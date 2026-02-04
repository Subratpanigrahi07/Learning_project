# Setup Guide

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Node.js (optional, for backend setup)

### Installation

1. **Clone/Download Project**
   ```bash
   cd Learning_project
   ```

2. **Open in Browser**
   - Open `index.html` directly in browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
   Then visit: `http://localhost:8000`

3. **Login**
   - Admin: `admin` / `password`
   - Faculty: `faculty1` / `password`
   - Student: `24CSEAIML063` / `password`

## Project Structure

```
frontend/
├── html/          # HTML components
├── css/           # Stylesheets
└── js/            # JavaScript modules

backend/          # Optional: Node.js API
config/           # Configuration & seed data
docs/             # Documentation
```

## File Organization

### HTML Files
- `frontend/html/login.html` - Login screen
- `frontend/html/dashboards/` - Role-specific dashboards
- `frontend/html/views/` - Additional pages
- `frontend/html/components/` - Reusable components

### CSS Files
- `frontend/css/variables.css` - CSS variables & theme
- `frontend/css/animations.css` - Keyframe animations
- `frontend/css/components.css` - Component styles
- `frontend/css/theme.css` - Light/dark mode

### JavaScript Files
- `frontend/js/database.js` - Data persistence
- `frontend/js/auth.js` - Authentication
- `frontend/js/utils.js` - Helper functions
- `frontend/js/features/` - Feature modules

## Configuration

### API Keys
Edit `index.html` or `frontend/js/api.js`:
```javascript
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
```

### Database
Seed data in `config/database-seed.js`:
```javascript
function seedDatabase() {
  // Add your student data, subjects, etc.
}
```

### Theme Colors
Edit `frontend/css/variables.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --success: #10b981;
  /* etc... */
}
```

## Development

### Running Locally

1. **Start a web server:**
   ```bash
   cd Learning_project
   python -m http.server 8000
   ```

2. **Open browser:**
   Visit `http://localhost:8000`

3. **Open DevTools:**
   Press `F12` or `Ctrl+Shift+I`

### Debugging

- Check Console for errors
- Use Network tab to monitor API calls
- Use Application tab to inspect localStorage
- Set breakpoints in Sources tab

### Making Changes

1. **Edit files** in `frontend/` or main `index.html`
2. **Refresh browser** (Ctrl+R or Cmd+R)
3. **Check Console** for any errors
4. **Test thoroughly** before committing

## Backend Setup (Optional)

### Node.js Server

1. **Install dependencies:**
   ```bash
   npm install express cors dotenv
   ```

2. **Create server.js:**
   ```javascript
   const express = require('express');
   const app = express();
   
   app.use(express.static('public'));
   app.listen(3000, () => {
     console.log('Server running on port 3000');
   });
   ```

3. **Run server:**
   ```bash
   node backend/server.js
   ```

### Database Setup

1. **MongoDB (Cloud):**
   - Create account at mongodb.com
   - Get connection string
   - Add to `.env` file

2. **SQLite (Local):**
   ```bash
   npm install sqlite3
   ```

3. **Seed database:**
   ```bash
   node config/database-seed.js
   ```

## Troubleshooting

### Issue: "DB_KEY not found"
**Solution**: Check localStorage is not disabled
```javascript
// Test in console:
localStorage.getItem('apt_db_v4');
```

### Issue: "API key invalid"
**Solution**: Update Gemini API key in code
```javascript
const GEMINI_API_KEY = "YOUR_NEW_KEY";
```

### Issue: "Styles not loading"
**Solution**: Ensure Tailwind CDN is working
```html
<!-- Check in Network tab for tailwindcss CDN -->
```

### Issue: "Charts not rendering"
**Solution**: Verify Chart.js CDN link
```javascript
// Test in console:
console.log(typeof Chart);
```

## Testing Checklist

### Authentication
- [ ] Admin login works
- [ ] Faculty login works
- [ ] Student login works
- [ ] Invalid credentials rejected
- [ ] Logout clears session
- [ ] Session persists on page reload

### Student Features
- [ ] Dashboard displays correctly
- [ ] Attendance tracked
- [ ] Marks visible
- [ ] Profile page works
- [ ] AI chat functional
- [ ] Trends chart renders
- [ ] Leaderboard shows correct ranking
- [ ] Export CSV works

### Faculty Features
- [ ] Class analytics visible
- [ ] Student search works
- [ ] Mark submission works
- [ ] Bulk upload works
- [ ] Notice drafting works
- [ ] Announcements post correctly

### Admin Features
- [ ] User management works
- [ ] Analytics charts render
- [ ] All announcements visible
- [ ] Database stats correct

### UI/UX
- [ ] Theme toggle works
- [ ] Light mode looks good
- [ ] Dark mode looks good
- [ ] Responsive on mobile
- [ ] Animations smooth
- [ ] No console errors
- [ ] Toast notifications appear

## Performance Tips

1. **Clear Cache**: Ctrl+Shift+Del
2. **Disable Extensions**: May interfere with APIs
3. **Use Chrome DevTools**: For profiling
4. **Monitor Network**: Check API response times

## Security Notes

⚠️ **Development Only**:
- API keys visible in code
- Passwords stored in frontend
- No HTTPS
- No server validation

**Production Requirements**:
- Backend authentication
- JWT tokens
- Environment variables
- HTTPS only
- Input sanitization
- Rate limiting

## Getting Help

1. Check browser console for errors
2. Review `docs/ARCHITECTURE.md`
3. Check `FEATURES.md` for specific features
4. Review code comments in JavaScript files

## Next Steps

1. Customize student data in `config/database-seed.js`
2. Update colors in `frontend/css/variables.css`
3. Add your own subjects and courses
4. Connect to real backend API
5. Deploy to production
