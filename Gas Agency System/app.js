// Import and configure Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Log actions
function logAction(action) {
    console.log(`[${new Date().toISOString()}] ${action}`);
}

// User registration
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            logAction(`User registered: ${username}`);
            alert('Registration successful!');
            document.getElementById('registrationForm').reset();
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});

// User login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            logAction(`User logged in: ${email}`);
            alert('Login successful!');
            document.getElementById('user-section').style.display = 'none';
            document.getElementById('booking-section').style.display = 'block';
            loadBookingHistory();
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});

// Book a cylinder
document.getElementById('bookCylinder').addEventListener('click', function() {
    const user = auth.currentUser;
    if (user) {
        db.collection('bookings').add({
            userId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            logAction(`Cylinder booked for user: ${user.email}`);
            alert('Cylinder booking successful!');
            loadBookingHistory();
        }).catch(error => {
            console.error(error);
            alert(error.message);
        });
    }
});

// Load booking history
function loadBookingHistory() {
    const user = auth.currentUser;
    if (user) {
        db.collection('bookings').where("userId", "==", user.uid)
            .get().then(querySnapshot => {
                const bookingHistory = document.getElementById('bookingHistory');
                bookingHistory.innerHTML = '';
                querySnapshot.forEach(doc => {
                    const li = document.createElement('li');
                    li.textContent = `Booking ID: ${doc.id} - Date: ${doc.data().timestamp.toDate().toLocaleString()}`;
                    bookingHistory.appendChild(li);
                });
            });
    }
}