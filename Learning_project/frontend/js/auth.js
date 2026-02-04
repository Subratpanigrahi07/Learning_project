/**
 * Authentication Module
 * Handles user login, logout, and session management
 */

/**
 * Attempt login with credentials
 */
function attemptLogin(username, password) {
  const user = db.users.find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  return user || null;
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById("username")?.value?.trim() || "";
  const password = document.getElementById("password")?.value?.trim() || "";
  const spinner = document.getElementById("login-spinner");

  if (spinner) spinner.classList.remove("hidden");

  // Simulate network delay
  setTimeout(() => {
    const user = attemptLogin(username, password);
    
    if (spinner) spinner.classList.add("hidden");

    if (!user) {
      showToast("Invalid credentials. Please try again.", "error");
      return;
    }

    currentUser = user;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role,
    }));

    showToast("Signed in successfully.", "success");
    onAuthenticated();
  }, 500);
}

/**
 * Restore user session from storage
 */
function restoreSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.id !== "number") return;
    
    const user = db.users.find(u => u.id === parsed.id);
    if (user) {
      currentUser = user;
      onAuthenticated(true);
    }
  } catch (e) {
    console.warn("Failed to restore session:", e);
  }
}

/**
 * Logout user
 */
function logout() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
  
  // Close AI chat
  const chatWidget = document.getElementById("ai-chat-widget");
  const chatWindow = document.getElementById("ai-chat-window");
  if (chatWidget) chatWidget.classList.add("hidden");
  if (chatWindow) chatWindow.classList.add("hidden");
  aiChatOpen = false;
  
  window.scrollTo(0, 0);
  showLogin();
}

/**
 * Callback after successful authentication
 */
function onAuthenticated(isRestored = false) {
  if (!currentUser) return;
  
  showAppShell();
  updateSidebarForUser();

  // Route to appropriate dashboard
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

  // Clear form
  if (!isRestored) {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
  }
}

/**
 * Show login view
 */
function showLogin() {
  const loginView = document.getElementById("login-view");
  const appShell = document.getElementById("app-shell");
  
  if (loginView) loginView.classList.remove("hidden");
  if (appShell) appShell.classList.add("hidden");
}

/**
 * Show app shell (main interface)
 */
function showAppShell() {
  const loginView = document.getElementById("login-view");
  const appShell = document.getElementById("app-shell");
  
  if (loginView) loginView.classList.add("hidden");
  if (appShell) appShell.classList.remove("hidden");
}
