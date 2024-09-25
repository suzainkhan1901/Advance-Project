// app.js
import db from './firebase-config.js';
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// User Registration
window.userRegister = function() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    // Save user data to Firebase
    set(ref(db, 'users/' + email.replace('.', ',')), {
        email: email,
        password: password
    }).then(() => {
        console.log("User registered successfully");
    }).catch((error) => {
        console.log("Error: " + error);
    });
};

// User Login
window.userLogin = function() {
    const email = document.getElementById("user-email").value;

    get(ref(db, 'users/' + email.replace('.', ','))).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("User logged in successfully");
            // Implement further logic here such as redirecting to dashboard
        } else {
            console.log("No user data available");
        }
    }).catch((error) => {
        console.log("Error: " + error);
    });
};

// Admin Login
window.adminLogin = function() {
    const email = document.getElementById("admin-email").value;

    get(ref(db, 'admins/' + email.replace('.', ','))).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Admin logged in successfully");
            // Implement further logic here such as redirecting to admin dashboard
        } else {
            console.log("No admin data available");
        }
    }).catch((error) => {
        console.log("Error: " + error);
    });
};