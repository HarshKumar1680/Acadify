function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  }
  
  function showToast(message, type = "error") {
    const toast = document.getElementById("toast");
    const icon = document.getElementById("toast-icon");
    const msg = document.getElementById("toast-message");
  
    toast.className = `toast show ${type}`;
    msg.textContent = message;
    icon.textContent = type === "success" ? "✅" : "⚠️";
  
    setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  }
  
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (username === "harsh" && password === "1234") {
      showToast("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1500);
    } else {
      showToast("Invalid username or password", "error");
    }
  });
  