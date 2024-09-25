// app.js
const db = firebase.database();
const logAction = (action) => {
    console.log(`Action performed: ${action}`);
};

// User Registration
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((userCredential) => {
            logAction('User Registered');
            alert('Registration Successful');
        })
        .catch((error) => {
            console.error(error);
        });
});

// User Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    firebase.auth().signInWithEmailAndPassword(loginUsername, loginPassword)
        .then((userCredential) => {
            logAction('User Logged In');
            alert('Login Successful');
        })
        .catch((error) => {
            console.error(error);
        });
});

// Posting Operation Schedule
document.getElementById('scheduleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const scheduleData = {
        dateTime: document.getElementById('surgeryDateTime').value,
        otId: document.getElementById('otId').value,
        anesthesiaType: document.getElementById('anesthesiaType').value,
        anesthesiologist: document.getElementById('anesthesiologist').value,
        medic: document.getElementById('medic').value,
        nurses: document.getElementById('nurses').value,
        remarks: document.getElementById('surgicalRemarks').value
    };
    
    db.ref('schedules/').push(scheduleData)
        .then(() => {
            logAction('Schedule Posted');
            alert('Schedule Successfully Posted');
        })
        .catch((error) => {
            console.error(error);
        });
});

// Viewing Doctor Details (Dummy Implementation)
document.getElementById('viewDoctors').addEventListener('click', function () {
    // Fetch doctor details from Firebase or any API
    const doctorDetails = `<p>Dr. John Doe - Surgeon</p>`;
    document.getElementById('doctorDetails').innerHTML = doctorDetails;
});