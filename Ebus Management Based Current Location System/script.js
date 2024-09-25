// script.js
const db = firebase.firestore();

function showLoginForm() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

async function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await db.collection('users').doc(user.uid).set({
            firstName,
            lastName,
            email,
        });
        alert('Registration successful');
        showLoginForm();
    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.message);
    }
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        alert('Login successful');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('bus-info-container').style.display = 'block';
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message);
    }
}

async function postBusInfo() {
    const busDetails = document.getElementById('busDetails').value;
    const busType = document.getElementById('busType').value;
    const contact = document.getElementById('contact').value;

    try {
        await db.collection('buses').add({
            busDetails,
            busType,
            contact,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Bus information posted successfully');
    } catch (error) {
        console.error('Error posting bus info:', error);
        alert(error.message);
    }
}