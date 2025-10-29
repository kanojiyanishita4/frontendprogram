function loginAs(role) {
  alert(`Redirecting to ${role} login page...`);
  window.location.href = "login.html"; // future backend integration
}

// ===== Chatbot Toggle =====
function toggleChatbot() {
  const panel = document.getElementById("chatbot-panel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

// ===== Simple RAG Chatbot Simulation =====
const knowledgeBase = {
  "attendance": "To check attendance, login to your Campus Mitra dashboard and open Attendance tab.",
  "timetable": "You can view your daily and weekly timetable under the Timetable section.",
  "notes": "All subject notes can be accessed from the Notes section after login.",
  "announcement": "College announcements appear right on your dashboard homepage.",
  "login": "Select your role (student, teacher, parent, admin) and login with your credentials.",
  "chatbot": "I’m your Campus Mitra AI assistant. Ask me anything about the platform!"
};

function sendQuery() {
  const input = document.getElementById("userQuery");
  const userQ = input.value.trim().toLowerCase();
  if (!userQ) return;

  const chatBody = document.getElementById("chat-body");
  chatBody.innerHTML += `<div><strong>You:</strong> ${userQ}</div>`;

  let response = "Sorry, I’m not sure about that. Try asking about attendance, notes, or timetable.";

  for (let key in knowledgeBase) {
    if (userQ.includes(key)) {
      response = knowledgeBase[key];
      break;
    }
  }

  chatBody.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = "";
}
