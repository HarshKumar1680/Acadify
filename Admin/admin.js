function showAdminPanel() {
    document.getElementById('adminWelcome').style.display = 'none';
    document.getElementById('adminPanelContent').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'block';
    showTab('students');
}


function showTab(tab) {
    const tabs = ['students', 'teachers', 'courses'];
    tabs.forEach(t => {
        document.getElementById(t).style.display = (t === tab) ? 'block' : 'none';
    });
    renderList(tab);
}

function addEntry(type) {
    let nameInput, idInput, list;

    if (type === 'students') {
      nameInput = document.getElementById('studentName');
      idInput = document.getElementById('studentId');
      list = document.getElementById('studentList');
    } else if (type === 'teachers') {
      nameInput = document.getElementById('teacherName');
      idInput = document.getElementById('teacherId');
      list = document.getElementById('teacherList');
    } else if (type === 'courses') {
      nameInput = document.getElementById('courseName');
      idInput = document.getElementById('courseCode');
      list = document.getElementById('courseList');
    }

    const name = nameInput.value.trim();
    const id = idInput.value.trim();

    if (name === '' || id === '') {
      alert("Both fields are required");
      return;
    }

    const newEntry = { name, id };

    // Get existing data from localStorage
    const data = JSON.parse(localStorage.getItem(type)) || [];
    data.push(newEntry);

    // Save updated data to localStorage
    localStorage.setItem(type, JSON.stringify(data));

    // Clear input fields
    nameInput.value = '';
    idInput.value = '';

    // Re-render the list
    renderList(type);
}

function renderList(type) {
    const data = JSON.parse(localStorage.getItem(type)) || [];
    const list = document.getElementById(`${type.slice(0, -1)}List`);
    list.innerHTML = '';

    // Loop through the data and render each item
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (${item.id})
            <div>
                <button class="edit" onclick="editEntry('${type}', ${index})">Edit</button>
                <button class="delete" onclick="deleteEntry('${type}', ${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function editEntry(type, index) {
    const data = JSON.parse(localStorage.getItem(type));
    const updatedName = prompt("Edit Name:", data[index].name);
    const updatedId = prompt("Edit ID:", data[index].id);
    if (updatedName !== null && updatedId !== null) {
        data[index].name = updatedName;
        data[index].id = updatedId;
        localStorage.setItem(type, JSON.stringify(data));

        // Re-render the updated list on the page
        renderList(type);
    }
}

function deleteEntry(type, index) {
    const data = JSON.parse(localStorage.getItem(type));
    data.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(data));

    // Re-render the updated list on the page
    renderList(type);
}

document.addEventListener('DOMContentLoaded', () => {
    const welcomeDiv = document.getElementById('adminWelcome');
    const panelDiv = document.getElementById('adminPanelContent');
  
    // Keep both welcome and admin panel hidden initially
    welcomeDiv.style.display = 'block';
    panelDiv.style.display = 'none';
  });
  
  

// Search functionality
function search(type) {
    const searchInput = document.getElementById(`${type}Search`);
    const query = searchInput.value.toLowerCase();
    const data = JSON.parse(localStorage.getItem(type)) || [];
    const filteredData = data.filter(item => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query));
    const list = document.getElementById(`${type.slice(0, -1)}List`);
    list.innerHTML = '';

    filteredData.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (${item.id})
            <div>
                <button class="edit" onclick="editEntry('${type}', ${index})">Edit</button>
                <button class="delete" onclick="deleteEntry('${type}', ${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Export to Excel functionality
function exportToExcel(type) {
    const data = JSON.parse(localStorage.getItem(type)) || [];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, type.charAt(0).toUpperCase() + type.slice(1));
    XLSX.writeFile(wb, `${type}.xlsx`);
}
