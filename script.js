const studentCreateForm = document.querySelector('#student-form');
const studentUpdateForm = document.querySelector('#student-update-form')
const deleteForm = document.querySelector('#student-form-delete');
const studentFormContainer = document.querySelector('#student-form-container');
const createBtn = document.querySelector('#create-btn');
const getBtn = document.querySelector('#get-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const studentTable = document.querySelector('#student-table tbody');
const studentIdInput = document.querySelector("#student-id");
const studentIdLabel = document.querySelector("#student-id-label");

//-------------------------------create------------------------------------------------
createBtn.addEventListener('click', () => {
    studentCreateForm.style.display = 'block';
    studentTable.parentElement.style.display = 'none';
    studentUpdateForm.style.display = 'none';
    deleteForm.style.display = 'none';
});
studentCreateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const studentName = document.querySelector('#student-name').value;
  const studentEmail = document.querySelector('#student-email').value;

  fetch('http://localhost:8080/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: studentName,
      email: studentEmail
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Student added successfully');
      studentCreateForm.reset();
    } else {
      alert('An error occurred while adding the student');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
});
//-------------------------------Get----------------------------------------------------
getBtn.addEventListener('click', () => {
    studentCreateForm.style.display = 'none';
  deleteForm.style.display = 'none';
  studentUpdateForm.style.display = 'none';
  studentTable.innerHTML = ''; // clear existing table rows
  fetch('http://localhost:8080/api/students')
    .then(response => response.json())
    .then(data => {
      // iterate over students and add them to the table
      data.forEach(student => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        idCell.textContent = student.id;
        nameCell.textContent = student.name;
        emailCell.textContent = student.email;
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        studentTable.appendChild(row);
      });
      // display the table
      studentTable.parentElement.style.display = 'block';
    })
    .catch(error => console.error(error));
}); 

//------------------------------update----------------------------------------------------
updateBtn.addEventListener('click', () => {
  studentTable.parentElement.style.display = 'none';
  studentCreateForm.style.display = 'none';
  deleteForm.style.display = 'none';
  studentUpdateForm.style.display = 'block';
});

// Set the form's submit event listener
studentUpdateForm.addEventListener('submit', (event) => {
  event.preventDefault();  
  // Get the student ID, name, and email from the form
  const studentid = document.querySelector('#student-id').value;
  const studentupdatedName = document.querySelector('#studentUpdatedName').value;
  const studentUpdatedEmail = document.querySelector('#studentUpdatedEmail').value;

  // Call the API's update function with the new values
  fetch(`http://localhost:8080/api/students/${studentid}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: studentupdatedName,
      email: studentUpdatedEmail
    })
  })
    .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

       alert("Student updated scussfully");
       studentUpdateForm.reset();
    });
//----------------------------Delete------------------------------------------------------
deleteBtn.addEventListener('click', () => {
    studentCreateForm.style.display = 'none';
    studentTable.parentElement.style.display = 'none';
    studentUpdateForm.style.display = 'none';
    deleteForm.style.display = 'block';
});

deleteForm.addEventListener('submit', (event) => { 
    event.preventDefault();  

    const studentId = document.querySelector('#studentID').value;

    const confirmDelete = confirm(`Are you sure you want to delete student with ID ${studentId}?`);
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/students/${studentId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            alert('Student deleted successfully');
            deleteForm.reset();
          } else {
            throw new Error('Failed to delete student');
          }
        })
        .catch(error => console.error(error));
    }
});
  

  
  

  