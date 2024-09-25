document.getElementById('voyagerLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('voyagerUsername').value;
    const password = document.getElementById('voyagerPassword').value;

    auth.signInWithEmailAndPassword(username, password)
        .then(userCredential => {
            console.log('Voyager logged in:', userCredential.user);
            // Redirect or load voyager dashboard
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert(error.message);
        });
});

document.getElementById('adminLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    auth.signInWithEmailAndPassword(username, password)
        .then(userCredential => {
            console.log('Admin logged in:', userCredential.user);
            // Redirect or load admin dashboard
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert(error.message);
        });
});

// Further functions for ordering, bookings, and viewing items go here