// Firebase configuration

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Check user role
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const role = userDoc.data().role;
            if (role === 'member') {
                document.getElementById('member-container').style.display = 'block';
            } else if (role === 'owner') {
                document.getElementById('owner-container').style.display = 'block';
            }
            document.getElementById('login-container').style.display = 'none';
        }
    } catch (error) {
        console.error("Error logging in: ", error);
    }
}

// Example function to view bill receipts

function viewBillReceipts() {
    console.log("Viewing bill receipts...");
    // Logic to retrieve and display bill receipts

}

// Example function to add a member

function addMember() {
    console.log("Adding member...");
    // Logic to add a member

}

// Example function to create a bill

function createBill() {
    console.log("Creating bill...");
    // Logic to create a bill
}

// Example function to assign notification
function assignNotification() {
    console.log("Assigning notification...");
    // Logic to assign notifications
}