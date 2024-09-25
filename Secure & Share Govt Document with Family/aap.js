// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('register-btn').addEventListener('click', registerUser);
document.getElementById('verify-btn').addEventListener('click', verifyOTP);
document.getElementById('upload-btn').addEventListener('click', uploadDocument);

let verificationId;

function registerUser() {
    const email = document.getElementById('email').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('register-btn', { size: 'invisible' });

    firebase.auth().createUserWithEmailAndPassword(email, 'defaultpassword').then((userCredential) => {
        // Send OTP here
        const user = userCredential.user;
        user.sendEmailVerification().then(() => {
            alert('Verification email sent! Check your inbox.');
            document.getElementById('user-form').style.display = 'none';
            document.getElementById('otp-form').style.display = 'block';
        });
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function verifyOTP() {
    const otp = document.getElementById('otp').value;
    firebase.auth().signInWithEmailAndPassword(email, otp).then(() => {
        alert('OTP verified!');
        document.getElementById('otp-form').style.display = 'none';
        document.getElementById('document-upload').style.display = 'block';
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}

function uploadDocument() {
    const file = document.getElementById('file-upload').files[0];
    const storageRef = firebase.storage().ref('documents/' + file.name);
    storageRef.put(file).then(() => {
        alert('Document uploaded successfully!');
    }).catch(error => {
        console.error(error);
        alert(error.message);
    });
}