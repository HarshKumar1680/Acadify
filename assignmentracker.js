// DOM elements
const assignmentsContainer = document.querySelector('.assignments-container');
const assignmentModal = document.getElementById('assignmentModal');
const notificationModal = document.getElementById('notificationModal');
const gradeModal = document.getElementById('gradeModal');
const deleteModal = document.getElementById('deleteModal');
const assignmentForm = document.getElementById('assignmentForm');
const notificationForm = document.getElementById('notificationForm');
const gradeForm = document.getElementById('gradeForm');
const addAssignmentBtn = document.getElementById('addAssignmentBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Modal close buttons
const closeBtn = document.querySelector('.close');
const cancelAssignmentBtn = document.getElementById('cancelAssignment');
const cancelNotificationBtn = document.getElementById('cancelNotification');
const cancelGradeBtn = document.getElementById('cancelGrade');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');

// Form elements
const assignmentIdInput = document.getElementById('assignmentId');
const titleInput = document.getElementById('title');
const courseInput = document.getElementById('course');
const descriptionInput = document.getElementById('description');
const deadlineInput = document.getElementById('deadline');
const pointsInput = document.getElementById('points');
const notifyEmailInput = document.getElementById('notifyEmail');
const notifyPushInput = document.getElementById('notifyPush');

// Notification form elements
const notifyAssignmentIdInput = document.getElementById('notifyAssignmentId');
const notificationTitleInput = document.getElementById('notificationTitle');
const notificationMessageInput = document.getElementById('notificationMessage');
const notifyEmailOptionInput = document.getElementById('notifyEmailOption');
const notifyPushOptionInput = document.getElementById('notifyPushOption');
const notifySmsOptionInput = document.getElementById('notifySmsOption');
const notifyAllRecipientsInput = document.getElementById('notifyAllRecipients');

// Grade form elements
const gradeAssignmentIdInput = document.getElementById('gradeAssignmentId');
const scoreInput = document.getElementById('score');
const feedbackInput = document.getElementById('feedback');

let currentFilter = 'all';
let assignments = [];
let selectedAssignmentId = null;

// Event listeners
document.addEventListener('DOMContentLoaded', initialize);
addAssignmentBtn.addEventListener('click', openAddAssignmentModal);
closeBtn.addEventListener('click', closeAssignmentModal);
cancelAssignmentBtn.addEventListener('click', closeAssignmentModal);
cancelNotificationBtn.addEventListener('click', closeNotificationModal);
cancelGradeBtn.addEventListener('click', closeGradeModal);
cancelDeleteBtn.addEventListener('click', closeDeleteModal);
confirmDeleteBtn.addEventListener('click', deleteSelectedAssignment);
assignmentForm.addEventListener('submit', handleAssignmentFormSubmit);
notificationForm.addEventListener('submit', handleNotificationFormSubmit);
gradeForm.addEventListener('submit', handleGradeFormSubmit);
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterAssignments(btn.dataset.status);
    });
});

// Initialize
function initialize() {
    loadAssignments();
    setDefaultFormValues();
}

// Function to set default values in the assignment form
function setDefaultFormValues() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    deadlineInput.value = formattedDate;
    pointsInput.value = 100;
    notifyPushInput.checked = true;
    notifyEmailInput.checked = false;
}

// Load assignments from localStorage or use default ones
function loadAssignments() {
    const storedAssignments = localStorage.getItem('assignments');
    
    if (storedAssignments) {
        assignments = JSON.parse(storedAssignments);
    } else {
        // Default assignments if none exist
        assignments = [
            {
                id: 1,
                title: 'Database Normalization',
                course: 'DBMS',
                description: 'Create a report on database normalization techniques and their applications.',
                deadline: '2025-05-15',
                points: 100,
                attachment: null,
                status: 'Pending',
                createdAt: new Date().toISOString(),
            },
            {
                id: 2,
                title: 'Machine Learning Model',
                course: 'AI',
                description: 'Develop a machine learning model to predict customer churn.',
                deadline: '2025-05-20',
                points: 100,
                attachment: null,
                status: 'Submitted',
                createdAt: new Date().toISOString(),
            }
        ];
        saveAssignments(assignments);
    }
    
    renderAssignments();
}

// Save assignments to localStorage
function saveAssignments(assignments) {
    localStorage.setItem('assignments', JSON.stringify(assignments));
}

// Render assignments based on filter
function renderAssignments() {
    assignmentsContainer.innerHTML = '';
    
    let filteredAssignments = assignments;
    if (currentFilter !== 'all') {
        filteredAssignments = assignments.filter(assignment => assignment.status === currentFilter);
    }
    
    if (filteredAssignments.length === 0) {
        assignmentsContainer.innerHTML = '<p class="no-assignments">No assignments found.</p>';
        return;
    }
    
    filteredAssignments.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsContainer.appendChild(assignmentCard);
    });
}

// Create HTML for an assignment card
function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    
    const isOverdue = new Date(assignment.deadline) < new Date() && assignment.status === 'Pending';
    
    let statusClass = '';
    switch (assignment.status) {
        case 'Pending': statusClass = 'status-pending'; break;
        case 'Submitted': statusClass = 'status-submitted'; break;
        case 'Graded': statusClass = 'status-graded'; break;
    }
    
    const courseColorClass = getCourseColorClass(assignment.course);
    
    card.innerHTML = `
        <div class="card-header ${courseColorClass}">
            <div>
                <h3>${assignment.title}</h3>
                <p>${getCourseFullName(assignment.course)}</p>
            </div>
            <span class="status-badge ${statusClass}">${assignment.status}</span>
        </div>
        <div class="card-body">
            <p>${assignment.description}</p>
            <div class="assignment-meta">
                <span class="${isOverdue ? 'overdue' : ''}">
                    <i class="fas fa-calendar"></i> 
                    ${isOverdue ? 'Overdue! ' : ''}Due: ${formatDate(assignment.deadline)}
                </span>
                <span><i class="fas fa-star"></i> Points: ${assignment.points}</span>
            </div>
            <div class="card-actions">
                <button class="btn btn-sm btn-edit" data-id="${assignment.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-delete" data-id="${assignment.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
                ${assignment.status === 'Pending' ? `
                    <button class="btn btn-sm btn-submit" data-id="${assignment.id}">
                        <i class="fas fa-paper-plane"></i> Submit
                    </button>
                ` : ''}
                ${assignment.status === 'Submitted' ? `
                    <button class="btn btn-sm btn-grade" data-id="${assignment.id}">
                        <i class="fas fa-check-circle"></i> Grade
                    </button>
                ` : ''}
                <button class="btn btn-sm btn-notify" data-id="${assignment.id}">
                    <i class="fas fa-bell"></i> Notify
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    card.querySelector('.btn-edit').addEventListener('click', () => {
        openEditAssignmentModal(assignment.id);
    });
    
    card.querySelector('.btn-delete').addEventListener('click', () => {
        openDeleteModal(assignment.id);
    });
    
    if (assignment.status === 'Pending') {
        card.querySelector('.btn-submit').addEventListener('click', () => {
            submitAssignment(assignment.id);
        });
    }
    
    if (assignment.status === 'Submitted') {
        card.querySelector('.btn-grade').addEventListener('click', () => {
            openGradeModal(assignment.id);
        });
    }
    
    card.querySelector('.btn-notify').addEventListener('click', () => {
        openNotificationModal(assignment.id);
    });
    
    return card;
}

// Filter assignments by status
function filterAssignments(status) {
    currentFilter = status;
    
    // Update active tab
    tabButtons.forEach(btn => {
        if (btn.dataset.status === status) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderAssignments();
}

// Open add assignment modal
function openAddAssignmentModal() {
    document.getElementById('modalTitle').textContent = 'Add New Assignment';
    assignmentIdInput.value = '';
    assignmentForm.reset();
    setDefaultFormValues();
    assignmentModal.style.display = 'block';
}

// Open edit assignment modal
function openEditAssignmentModal(id) {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Assignment';
    assignmentIdInput.value = assignment.id;
    titleInput.value = assignment.title;
    courseInput.value = assignment.course;
    descriptionInput.value = assignment.description;
    deadlineInput.value = assignment.deadline;
    pointsInput.value = assignment.points;
    
    assignmentModal.style.display = 'block';
}

// Open notification modal
function openNotificationModal(id) {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    
    notifyAssignmentIdInput.value = assignment.id;
    notificationTitleInput.value = `Assignment Update: ${assignment.title}`;
    notificationMessageInput.value = `Important information about the assignment "${assignment.title}" (Due: ${formatDate(assignment.deadline)}). Please check the course page for more details.`;
    
    notificationModal.style.display = 'flex';
}

// Open grade modal
function openGradeModal(id) {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    
    gradeAssignmentIdInput.value = assignment.id;
    scoreInput.value = '';
    feedbackInput.value = '';
    
    gradeModal.style.display = 'flex';
}

// Open delete confirmation modal
function openDeleteModal(id) {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    
    selectedAssignmentId = id;
    document.getElementById('deleteMessage').textContent = `Are you sure you want to delete "${assignment.title}"? This action cannot be undone.`;
    
    deleteModal.style.display = 'flex';
}

// Close assignment modal
function closeAssignmentModal() {
    assignmentModal.style.display = 'none';
}

// Close notification modal
function closeNotificationModal() {
    notificationModal.style.display = 'none';
}

// Close grade modal
function closeGradeModal() {
    gradeModal.style.display = 'none';
}

// Close delete modal
function closeDeleteModal() {
    deleteModal.style.display = 'none';
}

// Handle assignment form submission
function handleAssignmentFormSubmit(e) {
    e.preventDefault();
    
    const id = assignmentIdInput.value ? parseInt(assignmentIdInput.value) : generateId();
    const assignment = {
        id,
        title: titleInput.value,
        course: courseInput.value,
        description: descriptionInput.value,
        deadline: deadlineInput.value,
        points: parseInt(pointsInput.value),
        attachment: null, // In a real app, you would handle file upload
        status: 'Pending',
        createdAt: new Date().toISOString(),
    };
    
    if (assignmentIdInput.value) {
        // Update existing assignment
        const index = assignments.findIndex(a => a.id === id);
        if (index !== -1) {
            const existingStatus = assignments[index].status;
            assignment.status = existingStatus; // Preserve status
            assignments[index] = assignment;
            showToast('Assignment updated successfully');
        }
    } else {
        // Create new assignment
        assignments.push(assignment);
        showToast('Assignment created successfully');
    }
    
    saveAssignments(assignments);
    renderAssignments();
    closeAssignmentModal();
}

// Handle notification form submission
function handleNotificationFormSubmit(e) {
    e.preventDefault();
    
    const assignmentId = parseInt(notifyAssignmentIdInput.value);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
        showToast('Assignment not found', 'error');
        return;
    }
    
    // In a real app, you would send this data to a backend
    const notification = {
        id: generateId(),
        assignmentId,
        title: notificationTitleInput.value,
        message: notificationMessageInput.value,
        emailNotification: notifyEmailOptionInput.checked,
        pushNotification: notifyPushOptionInput.checked,
        smsNotification: notifySmsOptionInput.checked,
        allRecipients: notifyAllRecipientsInput.checked,
        createdAt: new Date().toISOString(),
    };
    
    // Save notification to localStorage for future reference
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    showToast('Notification sent to students');
    closeNotificationModal();
}

// Handle grade form submission
function handleGradeFormSubmit(e) {
    e.preventDefault();
    
    const assignmentId = parseInt(gradeAssignmentIdInput.value);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
        showToast('Assignment not found', 'error');
        return;
    }
    
    // In a real app, you would save the grade to a backend
    const grade = {
        id: generateId(),
        assignmentId,
        score: parseInt(scoreInput.value),
        feedback: feedbackInput.value,
        feedbackAttachment: null, // In a real app, you would handle file upload
        gradedBy: 1, // Mock user ID
        gradedAt: new Date().toISOString(),
    };
    
    // Save grade to localStorage for future reference
    let grades = JSON.parse(localStorage.getItem('grades') || '[]');
    grades.push(grade);
    localStorage.setItem('grades', JSON.stringify(grades));
    
    // Update assignment status to Graded
    const index = assignments.findIndex(a => a.id === assignmentId);
    if (index !== -1) {
        assignments[index].status = 'Graded';
        saveAssignments(assignments);
    }
    
    showToast('Assignment graded successfully');
    closeGradeModal();
    renderAssignments();
}

// Submit an assignment (change status to Submitted)
function submitAssignment(id) {
    const index = assignments.findIndex(a => a.id === id);
    if (index !== -1) {
        assignments[index].status = 'Submitted';
        saveAssignments(assignments);
        renderAssignments();
        showToast('Assignment submitted successfully');
    }
}

// Delete the selected assignment
function deleteSelectedAssignment() {
    if (!selectedAssignmentId) return;
    
    // First check if there are any related records
    const notificationExists = checkIfRelatedNotificationsExist(selectedAssignmentId);
    const gradesExist = checkIfRelatedGradesExist(selectedAssignmentId);
    
    // If related records exist, delete them first
    if (notificationExists) {
        deleteRelatedNotifications(selectedAssignmentId);
    }
    
    if (gradesExist) {
        deleteRelatedGrades(selectedAssignmentId);
    }
    
    // Now delete the assignment
    const index = assignments.findIndex(a => a.id === selectedAssignmentId);
    if (index !== -1) {
        assignments.splice(index, 1);
        saveAssignments(assignments);
        showToast('Assignment deleted successfully');
    }
    
    closeDeleteModal();
    selectedAssignmentId = null;
    renderAssignments();
}

// Check if related notifications exist
function checkIfRelatedNotificationsExist(assignmentId) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    return notifications.some(n => n.assignmentId === assignmentId);
}

// Check if related grades exist
function checkIfRelatedGradesExist(assignmentId) {
    const grades = JSON.parse(localStorage.getItem('grades') || '[]');
    return grades.some(g => g.assignmentId === assignmentId);
}

// Delete related notifications
function deleteRelatedNotifications(assignmentId) {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications = notifications.filter(n => n.assignmentId !== assignmentId);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Delete related grades
function deleteRelatedGrades(assignmentId) {
    let grades = JSON.parse(localStorage.getItem('grades') || '[]');
    grades = grades.filter(g => g.assignmentId !== assignmentId);
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Helper function to generate a unique ID
function generateId() {
    return Math.floor(Math.random() * 1000000) + 1;
}

// Format date to a readable string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get course full name from code
function getCourseFullName(courseCode) {
    const courseMap = {
        'DBMS': 'Database Management Systems',
        'DS': 'Data Structures',
        'AI': 'Artificial Intelligence',
        'ML': 'Machine Learning',
        'CN': 'Computer Networks'
    };
    
    return courseMap[courseCode] || courseCode;
}

// Get color class based on course
function getCourseColorClass(courseCode) {
    const colorMap = {
        'DBMS': 'dbms-bg',
        'DS': 'ds-bg',
        'AI': 'ai-bg',
        'ML': 'ml-bg',
        'CN': 'cn-bg'
    };
    
    return colorMap[courseCode] || 'dbms-bg'; // Default to DBMS color
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}