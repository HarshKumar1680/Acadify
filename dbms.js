// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    navTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and panes
        navTabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
  
        // Add active class to clicked tab and corresponding pane
        this.classList.add('active');
        const tabName = this.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
      });
    });
  
    // Module toggle
    const modulesToggles = document.querySelectorAll('.module-toggle');
    
    modulesToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const moduleContent = this.closest('.module').querySelector('.module-content');
        const isOpen = moduleContent.style.display !== 'none';
        
        if (isOpen) {
          moduleContent.style.display = 'none';
          this.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
          moduleContent.style.display = 'block';
          this.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
      });
    });
  
    // Resource category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Show/hide resources based on category
        resourceItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Grades chart
    if (document.getElementById('gradeChart')) {
      renderGradeChart();
    }
  
    // Notification indicator animation
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
      setInterval(() => {
        notificationBadge.classList.toggle('pulse');
      }, 2000);
    }
  
    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          alert('Search functionality would be implemented in a real application');
        }
      });
    });
  
    // Simulate loading states
    const buttons = document.querySelectorAll('.btn:not(.nav-tab)');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        if (!this.classList.contains('search-btn')) {
          e.preventDefault();
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
          
          setTimeout(() => {
            this.innerHTML = originalText;
            if (this.textContent.includes('Submit')) {
              alert('Submission functionality would be implemented in a real application');
            }
          }, 1000);
        }
      });
    });
  });
  
  // Render the grade chart
  function renderGradeChart() {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    
    // Data for the chart
    const assignments = [
      'Assignment 1', 
      'Quiz 1', 
      'Assignment 2', 
      'Class Average'
    ];
    
    const yourGrades = [100, 90, 90, 0];
    const classAverage = [85, 82, 79, 82];
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: assignments,
        datasets: [
          {
            label: 'Your Grade',
            data: yourGrades,
            backgroundColor: 'rgba(66, 133, 244, 0.7)',
            borderColor: 'rgba(66, 133, 244, 1)',
            borderWidth: 1
          },
          {
            label: 'Class Average',
            data: classAverage,
            backgroundColor: 'rgba(180, 180, 180, 0.7)',
            borderColor: 'rgba(180, 180, 180, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Score (%)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Grade Performance'
          }
        }
      }
    });
  }