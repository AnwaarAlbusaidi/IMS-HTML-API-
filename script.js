const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // get the values from the input fields
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // perform the authentication check here
  if (username === 'anwaar' && password === '12345') {
    // redirect to the index page
    window.location.href = 'index.html';
  } else {
    alert('Incorrect username or password');
  }
});
