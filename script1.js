
const staffForm = document.querySelector('#staff-form');
const staffFormContainer = document.querySelector('#staff-form-container');
const createBtn = document.querySelector('#create-btn');
const getBtn = document.querySelector('#get-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const staffTable = document.querySelector('#staff-table tbody');

const staffIdInput = document.getElementById("staff-id");
const staffLable = document.getElementById("SL");

//-------------------------------create------------------------------------------------
createBtn.addEventListener('click', () => {
    staffFormContainer.style.display = 'block';
    staffTable.parentElement.style.display = 'none';
    // studentIdInput.style.display = "none";
    // studentIdLable.style.display = "none";
  });

  staffForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let staffName = document.querySelector('#staff-name').value;
  let staffEmail = document.querySelector('#staff-email').value;
  let staffSalary = document.querySelector('#staff-salary').value;

  fetch('http://localhost:8080/api/staff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: staffName,
      email: staffEmail,
      salary: staffSalary
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Staff added successfully');
      staffForm.reset(); // Reset the form
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
    staffFormContainer.style.display = 'none';
    staffTable.innerHTML = ''; // clear existing table rows
  fetch('http://localhost:8080/api/staff')
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
        row.appendChild(salaryCell);
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
    staffFormContainer.style.display = 'block';
  });
    // Set the form's submit event listener
    staffForm.addEventListener('submit', (event) => {
      event.preventDefault();  
      // Get the student ID, name, and email from the form
      let staffID = document.querySelector('#staff-id').value;
      let staffName = document.querySelector('#staff-name').value;
      let staffEmail = document.querySelector('#staff-email').value;
      let staffSalary = document.querySelector('#staff-salary').value;

      // Call the API's update function with the new values
      fetch(`http://localhost:8080/api/staff/${staffID}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: staffName,
          email: staffEmail,
          salary: staffSalary
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

       studentForm.reset(); // Reset the form
    });
//----------------------------Delete------------------------------------------------------
deleteBtn.addEventListener('click', () => {
    studentFormContainer.style.display = 'none';
    studentTable.parentElement.style.display = 'none';

    const studentId = prompt('Enter the student ID to delete:');
    if (studentId) {
      const confirmDelete = confirm(`Are you sure you want to delete student with ID ${studentId}?`);
      if (confirmDelete) {
        fetch(`http://localhost:8080/api/students/${studentId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              alert('Student deleted successfully');
            } else {
              throw new Error('Failed to delete student');
            }
          })
          .catch(error => console.error(error));
      }
    }
  });
  

  