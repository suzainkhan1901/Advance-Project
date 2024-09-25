// Sign Up Function
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            alert('User registered: ' + name);
            // Redirect to another page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login Function
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            alert('Welcome back!');
            // Redirect to another page
            window.location.href = 'college-list.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});