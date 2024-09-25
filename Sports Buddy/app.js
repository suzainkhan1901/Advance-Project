// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAkAvezkBPyOZqVuXHxARD-njByMdkzjQ",
    authDomain: "sport-buddy-537ee.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "sport-buddy-537ee",
    storageBucket: "sport-buddy-537ee.appspot.com",
    messagingSenderId: "64391013173",
    appId: "1:64391013173:web:f50e8a10bbdc901bfee27c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// User registration
document.getElementById('register-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('User registered:', userCredential.user);
    } catch (error) {
        console.error('Error registering user:', error);
    }
});

// Add sports event
document.getElementById('add-event-btn').addEventListener('click', async () => {
    const eventName = document.getElementById('event-name').value;
    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    if (userId) {
        try {
            const dbRef = firebase.database().ref('sportsEvents/' + userId);
            await dbRef.push({ name: eventName });
            console.log('Event added:', eventName);
            loadSportsEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    } else {
        console.error('User not logged in');
    }
});

// Load sports events
async function loadSportsEvents() {
    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    if (userId) {
        const dbRef = firebase.database().ref('sportsEvents/' + userId);
        dbRef.on('value', (snapshot) => {
            const events = snapshot.val();
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = '';
            for (let id in events) {
                const eventItem = document.createElement('div');
                eventItem.textContent = events[id].name;
                eventList.appendChild(eventItem);
            }
        });
    }
}

// Logging example (can be extended)
function logAction(action) {
    console.log(`[${new Date().toISOString()}] Action: ${action}`);
}