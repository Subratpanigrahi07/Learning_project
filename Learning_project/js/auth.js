/* ===================================
   AUTHENTICATION MANAGEMENT
   =================================== */

/**
 * Attempt user login
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Object|null} User object if authenticated, null otherwise
 */
function attemptLogin(username, password) {
  const user = db.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  return user || null;
}

/**
 * Handle login form submission
 * @param {Event} event - Form submission event
 */
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const spinner = document.getElementById("login-spinner");

  spinner.classList.remove("hidden");

  setTimeout(() => {
    const user = attemptLogin(username, password);
    spinner.classList.add("hidden");

    if (!user) {
      showToast("Invalid credentials. Please try again.", "error");
      return;
    }

    currentUser = user;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id }));
    showToast("Signed in successfully.", "success");
    onAuthenticated();
  }, 500);
}

/**
 * Restore user session from sessionStorage
 */
function restoreSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.id !== "number") return;
    const user = db.users.find((u) => u.id === parsed.id);
    if (user) {
      currentUser = user;
    }
  } catch (e) {
    console.warn("Failed to restore session.", e);
  }
}

/**
 * Logout current user
 */
function logout() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
  // Close AI chat
  document.getElementById("ai-chat-widget").classList.add("hidden");
  document.getElementById("ai-chat-window").classList.add("hidden");
  aiChatOpen = false;
  window.scrollTo(0, 0);
  showLogin();
}

/**
 * Handle post-authentication setup
 * @param {boolean} isRestored - Whether session was restored
 */
function onAuthenticated(isRestored = false) {
  if (!currentUser) return;
  showAppShell();
  updateSidebarForUser();

  if (currentUser.role === "STUDENT") {
    renderStudentDashboard();
    switchView("student-dashboard");
  } else if (currentUser.role === "FACULTY") {
    renderFacultyDashboard();
    switchView("faculty-dashboard");
  } else if (currentUser.role === "ADMIN") {
    renderAdminDashboard();
    switchView("admin-dashboard");
  }

  if (!isRestored) {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

/**
 * Show login view
 */
function showLogin() {
  document.getElementById("login-view").classList.remove("hidden");
  document.getElementById("app-shell").classList.add("hidden");
  renderLoginForm();
}

/**
 * Show app shell
 */
function showAppShell() {
  document.getElementById("login-view").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
}

/**
 * Render login form
 */
function renderLoginForm() {
  const container = document.querySelector("#login-view .relative");
  container.innerHTML = `
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 mb-4">
        <i class="fa-solid fa-chart-line text-2xl text-white"></i>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-100 mb-2">APT</h1>
      <p class="text-slate-400 text-sm">Adaptive Performance Tracker</p>
    </div>
    <form id="login-form" class="space-y-4">
      <div>
        <label for="username" class="block text-xs font-semibold text-slate-300 mb-2">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          class="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-xs font-semibold text-slate-300 mb-2">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          class="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition flex items-center justify-center gap-2"
      >
        <span id="login-spinner" class="hidden h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin-soft"></span>
        <span>Sign In</span>
      </button>
    </form>
    <div class="mt-6 pt-6 border-t border-slate-700 space-y-2 text-xs text-slate-400">
      <p><strong>Demo Credentials:</strong></p>
      <p>Admin: <code class="bg-slate-900 px-2 py-1 rounded">admin / admin123</code></p>
      <p>Faculty: <code class="bg-slate-900 px-2 py-1 rounded">faculty1 / fac123</code></p>
      <p>Student: <code class="bg-slate-900 px-2 py-1 rounded">24cse001 / student123</code></p>
    </div>
  `;
}

/**
 * Initialize theme from localStorage
 */
function initTheme() {
  const saved = localStorage.getItem("apt_theme");
  if (saved === "light") {
    isDarkMode = false;
    document.body.classList.add("light-mode");
  }
}

/**
 * Toggle dark/light theme
 */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("light-mode");
  const themeIcon = document.querySelector("#theme-toggle i");
  if (themeIcon) {
    themeIcon.className = isDarkMode ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
  localStorage.setItem("apt_theme", isDarkMode ? "dark" : "light");
}
