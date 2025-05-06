document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const events = [
        {
            date: '2025-03-18',
            time: '10:00 AM',
            title: 'Neural Networks Assignment Due',
            course: 'Machine Learning'
        },
        {
            date: '2025-03-20',
            time: '11:59 PM',
            title: 'Lab Exercise: Normalization',
            course: 'Database Management'
        },
        {
            date: '2025-03-25',
            time: '10:00 AM',
            title: 'Mid-term Exam',
            course: 'Database Management'
        },
        {
            date: '2025-02-26',
            time: '11:59 PM',
            title: 'Data Structures Implementation',
            course: 'Programming 2A'
        }
    ];

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        document.getElementById('currentMonth').textContent = 
            new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            calendarDays.innerHTML += '<div class="calendar-day empty"></div>';
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = date.toISOString().split('T')[0];
            const hasEvent = events.some(event => event.date === dateString);
            const isToday = date.toDateString() === new Date().toDateString();
            
            calendarDays.innerHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" 
                     data-date="${dateString}">
                    ${day}
                </div>
            `;
        }

        renderEvents();
    }

    function renderEvents() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';

        const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        sortedEvents.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate >= new Date()) {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.innerHTML = `
                    <div class="event-time">${event.time}</div>
                    <div class="event-details">
                        <div class="event-title">${event.title}</div>
                        <div class="event-course">${event.course}</div>
                    </div>
                `;
                eventsList.appendChild(eventElement);
            }
        });
    }

    // Event Listeners
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Initialize calendar
    renderCalendar();
});