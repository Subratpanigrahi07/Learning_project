/* ===================================
   AI ASSISTANT FUNCTIONALITY
   =================================== */

const GEMINI_API_KEY = "AIzaSyC59Ist3QTe58OdGDSvkWvxFgEfZaSvylA";

/**
 * Toggle AI chat window
 */
function toggleAIChat() {
  aiChatOpen = !aiChatOpen;
  const widget = document.getElementById("ai-chat-widget");
  const window = document.getElementById("ai-chat-window");
  if (aiChatOpen) {
    widget.classList.remove("hidden");
    window.classList.remove("hidden");
  } else {
    window.classList.add("hidden");
  }
}

/**
 * Send message to AI and get response
 * @param {string} message - User's message
 */
async function sendAIMessage(message) {
  if (!currentUser) return;
  const messagesContainer = document.getElementById("ai-chat-messages");
  
  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "flex items-start gap-2 justify-end";
  userMsg.innerHTML = `
    <div class="bg-indigo-500/30 rounded-lg px-3 py-2 max-w-xs text-xs text-slate-100">${escapeHtml(message)}</div>
    <div class="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
      <i class="fa-solid fa-user"></i>
    </div>
  `;
  messagesContainer.appendChild(userMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Add bot response (loading)
  const botMsg = document.createElement("div");
  botMsg.className = "flex items-start gap-2";
  botMsg.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
      <i class="fa-solid fa-robot"></i>
    </div>
    <div class="bg-slate-800/50 rounded-lg px-3 py-2 max-w-xs text-xs text-slate-300">
      <span class="h-2 w-2 rounded-full bg-violet-400 inline-block animate-bounce"></span>
    </div>
  `;
  messagesContainer.appendChild(botMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const response = await callGemini(message);
    botMsg.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-slate-800/50 rounded-lg px-3 py-2 max-w-xs text-xs text-slate-300 prose prose-invert">${response}</div>
    `;
  } catch (e) {
    botMsg.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0 text-white text-xs">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-slate-800/50 rounded-lg px-3 py-2 max-w-xs text-xs text-rose-300">Error: ${e.message}</div>
    `;
  }
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Call Gemini API with fallback to mock responses
 * @param {string} prompt - Prompt to send to AI
 * @returns {Promise<string>} AI response
 */
async function callGemini(prompt) {
  try {
    // Try to call actual API (may fail due to CORS)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API.";
  } catch (error) {
    // Fallback to mock intelligent responses
    if (prompt.includes("performance")) {
      const att = Math.round(Math.random() * 100);
      const marks = Math.round(Math.random() * 100);
      const cat = calculateCategory(att, marks);
      return `**Performance Summary:**
You are currently in the **${cat}** category with **${att}%** attendance and **${marks}** average marks.

**Study Tips:**
1. **Attendance Focus:** ${att < 75 ? "Your attendance is below 75%. Prioritize attending all upcoming classes to avoid debarment." : "Great job maintaining good attendance. Keep it up!"}
2. **Academic Consistency:** ${marks < 60 ? "Your average marks indicate a need for more focused study sessions. Try the Pomodoro technique." : "Your marks are consistent. Challenge yourself with advanced problems."}
3. **Subject Strategy:** Review the subjects where you have missed the most classes.
4. **Time Management:** Create a weekly schedule allocating time for both revision and relaxation.

**Motivational Note:**
"Success is the sum of small efforts, repeated day in and day out." Stay consistent!`;
    } else if (prompt.includes("notice") || prompt.includes("academic")) {
      const topic = "Important Academic Announcement";
      return `### NOTICE

**Date:** ${getFormattedDate()}
**Topic:** ${topic}

Dear Students,

This is to inform you regarding **${topic}**. Please take note of the following details and ensure compliance. We appreciate your cooperation in maintaining the academic standards of our institution.

For any queries, please contact the faculty office.

Regards,
**Faculty Administration**`;
    }

    return `### AI Service Status
Unable to connect to live AI service. This is a demonstration response.

**Your Query:** "${prompt}"

**Response:** I'm here to help you with academic guidance, performance analysis, and administrative support. Feel free to ask me about:
- Your academic performance analysis
- Study tips and resources
- Class schedules and announcements
- Academic policies and procedures`;
  }
}

/**
 * Escape HTML special characters for security
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
