/* ===================================
   UI RENDERING FUNCTIONS
   =================================== */

/**
 * Switch between different views
 * @param {string} viewId - ID of the view to switch to
 */
function switchView(viewId) {
  const allViews = document.querySelectorAll("[data-view]");
  allViews.forEach((el) => {
    el.classList.add("hidden");
  });
  const target = document.querySelector('[data-view="' + viewId + '"]');
  if (target) {
    target.classList.remove("hidden");
  }
  
  updateBreadcrumbs(viewId);
  
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.classList.remove('bg-emerald-500/10', 'border', 'border-emerald-500/20');
  });
  const activeNav = document.querySelector(`[data-nav="${viewId}"]`);
  if (activeNav) {
    activeNav.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/20');
  }
}

/**
 * Update breadcrumbs based on current view
 * @param {string} viewId - Current view ID
 */
function updateBreadcrumbs(viewId) {
  const breadcrumbs = {
    'student-dashboard': 'Dashboard',
    'student-profile': 'Profile',
    'trends-view': 'Trends Analysis',
    'leaderboard-view': 'Leaderboard',
    'faculty-dashboard': 'Dashboard',
    'faculty-class': 'My Class',
    'admin-dashboard': 'Dashboard',
    'admin-users': 'User Management',
    'admin-analytics': 'Analytics',
    'notifications-view': 'Announcements',
  };
  
  const breadcrumbEl = document.querySelector('#breadcrumb-label span');
  if (breadcrumbEl) {
    breadcrumbEl.textContent = breadcrumbs[viewId] || 'View';
  }
}

/**
 * Update sidebar navigation for current user role
 */
function updateSidebarForUser() {
  if (!currentUser) return;
  
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
          ${currentUser.fullName.charAt(0)}
        </div>
        <div>
          <div class="font-semibold text-sm text-slate-100">${currentUser.fullName}</div>
          <div class="text-xs text-slate-400">${currentUser.role}</div>
        </div>
      </div>
      <button id="theme-toggle" class="p-2 hover:bg-slate-800/50 rounded-lg transition">
        <i class="fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-slate-400"></i>
      </button>
    </div>

    <nav class="flex flex-col gap-2">
      ${currentUser.role === 'STUDENT' ? `
        <button data-nav="student-dashboard" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-chart-line"></i> Dashboard
        </button>
        <button data-nav="student-profile" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-user"></i> Profile
        </button>
        <button data-nav="trends-view" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-chart-area"></i> Trends
        </button>
      ` : currentUser.role === 'FACULTY' ? `
        <button data-nav="faculty-dashboard" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-gauge"></i> Dashboard
        </button>
        <button data-nav="faculty-class" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-users"></i> My Class
        </button>
      ` : `
        <button data-nav="admin-dashboard" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-house"></i> Dashboard
        </button>
        <button data-nav="admin-users" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-users-cog"></i> Users
        </button>
        <button data-nav="admin-analytics" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
          <i class="fa-solid fa-chart-pie"></i> Analytics
        </button>
      `}
      <button data-nav="notifications-view" class="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-3 text-slate-300 hover:text-slate-100">
        <i class="fa-solid fa-bell"></i> Announcements <span id="notification-badge" class="ml-auto text-xs bg-rose-500 text-white px-2 py-1 rounded hidden"></span>
      </button>
    </nav>

    <div class="border-t border-slate-800 pt-4 flex flex-col gap-2">
      <button id="logout-btn" class="w-full px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium transition flex items-center gap-2">
        <i class="fa-solid fa-sign-out-alt"></i> Logout
      </button>
    </div>
  `;
}

/**
 * Render notification badge count
 */
function updateNotificationBadge() {
  const badge = document.getElementById("notification-badge");
  if (!badge) return;
  const count = db.notifications.length;
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

/**
 * Render student dashboard
 */
function renderStudentDashboard() {
  if (!currentUser || currentUser.role !== "STUDENT") return;
  
  const studentId = currentUser.id;
  const aggregates = getStudentAggregates(studentId);

  // Update aggregates with animation
  const aggAttendanceEl = document.getElementById("student-agg-attendance");
  const avgMarksEl = document.getElementById("student-avg-marks");
  const overallCatEl = document.getElementById("student-overall-category");

  setTimeout(() => {
    if (aggAttendanceEl) animateValue(aggAttendanceEl, 0, aggregates.attendancePct, 1200, "%");
  }, 300);
  
  setTimeout(() => {
    if (avgMarksEl) animateValue(avgMarksEl, 0, aggregates.avgMarks, 1200, "");
  }, 500);

  // Update category badge
  let colorClass = "bg-slate-500";
  let textColor = "text-slate-400";
  let label = aggregates.category;
  if (aggregates.category === "Good") {
    colorClass = "bg-emerald-400";
    textColor = "text-emerald-300";
  } else if (aggregates.category === "Average") {
    colorClass = "bg-amber-400";
    textColor = "text-amber-300";
  } else if (aggregates.category === "At-Risk") {
    colorClass = "bg-rose-400";
    textColor = "text-rose-300";
  }

  if (overallCatEl) {
    overallCatEl.innerHTML = `<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${colorClass}/20 border ${colorClass}/40"><i class="fa-solid fa-star text-xs"></i><span class="${textColor} text-xs font-semibold">${label}</span></span>`;
  }

  // Render badges
  renderBadges(studentId);

  // Welcome name
  const welcomeName = document.getElementById("student-welcome-name");
  if (welcomeName) welcomeName.textContent = currentUser.fullName;

  // Update notification badge
  updateNotificationBadge();
}

/**
 * Render badges for student
 * @param {number} studentId - Student ID
 */
function renderBadges(studentId) {
  const container = document.getElementById("badges-container");
  if (!container) return;
  const badges = calculateBadges(studentId);
  container.innerHTML = "";
  if (!badges.length) {
    container.innerHTML = '<p class="text-xs text-slate-400">Unlock badges by maintaining excellent performance</p>';
  }
  badges.forEach(badge => {
    const div = document.createElement("div");
    div.className = `flex flex-col items-center gap-1 ${badge.color} text-center`;
    div.innerHTML = `
      <div class="h-12 w-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center">
        <i class="fa-solid ${badge.icon} text-lg"></i>
      </div>
      <span class="text-xs font-semibold">${badge.label}</span>
    `;
    container.appendChild(div);
  });
}

/**
 * Render faculty dashboard
 */
function renderFacultyDashboard() {
  if (!currentUser || currentUser.role !== "FACULTY") return;

  const branch = currentUser.branch;
  const students = db.users.filter(
    (u) => u.role === "STUDENT" && (!branch || u.branch === branch)
  );

  const totalStudents = students.length;
  const totalAtt = students.reduce((acc, s) => acc + getStudentAggregates(s.id).attendancePct, 0);
  const avgAtt = totalStudents ? (totalAtt / totalStudents).toFixed(1) : 0;
  const riskCount = students.filter(s => getStudentAggregates(s.id).category === "At-Risk").length;

  const elTotal = document.getElementById("fac-dash-total");
  if (elTotal) elTotal.textContent = totalStudents;
  const elAvg = document.getElementById("fac-dash-avg");
  if (elAvg) elAvg.textContent = avgAtt + "%";
  const elRisk = document.getElementById("fac-dash-risk");
  if (elRisk) elRisk.textContent = riskCount;

  // Update notification badge
  updateNotificationBadge();
}

/**
 * Render admin dashboard
 */
function renderAdminDashboard() {
  if (!currentUser || currentUser.role !== "ADMIN") return;

  const totalUsers = db.users.length;
  const totalStudents = db.users.filter((u) => u.role === "STUDENT").length;

  let good = 0, average = 0, atRisk = 0;
  db.users
    .filter((u) => u.role === "STUDENT")
    .forEach((s) => {
      const aggr = getStudentAggregates(s.id);
      if (aggr.category === "Good") good++;
      else if (aggr.category === "Average") average++;
      else if (aggr.category === "At-Risk") atRisk++;
    });

  document.getElementById("admin-total-users").textContent = totalUsers;
  document.getElementById("admin-total-students").textContent = totalStudents;
  document.getElementById("admin-at-risk-count").textContent = atRisk;

  // Render chart
  renderAdminCategoryChart();

  // Update notification badge
  updateNotificationBadge();
}

/**
 * Render notifications list
 * @param {string} elementId - Container element ID
 * @param {number} limit - Maximum notifications to show
 */
function renderNotificationsList(elementId, limit = null) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = "";

  if (!db.notifications.length) {
    container.innerHTML = '<p class="text-sm text-slate-400 text-center py-4">No announcements yet.</p>';
    return;
  }

  const sorted = [...db.notifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const toShow = limit ? sorted.slice(0, limit) : sorted;

  toShow.forEach((n) => {
    const div = document.createElement("div");
    div.className = "rounded-lg bg-slate-900/60 border border-slate-800 px-4 py-3 flex flex-col gap-2 hover:border-emerald-500/30 transition";
    div.innerHTML = `
      <div class="flex items-start justify-between">
        <h4 class="font-semibold text-sm text-slate-100">${n.title}</h4>
        <span class="text-xs text-slate-500">${n.date}</span>
      </div>
      <p class="text-xs text-slate-400">${n.message}</p>
      <p class="text-xs text-slate-500 italic">— ${n.author}</p>
    `;
    container.appendChild(div);
  });
}
