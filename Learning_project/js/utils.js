/* ===================================
   UTILITY FUNCTIONS
   =================================== */

/**
 * Animate numeric values from start to end
 * @param {HTMLElement} element - Target element
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in ms
 * @param {string} suffix - Suffix for the value (e.g., '%', 'px')
 */
function animateValue(element, start, end, duration, suffix = "") {
  if (!element) return;
  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

/**
 * Generate random integer between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Type: 'error', 'success', 'info'
 */
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  const icon = document.getElementById("toast-icon");
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
 * Calculate performance category
 * @param {number} attendancePct - Attendance percentage
 * @param {number} marks - Average marks
 * @returns {string} Category: 'Good', 'Average', or 'At-Risk'
 */
function calculateCategory(attendancePct, marks) {
  if (attendancePct >= 75 && marks >= 70) return "Good";
  if (attendancePct >= 60 && marks >= 50) return "Average";
  return "At-Risk";
}

/**
 * Export data to CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - CSV filename
 */
function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map(row => headers.map(header => `"${row[header] || ""}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Get formatted date as YYYY-MM-DD
 * @returns {string} Formatted date
 */
function getFormattedDate() {
  return new Date().toISOString().slice(0, 10);
}
