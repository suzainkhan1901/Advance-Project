document.getElementById('loginBtn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("User logged in: ", userCredential.user.uid);
        
        // Show different UI based on role
        if (role === 'doctor') {
            document.getElementById('patientInfo').style.display = 'block';
        } else {
            document.getElementById('tokenGeneration').style.display = 'block';
        }
    } catch (error) {
        console.error("Error logging in: ", error);
    }
};

document.getElementById('generateTokenBtn').onclick = async () => {
    const token = Math.floor(Math.random() * 10000);
    const patient = { token: token, timestamp: new Date() };
    await db.collection('tokens').add(patient);
    document.getElementById('tokenDisplay').innerText = `Generated Token: ${token}`;
    console.log("Token generated: ", token);
};

document.getElementById('savePatientBtn').onclick = async () => {
    const name = document.getElementById('patientName').value;
    const prescription = document.getElementById('prescription').value;
    const patientInfo = { name: name, prescription: prescription, timestamp: new Date() };
    
    await db.collection('patients').add(patientInfo);
    console.log("Patient info saved: ", patientInfo);
};