// ===== LOGIN MODAL TOGGLE =====
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const closeLogin = document.getElementById("close-login");

loginBtn.addEventListener("click", () => (loginModal.style.display = "block"));
closeLogin.addEventListener("click", () => (loginModal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
});

// ===== LOGIN FUNCTIONALITY =====
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Login form submitted");

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log("Entered:", username, password);

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (data.success) {
      localStorage.setItem("studentName", data.name);
      console.log("Redirecting to dashboard.html");
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "❌ Invalid username or password!";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorMsg.textContent = "Server not reachable.";
  }
});
