/* ===================================
   APPLICATION INITIALIZATION
   =================================== */

/**
 * Initialize the application on DOM load
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Adaptive Performance Tracker...");
  
  // Initialize theme
  initTheme();
  
  // Setup event listeners
  setupEventListeners();
  
  // Try to restore session
  restoreSession();
  
  // If user is logged in, show app; otherwise show login
  if (currentUser) {
    onAuthenticated(true);
  } else {
    showLogin();
  }
  
  // Update notification badge
  updateNotificationBadge();
  
  console.log("Application initialized successfully!");
});

/**
 * Graceful cleanup on page unload
 */
window.addEventListener("beforeunload", () => {
  // Charts cleanup
  if (adminCategoryChart) adminCategoryChart.destroy();
  if (trendsChart) trendsChart.destroy();
  if (adminAnalyticsChartView) adminAnalyticsChartView.destroy();
  console.log("Application cleanup complete");
});
