// Course data with aliases for search
const courses = [
    {
        name: "Database Management System",
        id: "dbms",
        aliases: ["dbms", "database", "data6221", "data", "database management"],
        page: "dbms.html"
    },
    {
        name: "Machine Learning",
        id: "ml",
        aliases: ["ml", "machine", "machine learning", "mcin6222", "ai"],
        page: "machinelearning.html"
    },
    {
        name: "Programming 2A",
        id: "programming",
        aliases: ["programming", "prog", "programming 2a", "coding", "code"],
        page: "programming.html"
    }
];

// DOM Elements
const searchInput = document.getElementById('courseSearch');
const suggestionsDiv = document.getElementById('suggestions');
const searchBtn = document.getElementById('searchBtn');
const logoutBtn = document.getElementById('logoutBtn');
const courseCards = document.querySelectorAll('.course-card');
const toast = document.getElementById('toast');
const toastMessage = document.querySelector('.toast-message');
const modal = document.getElementById('courseModal');
const modalTitle = document.getElementById('modalTitle');
const saveBtn = document.querySelector('.save-btn');
const coursesGrid = document.getElementById('coursesGrid');
const courseForm = document.getElementById('courseForm');

// Current course being edited
let currentCourseId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initCourseCards();
    initLogout();
    loadCourses();
});

// Initialize search functionality
function initSearch() {
    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        const matches = findMatches(searchText);
        
        if (searchText.length > 0 && matches.length > 0) {
            suggestionsDiv.innerHTML = matches
                .map(course => `
                    <div class="suggestion-item" data-course="${course.page}">
                        ${course.name}
                    </div>
                `).join('');
            
            suggestionsDiv.style.display = 'block';
            
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const coursePage = this.getAttribute('data-course');
                    navigateToCourse(coursePage);
                });
            });
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    searchBtn.addEventListener('click', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        searchCourse(searchText);
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchText = this.value.trim().toLowerCase();
            searchCourse(searchText);
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

// Initialize course cards for default hardcoded cards
function initCourseCards() {
    courseCards.forEach(card => {
        const coursePage = card.getAttribute('data-course');
        card.addEventListener('click', function() {
            navigateToCourse(coursePage);
        });
        
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Initialize logout button
function initLogout() {
    logoutBtn.addEventListener('click', function() {
        showToast('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// Find matching courses based on search text
function findMatches(searchText) {
    if (!searchText) return [];
    return courses.filter(course => 
        course.name.toLowerCase().includes(searchText) ||
        course.aliases.some(alias => alias.toLowerCase().includes(searchText))
    );
}

// Search and navigate
function searchCourse(searchText) {
    const matches = findMatches(searchText);
    if (matches.length > 0) {
        navigateToCourse(matches[0].page);
    } else {
        showToast('Course not found! Please try another search term.', 'error');
    }
}

// Navigate to course page
function navigateToCourse(page) {
    if (page) {
        window.location.href = page;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
    
    const progress = toast.querySelector('.toast-progress');
    progress.style.animation = 'none';
    progress.offsetHeight;
    progress.style.animation = `progress ${getComputedStyle(document.documentElement).getPropertyValue('--toast-duration')} linear forwards`;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--toast-duration')) * 1000);
}

// Load dynamic courses from localStorage
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Create dynamic course card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="card-header">
            <h3>${course.name} - ${course.code}</h3>
            <div class="card-actions">
                <button class="edit-btn" data-id="${course.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" data-id="${course.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="course-info">
            <div class="instructor">
                <i class="fas fa-user"></i>
                <span>${course.instructor}</span>
            </div>
            <div class="schedule">
                <i class="fas fa-calendar"></i>
                <span>${course.schedule || 'No schedule set'}</span>
            </div>
            <div class="deadline">
                <i class="fas fa-clock"></i>
                <span>Due ${course.deadline || 'Not set'}</span>
            </div>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${course.location || 'No location set'}</span>
            </div>
        </div>
    `;

    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseId = e.currentTarget.getAttribute('data-id');
        openEditModal(courseId);
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseId = e.currentTarget.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this course?')) {
            const courses = JSON.parse(localStorage.getItem('courses')) || [];
            const filteredCourses = courses.filter(c => c.id !== courseId);
            localStorage.setItem('courses', JSON.stringify(filteredCourses));
            loadCourses();
            showToast('Course deleted successfully', 'success');
        }
    });

    return card;
}

// Modal controls
document.getElementById('addCourseBtn').addEventListener('click', () => {
    currentCourseId = null;
    modalTitle.textContent = 'Add New Course';
    saveBtn.textContent = 'Add Course';
    courseForm.reset();
    modal.classList.add('show');
});

function closeModal() {
    modal.classList.remove('show');
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Save or update a course
function saveCourse() {
    const name = document.getElementById('courseName').value;
    const code = document.getElementById('courseCode').value;
    const instructor = document.getElementById('instructor').value;
    const schedule = document.getElementById('schedule').value;
    const deadline = document.getElementById('deadline').value;
    const location = document.getElementById('location').value;

    if (!name || !code || !instructor) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    if (currentCourseId) {
        const index = courses.findIndex(c => c.id === currentCourseId);
        if (index !== -1) {
            courses[index] = {
                ...courses[index],
                name,
                code,
                instructor,
                schedule,
                deadline,
                location
            };
            showToast('Course updated successfully', 'success');
        }
    } else {
        courses.push({
            id: generateId(),
            name,
            code,
            instructor,
            schedule,
            deadline,
            location
        });
        showToast('Course added successfully', 'success');
    }

    localStorage.setItem('courses', JSON.stringify(courses));
    loadCourses();
    closeModal();
}

// Open course modal in edit mode
function openEditModal(courseId) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(c => c.id === courseId);

    if (course) {
        currentCourseId = courseId;
        modalTitle.textContent = 'Edit Course';
        saveBtn.textContent = 'Update Course';

        document.getElementById('courseName').value = course.name;
        document.getElementById('courseCode').value = course.code;
        document.getElementById('instructor').value = course.instructor;
        document.getElementById('schedule').value = course.schedule || '';
        document.getElementById('deadline').value = course.deadline || '';
        document.getElementById('location').value = course.location || '';

        modal.classList.add('show');
    }
}


