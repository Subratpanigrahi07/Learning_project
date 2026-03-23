/* ===================================
   CHART MANAGEMENT
   =================================== */

/**
 * Render trends chart for student performance
 * @param {string} filter - Filter type: 'all', 'theory', 'lab'
 */
function renderTrendsChart(filter = currentTrendFilter) {
  currentTrendFilter = filter;
  if (!currentUser || currentUser.role !== "STUDENT") return;
  
  const records = getStudentRecords(currentUser.id);
  let allSubjects = [...new Set(records.map(r => r.subjectCode))];
  
  let subjects = allSubjects;
  if (filter === 'lab') {
    subjects = allSubjects.filter(s => s.toUpperCase().includes("LAB") || s.toUpperCase().includes("LABORATORY"));
  } else if (filter === 'theory') {
    subjects = allSubjects.filter(s => !s.toUpperCase().includes("LAB") && !s.toUpperCase().includes("LABORATORY"));
  }

  // Update filter button states
  ['all', 'theory', 'lab'].forEach(type => {
    const btn = document.getElementById(`filter-${type}`);
    if (btn) {
      btn.classList.toggle('bg-emerald-500/20', type === filter);
    }
  });

  const ctx = document.getElementById("trends-chart")?.getContext("2d");
  if (!ctx) return;

  if (trendsChart) trendsChart.destroy();

  const datasets = subjects.map((subj, idx) => {
    const subjectRecords = records.filter(r => r.subjectCode === subj);
    const marks = subjectRecords.map(r => r.marks);
    return {
      label: subj,
      data: marks,
      borderColor: `hsl(${idx * 60}, 70%, 60%)`,
      backgroundColor: `hsla(${idx * 60}, 70%, 60%, 0.1)`,
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    };
  });

  const isLight = document.body.classList.contains("light-mode");
  const textColor = isLight ? "#0f172a" : "#e5e7eb";
  const gridColor = isLight ? "rgba(148, 163, 184, 0.3)" : "rgba(31,41,55,0.8)";
  const bgColor = isLight ? "rgba(255,255,255,0.95)" : "rgba(15,23,42,0.95)";

  trendsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: subjects,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: { color: textColor, font: { size: 12 } },
        },
      },
      scales: {
        y: {
          ticks: { color: textColor },
          grid: { color: gridColor },
          beginAtZero: true,
          max: 100,
        },
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor },
        },
      },
    },
  });
}

/**
 * Render admin category distribution chart
 */
function renderAdminCategoryChart() {
  const ctx = document.getElementById("admin-category-chart")?.getContext("2d");
  if (!ctx) return;

  if (adminCategoryChart) {
    adminCategoryChart.destroy();
  }

  let good = 0, average = 0, atRisk = 0;
  db.users
    .filter((u) => u.role === "STUDENT")
    .forEach((s) => {
      const aggr = getStudentAggregates(s.id);
      if (aggr.category === "Good") good++;
      else if (aggr.category === "Average") average++;
      else if (aggr.category === "At-Risk") atRisk++;
    });

  const chartType = document.getElementById("chart-type-toggle")?.querySelector("i")?.className.includes("pie") ? "pie" : "bar";

  adminCategoryChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: ["Good", "Average", "At-Risk"],
      datasets: [{
        label: "Student Count",
        data: [good, average, atRisk],
        backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(244, 63, 94, 0.7)"],
        borderColor: ["#10b981", "#f59e0b", "#f43f5e"],
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: { color: "#e5e7eb", font: { size: 12 } },
        },
      },
      scales: chartType === "bar" ? {
        y: {
          ticks: { color: "#e5e7eb" },
          grid: { color: "rgba(31,41,55,0.8)" },
        },
        x: {
          ticks: { color: "#e5e7eb" },
          grid: { color: "rgba(31,41,55,0.8)" },
        },
      } : undefined,
    },
  });
}

/**
 * Render analytics chart for admin view
 */
function renderAdminAnalyticsChart() {
  const ctx = document.getElementById("admin-analytics-chart-view")?.getContext("2d");
  if (!ctx) return;

  if (adminAnalyticsChartView) {
    adminAnalyticsChartView.destroy();
  }

  let good = 0, average = 0, atRisk = 0;
  db.users
    .filter((u) => u.role === "STUDENT")
    .forEach((s) => {
      const aggr = getStudentAggregates(s.id);
      if (aggr.category === "Good") good++;
      else if (aggr.category === "Average") average++;
      else if (aggr.category === "At-Risk") atRisk++;
    });

  adminAnalyticsChartView = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Good", "Average", "At-Risk"],
      datasets: [{
        label: "Number of Students",
        data: [good, average, atRisk],
        backgroundColor: ["#10b981", "#f59e0b", "#f43f5e"],
        borderColor: ["#059669", "#d97706", "#be123c"],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: "y",
      plugins: {
        legend: {
          labels: { color: "#e5e7eb", font: { size: 11 } },
        },
      },
      scales: {
        x: {
          ticks: { color: "#e5e7eb" },
          grid: { color: "rgba(31,41,55,0.8)" },
        },
        y: {
          ticks: { color: "#e5e7eb" },
          grid: { display: false },
        },
      },
    },
  });
}
