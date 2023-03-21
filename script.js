const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    console.log(username);
    const password = document.getElementById('password').value;
    
    if (username === 'anwaar' && password === '12345') {
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
});

