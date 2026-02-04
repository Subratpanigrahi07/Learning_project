/**
 * Theme Management Module
 * Handles light/dark mode switching and persistence
 */

let isDarkMode = true;

/**
 * Initialize theme on page load
 */
function initTheme() {
  const saved = localStorage.getItem("apt_theme");
  
  if (saved === "light") {
    isDarkMode = false;
    document.body.classList.add("light-mode");
  } else {
    isDarkMode = true;
    document.body.classList.remove("light-mode");
  }

  updateThemeButton();
}

/**
 * Toggle between dark and light modes
 */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  
  if (isDarkMode) {
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  updateThemeButton();
  localStorage.setItem("apt_theme", isDarkMode ? "dark" : "light");
  showToast(isDarkMode ? "Dark mode enabled" : "Light mode enabled", "info");
}

/**
 * Update theme button appearance
 */
function updateThemeButton() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const icon = themeToggle.querySelector("i");
  if (icon) {
    icon.className = isDarkMode
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";
  }
}

/**
 * Get current theme
 */
function getCurrentTheme() {
  return isDarkMode ? "dark" : "light";
}
