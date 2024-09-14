// Import and configure Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to log actions
function logAction(action) {
    console.log(`Action performed: ${action}`);
}

// Function to post soil details
function postSoilDetails() {
    const soilType = document.getElementById('soilType').value;
    const soilDetails = document.getElementById('soilDetails').value;

    database.ref('soils/').push({
        type: soilType,
        details: soilDetails
    });
    logAction(`Posted soil details: ${soilType}`);
}

// Function to post distributor details
function postDistributorDetails() {
    const distributorName = document.getElementById('distributorName').value;
    const distributorDetails = document.getElementById('distributorDetails').value;

    database.ref('distributors/').push({
        name: distributorName,
        details: distributorDetails
    });
    logAction(`Posted distributor details: ${distributorName}`);
}

// Function to view soil details
function viewSoilDetails() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    database.ref('soils/').once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            resultDiv.innerHTML += `<p>Type: ${data.type}, Details: ${data.details}</p>`;
        });
    });
}

// Function to view distributor details
function viewDistributorDetails() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    database.ref('distributors/').once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            resultDiv.innerHTML += `<p>Name: ${data.name}, Details: ${data.details}</p>`;
        });
    });
}