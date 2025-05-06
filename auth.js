// Handle form submission and authentication
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');

  // Toggle password visibility
  togglePasswordBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const input = this.previousElementSibling;
          const type = input.type === 'password' ? 'text' : 'password';
          input.type = type;
          
          // Update icon
          this.innerHTML = type === 'password' 
              ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>'
              : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>';
      });
  });

 // Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Get stored users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', email);
            showToast('Login successful!', 'success');
            setTimeout(() => {
                if (email === 'admin@gmail.com' && password === 'admin123') {
                    window.location.href = 'Admin/admin.html'; // ✅ ADMIN
                } else {
                    window.location.href = 'index.html'; // ✅ NORMAL USER
                }
            }, 1500);
        } else {
            showToast('Invalid email or password', 'error');
        }
    });
}


  // Handle signup form submission
  if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('signupEmail').value;
          const password = document.getElementById('signupPassword').value;
          const confirmPassword = document.getElementById('confirmPassword').value;

          if (password !== confirmPassword) {
              showToast('Passwords do not match', 'error');
              return;
          }

          // Get existing users
          const users = JSON.parse(localStorage.getItem('users')) || [];
          
          // Check if user already exists
          if (users.some(user => user.email === email)) {
              showToast('Email already registered', 'error');
              return;
          }

          // Add new user
          users.push({ email, password });
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUser', email);

          showToast('Account created successfully!', 'success');
          setTimeout(() => {
            if (email === 'admin@gmail.com' && password === 'admin123') {
                window.location.href = 'Admin/admin.html';  // Redirect to admin panel
            } else {
                window.location.href = 'index.html';  // Redirect to normal user dashboard
            }
        }, 1500);
      });
  }
});

// Toast notification function
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
      <div class="toast-content">
          <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
          <span>${message}</span>
      </div>
      <div class="toast-progress"></div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
      toast.classList.add('show');
  }, 100);

  setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(toast);
      }, 300);
  }, 3000);
}