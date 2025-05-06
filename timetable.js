document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    
    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add day numbers (1-28 for February)
    for (let i = 1; i <= 28; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        if (i === currentDay) {
            dayCell.className += ' today';
        }
        dayCell.textContent = i;
        calendarGrid.appendChild(dayCell);
    }
}

// Add click handlers for buttons
document.querySelector('.btn-save').addEventListener('click', () => {
    alert('Timetable saved successfully!');
});

document.querySelector('.btn-edit').addEventListener('click', () => {
    alert('Calendar edit mode enabled');
});

// Add hover effect for class cells
document.querySelectorAll('.class-cell').forEach(cell => {
    cell.addEventListener('mouseover', () => {
        if (cell.textContent.trim() !== '') {
            cell.style.backgroundColor = '#f5f5f5';
        }
    });
    
    cell.addEventListener('mouseout', () => {
        cell.style.backgroundColor = 'white';
    });
});