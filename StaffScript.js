const staffCreateForm = document.querySelector('#Staff-form');
const staffUpdateForm = document.querySelector('#Staff-update-form')
const deleteForm = document.querySelector('#Staff-form-delete');
const createBtn = document.querySelector('#create-btn');
const getBtn = document.querySelector('#get-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const staffTable = document.querySelector('#Staff-table tbody');
const staffIdInput = document.querySelector("#staff-id");
const staffIdLabel = document.querySelector("#staff-id-label");
 // retrieve the stored username and password from the localStorage
 const storedUsername = localStorage.getItem('username');
 const storedPassword = localStorage.getItem('password');
//-------------------------------create------------------------------------------------
createBtn.addEventListener('click', () => {
    staffCreateForm.style.display = 'block';
    staffTable.parentElement.style.display = 'none';
    staffUpdateForm.style.display = 'none';
    deleteForm.style.display = 'none';
});

staffCreateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const staffName = document.querySelector('#staff-name').value;
  const staffEmail = document.querySelector('#staff-email').value;
  const staffSalary = document.querySelector('#staff-Salary').value;

  fetch('http://localhost:8080/api/staff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 
    'Authorization': 'Basic ' + btoa(storedUsername + ":" + storedPassword)},
    body: JSON.stringify({
      name: staffName,
      email: staffEmail,
      salary: staffSalary
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Staff added successfully');
      staffCreateForm.reset();
    } else {
      alert('An error occurred while adding the staff');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
});
//-------------------------------Get----------------------------------------------------
getBtn.addEventListener('click', () => {
  staffCreateForm.style.display = 'none';
  staffUpdateForm.style.display = 'none';
  deleteForm.style.display = 'none';
  staffTable.innerHTML = ''; // clear existing table rows
  fetch('http://localhost:8080/api/staff', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(storedUsername + ":" + storedPassword)
    }
  })
    .then(response => response.json())
    .then(data => {
      // iterate over students and add them to the table
      data.forEach(staff => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const salaryCell = document.createElement('td');
        idCell.textContent = staff.id;
        nameCell.textContent = staff.name;
        emailCell.textContent = staff.email;
        salaryCell.textContent = staff.salary;
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.append(salaryCell);
        staffTable.appendChild(row);
      });
      // display the table
      staffTable.parentElement.style.display = 'block';
    })
    .catch(error => console.error(error));
}); 

//------------------------------update----------------------------------------------------
updateBtn.addEventListener('click', () => {
  staffTable.parentElement.style.display = 'none';
  staffCreateForm.style.display = 'none';
  deleteForm.style.display = 'none';
  staffUpdateForm.style.display = 'block';
});

// Set the form's submit event listener
staffUpdateForm.addEventListener('submit', (event) => {
  event.preventDefault();  
  // Get the student ID, name, and email from the form
  const staffid = document.querySelector('#staff-id').value;
  const staffupdatedName = document.querySelector('#staffUpdatedName').value;
  const staffUpdatedEmail = document.querySelector('#StaffUpdatedEmail').value;
  const staffUpdatedSalary = document.querySelector('#StaffUpdatedSalary').value;

  // Call the API's update function with the new values
  fetch(`http://localhost:8080/api/staff/${staffid}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(storedUsername + ":" + storedPassword)},
    body: JSON.stringify({
      name: staffupdatedName,
      email: staffUpdatedEmail,
      salary: staffUpdatedSalary
    })
  })
    .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

       alert("Staff updated scussfully");
       staffUpdateForm.reset();
    });
//----------------------------Delete------------------------------------------------------
deleteBtn.addEventListener('click', () => {
  staffTable.parentElement.style.display = 'none';
  staffCreateForm.style.display = 'none';
  deleteForm.style.display = 'block';
  staffUpdateForm.style.display = 'none';
});

deleteForm.addEventListener('submit', (event) => { 
    event.preventDefault();  

    const staffId = document.querySelector('#StaffID').value;

    const confirmDelete = confirm(`Are you sure you want to delete student with ID ${staffId}?`);
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/staff/${staffId}`, {
        method: 'DELETE',
    headers: {'Content-Type': 'application/json',
             'Authorization': 'Basic ' + btoa(storedUsername + ":" + storedPassword)},
      })
        .then(response => {
          if (response.ok) {
            alert('staff deleted successfully');
            deleteForm.reset();
          } else {
            throw new Error('Failed to delete staff');
          }
        })
        .catch(error => console.error(error));
    }
});
  

  
  

  