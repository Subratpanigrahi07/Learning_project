/* ===================================
   EVENT LISTENERS & HANDLERS
   =================================== */

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Form submissions
  document.getElementById("login-form")?.addEventListener("submit", handleLogin);

  // Navigation
  document.getElementById("logout-btn")?.addEventListener("click", () => logout());

  // Theme toggle
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // AI Chat
  document.getElementById("ai-chat-toggle")?.addEventListener("click", toggleAIChat);
  document.getElementById("ai-chat-button")?.addEventListener("click", toggleAIChat);
  document.getElementById("ai-chat-close")?.addEventListener("click", () => {
    document.getElementById("ai-chat-window").classList.add("hidden");
    aiChatOpen = false;
  });
  document.getElementById("ai-chat-send")?.addEventListener("click", () => {
    const input = document.getElementById("ai-chat-input");
    if (input?.value.trim()) {
      sendAIMessage(input.value.trim());
      input.value = "";
    }
  });
  document.getElementById("ai-chat-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      sendAIMessage(e.target.value.trim());
      e.target.value = "";
    }
  });

  // Trends view
  document.getElementById("filter-all")?.addEventListener("click", () => renderTrendsChart('all'));
  document.getElementById("filter-theory")?.addEventListener("click", () => renderTrendsChart('theory'));
  document.getElementById("filter-lab")?.addEventListener("click", () => renderTrendsChart('lab'));

  // Chart type toggle
  const chartToggle = document.getElementById("chart-type-toggle");
  if (chartToggle) {
    chartToggle.addEventListener("click", () => {
      renderAdminDashboard();
    });
  }

  // Navigation buttons for views
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const viewId = btn.getAttribute('data-nav');
      switchView(viewId);
      
      // Render specific views when navigated
      if (viewId === 'trends-view') renderTrendsChart();
      if (viewId === 'admin-analytics') renderAdminAnalyticsChart();
    });
  });

  // Keyboard shortcuts
  setupKeyboardShortcuts();
}

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K for AI chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleAIChat();
    }
    // Ctrl/Cmd + L for logout
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      logout();
    }
  });
}

/**
 * Export student report to CSV
 */
function exportStudentReport() {
  if (!currentUser || currentUser.role !== "STUDENT") return;
  const records = getStudentRecords(currentUser.id);
  const aggr = getStudentAggregates(currentUser.id);
  const report = [
    {
      Metric: "Attendance",
      Value: aggr.attendancePct.toFixed(2) + "%",
      Category: aggr.category,
    }
  ];
  records.forEach(r => {
    const attPct = r.total ? ((r.attended / r.total) * 100) : 0;
    const cat = calculateCategory(attPct, r.marks);
    report.push({
      Metric: r.subjectCode,
      Value: `${attPct.toFixed(0)}%`,
      Marks: `${r.marks}/100`,
      Status: cat
    });
  });
  exportToCSV(report, `student-report-${currentUser.rollNo || currentUser.username}.csv`);
  showToast("Report exported successfully!", "success");
}

/**
 * Export class data to CSV (Faculty)
 */
function exportClassData() {
  if (!currentUser || currentUser.role !== "FACULTY") return;
  const branch = currentUser.branch;
  const students = db.users.filter(u => u.role === "STUDENT" && (!branch || u.branch === branch));
  const report = students.map(s => {
    const aggr = getStudentAggregates(s.id);
    return {
      "Roll No": s.rollNo || "-",
      "Name": s.fullName,
      "Attendance %": aggr.attendancePct.toFixed(1),
      "Avg Marks": aggr.avgMarks.toFixed(1),
      "Category": aggr.category,
    };
  });
  exportToCSV(report, `class-data-${branch || "all"}.csv`);
  showToast("Class data exported!", "success");
}

/**
 * Handle bulk upload of academic records
 */
function handleBulkUpload() {
  const csv = document.getElementById("bulk-csv-input").value.trim();
  if (!csv) {
    showToast("Please enter CSV data.", "info");
    return;
  }
  const lines = csv.split("\n").filter(l => l.trim());
  let success = 0;
  let errors = [];
  
  lines.forEach((line, idx) => {
    const [studentId, subjectCode, total, attended, marks] = line.split(",").map(x => x.trim());
    if (!studentId || !subjectCode || !total || attended === undefined || marks === undefined) {
      errors.push(`Line ${idx + 1}: Invalid format`);
      return;
    }
    const student = db.users.find(u => u.rollNo === studentId);
    if (!student) {
      errors.push(`Line ${idx + 1}: Student not found`);
      return;
    }
    const existing = db.records.find(r => r.studentId === student.id && r.subjectCode === subjectCode);
    if (existing) {
      existing.total = parseInt(total);
      existing.attended = parseInt(attended);
      existing.marks = parseInt(marks);
    } else {
      db.records.push({
        studentId: student.id,
        subjectCode,
        total: parseInt(total),
        attended: parseInt(attended),
        marks: parseInt(marks),
      });
    }
    success++;
  });
  
  saveDB(db);
  document.getElementById("bulk-upload-modal").classList.add("hidden");
  document.getElementById("bulk-csv-input").value = "";
  renderFacultyDashboard();
  showToast(`Uploaded ${success} records${errors.length ? `. ${errors.length} errors.` : "!"}`, errors.length ? "info" : "success");
}

/**
 * Download bulk upload template
 */
function downloadBulkTemplate() {
  const template = "StudentID,SubjectCode,Total,Attended,Marks\n24CSE001,CS101,40,32,85\n24CSE002,CS101,40,30,78";
  const blob = new Blob([template], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bulk-upload-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Filter students by search term
 * @param {string} searchTerm - Search term
 */
function filterStudentSubjects(searchTerm) {
  const container = document.getElementById("student-subject-list");
  if (!container) return;
  const cards = container.querySelectorAll("div");
  cards.forEach(card => {
    const text = card.textContent || "";
    card.style.display = text.includes(searchTerm.toLowerCase()) ? "block" : "none";
  });
}

/**
 * Filter users in admin view
 * @param {string} searchTerm - Search term
 */
function filterAdminUsers(searchTerm) {
  const tbody = document.getElementById("admin-users-table");
  if (!tbody) return;
  const rows = tbody.querySelectorAll("tr");
  rows.forEach(row => {
    const text = row.textContent || "";
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none";
  });
}

/**
 * Filter users in admin users view
 * @param {string} searchTerm - Search term
 */
function filterAdminUsersView(searchTerm) {
  const tbody = document.getElementById("admin-users-table-view");
  if (!tbody) return;
  const rows = tbody.querySelectorAll("tr");
  rows.forEach(row => {
    const text = row.textContent || "";
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none";
  });
}
