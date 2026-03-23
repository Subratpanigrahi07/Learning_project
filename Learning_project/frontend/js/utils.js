/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

/**
 * Show toast notification
 */
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  const icon = document.getElementById("toast-icon");

  if (!toast || !msg || !icon) return;

  msg.textContent = message;

  if (type === "success") {
    icon.innerHTML = '<i class="fa-solid fa-check-circle"></i>';
    icon.className = "text-emerald-400";
  } else if (type === "info") {
    icon.innerHTML = '<i class="fa-solid fa-info-circle"></i>';
    icon.className = "text-sky-400";
  } else {
    icon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    icon.className = "text-rose-400";
  }

  toast.classList.remove("hidden", "opacity-0");
  toast.classList.add("animate-fade-in");

  setTimeout(() => {
    toast.classList.remove("animate-fade-in");
    toast.classList.add("opacity-0");
  }, 200);

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

/**
 * Animate number value on screen
 */
function animateValue(element, start, end, duration, suffix = "") {
  if (!element) return;

  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get color class based on percentage
 */
function getColorClass(percentage, type = "percentage") {
  if (type === "percentage") {
    if (percentage >= 80) return "text-emerald-400";
    if (percentage >= 60) return "text-amber-400";
    return "text-rose-400";
  } else if (type === "marks") {
    if (percentage >= 90) return "text-emerald-400";
    if (percentage >= 70) return "text-sky-400";
    if (percentage >= 50) return "text-amber-400";
    return "text-rose-400";
  }
  return "text-slate-400";
}

/**
 * Get background color class
 */
function getBgColorClass(percentage) {
  if (percentage >= 75) return "bg-emerald-500/20";
  if (percentage >= 60) return "bg-amber-500/20";
  return "bg-rose-500/20";
}

/**
 * Debounce function for search inputs
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Check if user has specific role
 */
function hasRole(role) {
  return currentUser && currentUser.role === role;
}

/**
 * Export data to CSV
 */
function downloadCSV(data, filename) {
  const headers = Object.keys(data[0] || {});
  const csv = [
    headers.join(","),
    ...data.map(row => headers.map(header => `"${row[header] || ""}"`).join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
