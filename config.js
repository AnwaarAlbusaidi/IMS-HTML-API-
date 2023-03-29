// retrieve the form element and add a submit event listener
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
    // retrieve the values entered in the Username and Password fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

      // add the username and password to the localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  
    // submit the username and password to the API endpoint
    fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {
      if (response.ok) {
        // redirect the user to a new page
        window.location.href = 'index.html';
      } else {
        // display an error message to the user
        throw new Error('Incorrect username or password. Please try again.');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  });
