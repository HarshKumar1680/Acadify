// Utility: Clear all test data
function clearTestData() {
    localStorage.removeItem('students');
    localStorage.removeItem('teachers');
    localStorage.removeItem('courses');
  }
  
  // STUDENT 
  
  function testAddStudent() {
    clearTestData();
    const students = [{ name: 'Alice', id: 'S001' }];
    localStorage.setItem('students', JSON.stringify(students));
  
    const saved = JSON.parse(localStorage.getItem('students'));
    console.assert(saved.length === 1 && saved[0].name === 'Alice', '❌ testAddStudent failed');
    console.log('✅ testAddStudent passed');
  }
  
  function testEditStudent() {
    const students = [{ name: 'Bob', id: 'S002' }];
    localStorage.setItem('students', JSON.stringify(students));
  
    const updated = [{ name: 'Bobby', id: 'S002' }];
    localStorage.setItem('students', JSON.stringify(updated));
  
    const saved = JSON.parse(localStorage.getItem('students'));
    console.assert(saved[0].name === 'Bobby', '❌ testEditStudent failed');
    console.log('✅ testEditStudent passed');
  }
  
  function testDeleteStudent() {
    const students = [
      { name: 'Charlie', id: 'S003' },
      { name: 'Daisy', id: 'S004' }
    ];
    localStorage.setItem('students', JSON.stringify(students));
  
    const filtered = students.filter(s => s.id !== 'S003');
    localStorage.setItem('students', JSON.stringify(filtered));
  
    const saved = JSON.parse(localStorage.getItem('students'));
    console.assert(saved.length === 1 && saved[0].id === 'S004', '❌ testDeleteStudent failed');
    console.log('✅ testDeleteStudent passed');
  }
  
//teacher
  function testAddTeacher() {
    clearTestData();
    const teachers = [{ name: 'Prof. John', id: 'T001' }];
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    const saved = JSON.parse(localStorage.getItem('teachers'));
    console.assert(saved.length === 1 && saved[0].name === 'Prof. John', '❌ testAddTeacher failed');
    console.log('✅ testAddTeacher passed');
  }
  
  function testEditTeacher() {
    const teachers = [{ name: 'Prof. Amy', id: 'T002' }];
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    const updated = [{ name: 'Dr. Amy', id: 'T002' }];
    localStorage.setItem('teachers', JSON.stringify(updated));
  
    const saved = JSON.parse(localStorage.getItem('teachers'));
    console.assert(saved[0].name === 'Dr. Amy', '❌ testEditTeacher failed');
    console.log('✅ testEditTeacher passed');
  }
  
  function testDeleteTeacher() {
    const teachers = [
      { name: 'Dr. Ken', id: 'T003' },
      { name: 'Dr. Lee', id: 'T004' }
    ];
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    const updated = teachers.filter(t => t.id !== 'T003');
    localStorage.setItem('teachers', JSON.stringify(updated));
  
    const saved = JSON.parse(localStorage.getItem('teachers'));
    console.assert(saved.length === 1 && saved[0].id === 'T004', '❌ testDeleteTeacher failed');
    console.log('✅ testDeleteTeacher passed');
  }
  
//course
  function testAddCourse() {
    clearTestData();
    const courses = [{ name: 'Math', code: 'C101' }];
    localStorage.setItem('courses', JSON.stringify(courses));
  
    const saved = JSON.parse(localStorage.getItem('courses'));
    console.assert(saved.length === 1 && saved[0].code === 'C101', '❌ testAddCourse failed');
    console.log('✅ testAddCourse passed');
  }
  
  function testEditCourse() {
    const courses = [{ name: 'Science', code: 'C102' }];
    localStorage.setItem('courses', JSON.stringify(courses));
  
    const updated = [{ name: 'Physics', code: 'C102' }];
    localStorage.setItem('courses', JSON.stringify(updated));
  
    const saved = JSON.parse(localStorage.getItem('courses'));
    console.assert(saved[0].name === 'Physics', '❌ testEditCourse failed');
    console.log('✅ testEditCourse passed');
  }
  
  function testDeleteCourse() {
    const courses = [
      { name: 'History', code: 'C103' },
      { name: 'Geography', code: 'C104' }
    ];
    localStorage.setItem('courses', JSON.stringify(courses));
  
    const updated = courses.filter(c => c.code !== 'C103');
    localStorage.setItem('courses', JSON.stringify(updated));
  
    const saved = JSON.parse(localStorage.getItem('courses'));
    console.assert(saved.length === 1 && saved[0].code === 'C104', '❌ testDeleteCourse failed');
    console.log('✅ testDeleteCourse passed');
  }
  