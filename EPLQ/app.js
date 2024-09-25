import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';
import { logAction } from './logger.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

document.getElementById('admin-login').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            logAction("Admin logged in");
            alert("Admin logged in successfully!");
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
            logAction("Admin login failed: " + error.message);
        });
});

document.getElementById('upload-data').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('data-file');
    const file = fileInput.files[0];
    // Assume the file is processed and encrypted here
    const encryptedData = "encrypted_data"; // Placeholder
    set(ref(database, 'data/' + file.name), { data: encryptedData })
        .then(() => {
            logAction("Data uploaded by admin: " + file.name);
            alert("Data uploaded successfully!");
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
            logAction("Data upload failed: " + error.message);
        });
});

document.getElementById('user-login').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            logAction("User logged in");
            alert("User logged in successfully!");
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
            logAction("User login failed: " + error.message);
        });
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const locationQuery = document.getElementById('location-query').value;
    const dbRef = ref(database);
    get(child(dbRef, 'data/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const results = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    // Assume we decrypt the data here
                    results.push(data.data); // Placeholder
                });
                document.getElementById('results').innerText = JSON.stringify(results);
                logAction("Search performed for location: " + locationQuery);
            } else {
                document.getElementById('error-message').innerText = "No data available.";
            }
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
            logAction("Search failed: " + error.message);
        });
});
