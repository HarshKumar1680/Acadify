// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Add search functionality as needed
});

// Progress bar animation
document.addEventListener('DOMContentLoaded', () => {
    const progress = document.querySelector('.progress');
    progress.style.width = '75%';
});

// Load more button
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', () => {
    console.log('Loading more credits...');
});

// Notification badge
const notificationIcon = document.querySelector('.fa-bell');
const badge = document.createElement('span');
badge.className = 'notification-badge';
badge.textContent = '3';
notificationIcon.parentElement.style.position = 'relative';
notificationIcon.after(badge);

// DOM elements for assignments
const assignmentsContainer = document.querySelector('.upcoming');
const addAssignmentButton = document.querySelector('.add-assignment'); // Button to add a new assignment

// Get existing assignments from localStorage (if any)
function getAssignments() {
    const assignments = localStorage.getItem('assignments');
    return assignments ? JSON.parse(assignments) : [];
}

// Save assignments to localStorage
function saveAssignments(assignments) {
    localStorage.setItem('assignments', JSON.stringify(assignments));
}

// Create new assignment
function createAssignment(course, deadline) {
    const assignments = getAssignments();
    const newAssignment = {
        id: Date.now(), // Use current timestamp as a unique ID
        course,
        deadline,
        status: 'Pending', // Default status
    };
    assignments.push(newAssignment);
    saveAssignments(assignments);
    renderAssignments();
}

// Update assignment status (e.g., marked as submitted)
function updateAssignmentStatus(id, status) {
    const assignments = getAssignments();
    const assignment = assignments.find(item => item.id === id);
    if (assignment) {
        assignment.status = status;
        saveAssignments(assignments);
        renderAssignments();
    }
}

// Delete an assignment
function deleteAssignment(id) {
    const assignments = getAssignments();
    const updatedAssignments = assignments.filter(item => item.id !== id);
    saveAssignments(updatedAssignments);
    renderAssignments();
}

// Render assignments in the upcoming section
function renderAssignments() {
    const assignments = getAssignments();
    assignmentsContainer.innerHTML = ''; // Clear existing assignments

    assignments.forEach(assignment => {
        const assignmentElement = document.createElement('div');
        assignmentElement.classList.add('assignment-item');
        assignmentElement.innerHTML = `
            <span class="number">${assignment.id}</span>
            <i class="fas fa-book"></i>
            <span class="course">${assignment.course}</span>
            <span class="deadline">${assignment.deadline}</span>
            <span class="status">${assignment.status}</span>
            <button class="submit-btn" onclick="updateAssignmentStatus(${assignment.id}, 'Submitted')">Submit</button>
            <button class="delete-btn" onclick="deleteAssignment(${assignment.id})">Delete</button>
        `;
        assignmentsContainer.appendChild(assignmentElement);
    });
}

// Add event listener for the "Add Assignment" button
addAssignmentButton.addEventListener('click', () => {
    const course = prompt('Enter the course name:');
    const deadline = prompt('Enter the deadline (e.g., 2025-05-10):');
    if (course && deadline) {
        createAssignment(course, deadline);
    }
});

// Initial rendering of assignments on page load
document.addEventListener('DOMContentLoaded', () => {
    renderAssignments();
});




addAssignmentButton.addEventListener('click', () => {
    console.log('Add Assignment button clicked');
    const course = prompt('Enter the course name:');
    const deadline = prompt('Enter the deadline (e.g., 2025-05-10):');
    if (course && deadline) {
        createAssignment(course, deadline);
    }
});
