// Firebase Authentication and Firestore
const db = firebase.firestore();

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('appointment-section').style.display = 'block';
        logAction('User logged in: ' + email);
    } catch (error) {
        document.getElementById('login-message').innerText = error.message;
    }
}

async function bookAppointment() {
    const teacherName = document.getElementById('teacherName').value;
    const appointmentPurpose = document.getElementById('appointmentPurpose').value;

    try {
        await db.collection('appointments').add({
            teacherName,
            appointmentPurpose,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('appointment-message').innerText = 'Appointment booked successfully!';
        logAction('Appointment booked: ' + teacherName + ', Purpose: ' + appointmentPurpose);
    } catch (error) {
        document.getElementById('appointment-message').innerText = error.message;
    }
}

// Logging function
function logAction(message) {
    console.log(new Date().toISOString() + " - " + message);
}