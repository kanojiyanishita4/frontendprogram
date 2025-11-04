/* ===== Mock Data ===== */
const studentData = [
  { username: "nishitaaiml", password: "student01", name: "Nishita Kanojiya" },
  { username: "chanchalaiml", password: "student02", name: "Rahul Sharma" },
  { username: "uditaiml", password: "student03", name: "Priya Singh" }
];

/* ===== UI Helpers (index.html modal) ===== */
const loginModal = document.getElementById('loginModal');
const openLogin = document.getElementById('openLogin');
const openLogin2 = document.getElementById('openLogin2');
const closeModal = document.getElementById('closeModal');
const roleBtns = document.querySelectorAll('.role-btn');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const otherMsg = document.getElementById('otherMsg');

if(openLogin) openLogin.addEventListener('click', () => showModal());
if(openLogin2) openLogin2.addEventListener('click', () => showModal());
if(closeModal) closeModal.addEventListener('click', () => hideModal());
window.addEventListener('keydown', (e) => { if(e.key === 'Escape') hideModal(); });
window.addEventListener('click', (e) => { if(e.target === loginModal) hideModal(); });

function showModal(){
  loginModal.style.display = 'flex';
  loginError.textContent = '';
  setActiveRole('student');
}
function hideModal(){ loginModal.style.display = 'none'; }

/* role toggles */
function setActiveRole(role){
  roleBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.role === role);
  });
  if(role === 'student'){
    loginForm.classList.remove('hidden');
    otherMsg.classList.add('hidden');
  } else {
    loginForm.classList.add('hidden');
    otherMsg.classList.remove('hidden');
  }
}
roleBtns.forEach(b => b.addEventListener('click', () => setActiveRole(b.dataset.role)));

/* login form submit */
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();

    const matched = studentData.find(s => s.username === user && s.password === pass);
    if(matched){
      // store logged-in name then redirect to dashboard
      localStorage.setItem('campus_mitra_user', JSON.stringify(matched));
      window.location.href = 'student.html';
    } else {
      loginError.textContent = 'Invalid Username or Password';
    }
  });
}

/* ===== Dashboard Logic (student.html) ===== */
if(location.pathname.endsWith('student.html')){
  const userRaw = localStorage.getItem('campus_mitra_user');
  if(!userRaw){
    // Not logged in — redirect to home
    window.location.href = 'index.html';
  } else {
    const userObj = JSON.parse(userRaw);
    document.getElementById('welcomeText').innerText = `Welcome to Campus Mitra, ${userObj.name}!`;
    const panel = document.getElementById('panel');
    const attCard = document.getElementById('attCard');
    const timeCard = document.getElementById('timeCard');
    const notesCard = document.getElementById('notesCard');
    const logoutBtn = document.getElementById('logoutBtn');

    // sample attendance data (mock/simple)
    const attendanceSample = [
      { subject: 'Artificial Intelligence', percent: 86 },
      { subject: 'Machine Learning', percent: 92 },
      { subject: 'DBMS', percent: 78 }
    ];

    // sample timetable (mock)
    const timetableSample = [
      { day: 'Monday', items: ['9:00 AI', '11:00 DBMS', '2:00 ML Lab'] },
      { day: 'Tuesday', items: ['10:00 ML', '1:00 Workshop'] },
      { day: 'Wednesday', items: ['9:00 AI', '11:00 Tutorial'] }
    ];

    // sample notes link (use subjects from mock user if available)
    const notesSample = userObj.name === 'Nishita Kanojiya'
      ? ['Artificial Intelligence — Intro.pdf', 'ML-Lec2.pdf', 'DBMS-Notes.docx']
      : ['Subject A — Notes', 'Subject B — Notes'];

    function showAttendance(){
      panel.innerHTML = '<h3>Your Attendance</h3>';
      const box = document.createElement('div');
      box.className = 'subject-list';
      attendanceSample.forEach(s => {
        const el = document.createElement('div');
        el.className = 'subject';
        el.innerHTML = `<strong>${s.subject}</strong><div style="margin-top:6px">Attendance: ${s.percent}%</div>`;
        box.appendChild(el);
      });
      panel.appendChild(box);
    }

    function showTimetable(){
      panel.innerHTML = '<h3>Timetable</h3>';
      timetableSample.forEach(day => {
        const d = document.createElement('div');
        d.style.marginBottom = '12px';
        d.innerHTML = `<strong>${day.day}</strong><div>${day.items.join(' · ')}</div>`;
        panel.appendChild(d);
      });
    }

    function showNotes(){
      panel.innerHTML = '<h3>Your Notes</h3>';
      if(notesSample.length === 0){
        panel.innerHTML += '<p>No notes available.</p>';
        return;
      }
      const ul = document.createElement('div');
      ul.className = 'subject-list';
      notesSample.forEach(n => {
        const item = document.createElement('div');
        item.className = 'subject';
        item.textContent = n;
        ul.appendChild(item);
      });
      panel.appendChild(ul);
    }

    attCard.addEventListener('click', showAttendance);
    timeCard.addEventListener('click', showTimetable);
    notesCard.addEventListener('click', showNotes);

    // show default (notes)
    showNotes();

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('campus_mitra_user');
      window.location.href = 'index.html';
    });
  }
}

const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const chatBody = document.getElementById("chatBody");
const sendBtn = document.getElementById("sendBtn");
const userMessage = document.getElementById("userMessage");

chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

// Mock knowledge base
const responses = {
  "hello": "Hi there! I'm your Campus Mitra Assistant. How can I help you today?",
  "attendance": "Your current attendance is 88%. Keep it up!",
  "notes": "You can find notes under the 'View Notes' section for all subjects.",
  "timetable": "Your next class is at 10 AM: Data Structures in Room 204.",
  "announcements": "Today's announcement: Mid-sem exam schedule released on portal.",
  "help": "You can ask about attendance, notes, timetable, or announcements.",
  "default": "I'm still learning 🤖. Try asking about attendance, notes, or timetable."
};

function addMessage(msg, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "message user-msg" : "message bot-msg";
  div.textContent = msg;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userMessage.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userMessage.value.trim().toLowerCase();
  if (!text) return;
  addMessage(userMessage.value, "user");
  userMessage.value = "";

  setTimeout(() => {
    const reply = responses[text] || responses["default"];
    addMessage(reply, "bot");
  }, 500);
}

